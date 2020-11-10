import unittest
import pytest

from fastapi.testclient import TestClient

from api.app import app

client = TestClient(app)


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
        assert len(pizza["toppings"]) != 0
        atp = pizza["toppings"][0]
        assert atp["name"] == "Pepperoni"
        assert atp["price"] == 3.99

    def test_delete_pizza(self):
        res_piz = client.post("/pizzas", json={"name": "Pepperroni Pizza", "size": 0, "base_price": 9.98})
        res_piz = res_piz.json()

        res = client.delete(f"/pizzas/{res_piz['pizza_id']}")
        assert res.status_code == 200
        del_pizza = res.json()
        assert del_pizza["pizza_id"] == res_piz["pizza_id"]

        with pytest.raises(Exception):
            client.get(f"/pizzas/{res_piz['pizza_id']}")


class ToppingTest(unittest.TestCase):
    """Test all routes associated with topping."""

    def test_read_topping(self):
        res_top = client.post("/toppings", json={"name": "Pepperroni", "price": 3.98})
        res_top = res_top.json()

        res = client.get(f"/toppings/{res_top['topping_id']}")
        assert res.status_code == 200
        top = res.json()
        assert top["name"] == "Pepperroni"
        assert top["price"] == 3.98

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

    def test_update_topping_name(self):
        res = client.post("/toppings", json={"name": "Pepperoni", "price": 3.99})
        topping = res.json()

        res = client.put(f"/toppings/{topping['topping_id']}", json={"name": "Chicken"})
        assert res.status_code == 200

        top = res.json()
        assert top["name"] == "Chicken"
        assert top["price"] == 3.99

    def test_update_topping_price(self):
        res = client.post("/toppings", json={"name": "Pepperoni", "price": 3.99})
        topping = res.json()

        res = client.put(f"/toppings/{topping['topping_id']}", json={"price": 2.99})
        assert res.status_code == 200

        top = res.json()
        assert top["name"] == "Pepperoni"
        assert top["price"] == 2.99

    def test_delete_topping(self):
        res_top = client.post("/toppings", json={"name": "Pepperroni", "price": 3.98})
        res_top = res_top.json()

        res = client.delete(f"/toppings/{res_top['topping_id']}")
        assert res.status_code == 200
        del_top = res.json()
        assert del_top["topping_id"] == res_top["topping_id"]

        with pytest.raises(Exception):
            client.get(f"/toppings/{res_top['topping_id']}")


class DrinkTest(unittest.TestCase):
    """Test all routes associated with drinks."""

    def test_create_drink(self):
        res = client.post("/drinks", json={"name": 0, "price": 2.99})

        assert res.status_code == 200

        drink = res.json()
        assert drink["name"] == 0
        assert drink["price"] == 2.99

    def test_read_drink(self):
        res_drink = client.post("/drinks", json={"name": 0, "price": 2.99})
        res_drink = res_drink.json()

        res = client.get(f"drinks/{res_drink['drink_id']}")
        drink = res.json()
        assert drink["name"] == 0
        assert drink["price"] == 2.99

    def test_read_drinks(self):
        res_d1 = client.post("/drinks", json={"name": 0, "price": 2.99})
        res_d2 = client.post("/drinks", json={"name": 0, "price": 2.99})
        res_d3 = client.post("/drinks", json={"name": 0, "price": 2.99})

        drink1 = res_d1.json()
        drink2 = res_d2.json()
        drink3 = res_d3.json()

        res = client.get("drinks")

        assert res.status_code == 200

        drinks = res.json()[-3:]
        assert len(drinks) == 3
        assert drinks[0]["drink_id"] == drink1["drink_id"]
        assert drinks[1]["drink_id"] == drink2["drink_id"]
        assert drinks[2]["drink_id"] == drink3["drink_id"]

    def test_update_drink_name(self):
        res_drink = client.post("/drinks", json={"name": 0, "price": 2.99})

        drink = res_drink.json()

        res = client.put(f"/drinks/{drink['drink_id']}", json={"name": 2})

        assert res.status_code == 200

        udrink = res.json()
        assert udrink["name"] == 2
        assert udrink["price"] == 2.99

    def test_update_drink_price(self):
        res_drink = client.post("/drinks", json={"name": 0, "price": 2.99})

        drink = res_drink.json()

        res = client.put(f"/drinks/{drink['drink_id']}", json={"price": 2.0})

        assert res.status_code == 200

        udrink = res.json()
        assert udrink["name"] == 0
        assert udrink["price"] == 2.0

    def test_delete_drink(self):
        res_drink = client.post("/drinks", json={"name": 0, "price": 2.99})
        res_drink = res_drink.json()

        res = client.delete(f"/drinks/{res_drink['drink_id']}")
        assert res.status_code == 200
        del_drink = res.json()
        assert del_drink["drink_id"] == res_drink["drink_id"]

        with pytest.raises(Exception):
            client.get(f"/drinks/{res_drink['drink_id']}")
