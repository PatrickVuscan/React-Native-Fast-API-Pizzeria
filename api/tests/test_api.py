import unittest
import pytest

from fastapi.testclient import TestClient

from api.app import app

client = TestClient(app)


class ToppingTest(unittest.TestCase):
    """Test all routes associated with topping."""

    def test_read_toppings(self):
        res = client.get("/toppings")
        assert res.status_code == 200
        toppings = res.json()
        assert toppings is not None

    def test_create_topping(self):
        res = client.post("/toppings", json={"name": "Pepperoni", "price": 3.99})
        assert res.status_code == 200
        toppings = res.json()
        assert toppings is not None


class PizzaTest(unittest.TestCase):
    """Test all routes associated with pizza."""

    @pytest.fixture(autouse=True)
    def init_data(self):
        client.post("/toppings", json={"name": "Pepperoni", "price": 3.99})
        client.post("/toppings", json={"name": "Chicken", "price": 3.99})
        client.post("/pizzas", json={"name": "Pepperroni Pizza", "size": 0, "base_price": 9.98})
        client.post("/pizzas", json={"name": "Chicken Pizza", "size": 0, "base_price": 9.98})

    def test_read_pizza(self):
        res_piz = client.post("/pizzas", json={"name": "Chicken Pizza", "size": 0, "base_price": 9.98})
        res = client.get(f"pizzas/{res_piz.json()['pizza_id']}")

        assert res.status_code == 200
        pizza = res.json()
        assert pizza["name"] == "Chicken Pizza"
        assert pizza["size"] == 0
        assert pizza["base_price"] == 9.98
        assert pizza["pizza_id"] is not None
        assert pizza["toppings"] == []

    def test_read_pizzas(self):
        res = client.get("/pizzas")

        assert res.status_code == 200
        pizzas = res.json()
        assert pizzas is not None

    def test_create_pizza(self):
        res = client.post("/pizzas", json={"name": "Pepperroni Pizza", "size": 0, "base_price": 9.98})

        assert res.status_code == 200
        pizza = res.json()
        assert pizza["name"] == "Pepperroni Pizza"
        assert pizza["size"] == 0
        assert pizza["base_price"] == 9.98
        assert pizza["pizza_id"] is not None
        assert pizza["toppings"] == []

    def test_update_pizza_name(self):
        res_piz = client.post("/pizzas", json={"name": "Pepperroni Pizza", "size": 0, "base_price": 9.98})
        piz_obj = res_piz.json()
        res = client.put(f"/pizzas/{piz_obj['pizza_id']}", json={"name": "Chicken Pizza"})

        assert res.status_code == 200
        pizza = res.json()
        assert pizza["name"] == "Chicken Pizza"
        assert pizza["size"] == 0
        assert pizza["base_price"] == 9.98

    def test_update_pizza_size(self):
        res_piz = client.post("/pizzas", json={"name": "Pepperroni Pizza", "size": 0, "base_price": 9.98})
        piz_obj = res_piz.json()
        res = client.put(f"/pizzas/{piz_obj['pizza_id']}", json={"size": 1})

        assert res.status_code == 200
        pizza = res.json()
        assert pizza["name"] == "Pepperroni Pizza"
        assert pizza["size"] == 1
        assert pizza["base_price"] == 9.98

    def test_update_pizza_base_price(self):
        res_piz = client.post("/pizzas", json={"name": "Pepperroni Pizza", "size": 0, "base_price": 9.98})
        piz_obj = res_piz.json()
        res = client.put(f"/pizzas/{piz_obj['pizza_id']}", json={"base_price": 10.89})
        assert res.status_code == 200
        pizza = res.json()
        assert pizza["name"] == "Pepperroni Pizza"
        assert pizza["size"] == 0
        assert pizza["base_price"] == 10.89

    def test_add_topping_to_pizza(self):
        res_top = client.post("/toppings", json={"name": "Pepperoni", "price": 3.99})
        res_piz = client.post("/pizzas", json={"name": "Pepperroni Pizza", "size": 0, "base_price": 9.98})

        res = client.put(f"/pizzas/{res_piz.json()['pizza_id']}", json={"toppings": [res_top.json()["topping_id"]]})
        assert res.status_code == 200

        pizza = res.json()
        print(f"toppings: {pizza['toppings']}")
        assert len(pizza["toppings"]) != 0
        atp = pizza["toppings"][0]
        assert atp["name"] == "Pepperoni"
        assert atp["price"] == 3.99
