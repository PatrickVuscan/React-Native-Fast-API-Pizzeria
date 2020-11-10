"""Main file"""
from typing import List
from fastapi.params import Depends
from fastapi import FastAPI
from sqlalchemy.orm import Session
import uvicorn

from api.database.db import engine, SessionLocal
from api.model import models
from api.schema import schemas
from api.model.crud.crud import Crud
from api.util.utils import get_pizza_by_id_if_exists, get_toppings_by_id_if_exists

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    local_db: Session = SessionLocal()
    try:
        yield local_db
    finally:
        local_db.close()  # pylint: disable=no-member


@app.get("/")
def hello_world():
    return {"Hello": "World"}


@app.get("/pizzas/{pid}", response_model=schemas.PizzaInDB)
def read_pizza(pid: int, dbb: Session = Depends(get_db)):
    return get_pizza_by_id_if_exists(pid, dbb)


@app.get("/pizzas", response_model=List[schemas.PizzaInDB])
def read_pizzas(dbb: Session = Depends(get_db)):
    return Crud.get_pizzas(dbb=dbb)


@app.post("/pizzas", response_model=schemas.PizzaInDB)
def create_pizza(pizza: schemas.PizzaCreate, dbb: Session = Depends(get_db)):
    return Crud.create_pizza(dbb, pizza)


@app.put("/pizzas/{pid}", response_model=schemas.PizzaInDB)
def update_pizza(
    pid: int,
    pizza: schemas.PizzaRequestUpdate,
    dbb: Session = Depends(get_db),
):
    toppings = []
    for tid in pizza.toppings:
        ftop = get_toppings_by_id_if_exists(tid, dbb)
        toppings.append(ftop)

    prev_pizza = get_pizza_by_id_if_exists(pid, dbb)
    pizza_update = schemas.PizzaUpdate(
        pizza_id=pid,
        name=pizza.name if pizza.name else prev_pizza.name,
        size=pizza.size if pizza.size else prev_pizza.size,
        base_price=pizza.base_price if pizza.base_price else prev_pizza.base_price,
        toppings=toppings if toppings else prev_pizza.toppings,
    )
    return Crud.update_pizza(dbb, pizza_update)


@app.delete("/pizzas/{pid}", response_model=schemas.PizzaInDB)
def delete_pizza(pid: int, dbb: Session = Depends(get_db)):
    get_pizza_by_id_if_exists(pid, dbb)
    return Crud.delete_pizza(dbb, pid)


@app.post("/customers", response_model=schemas.CustomerInDB)
def create_customer(customer: schemas.CustomerCreate, dbb: Session = Depends(get_db)):
    return Crud.create_customer(dbb, customer)


@app.get("/customers", response_model=List[schemas.CustomerInDB])
def read_customers(dbb: Session = Depends(get_db)):
    return Crud.get_customers(dbb=dbb)


@app.post("/drinks", response_model=schemas.DrinkInDB)
def create_drink(drink: schemas.DrinkCreate, dbb: Session = Depends(get_db)):
    return Crud.create_drink(dbb, drink)


@app.get("/drinks", response_model=List[schemas.DrinkInDB])
def read_drinks(dbb: Session = Depends(get_db)):
    return Crud.get_drinks(dbb=dbb)


@app.get("/toppings/{tid}", response_model=schemas.ToppingInDB)
def read_topping(tid: int, dbb: Session = Depends(get_db)):
    return get_toppings_by_id_if_exists(tid, dbb)


@app.get("/toppings", response_model=List[schemas.ToppingInDB])
def read_toppings(dbb: Session = Depends(get_db)):
    return Crud.get_toppings(dbb=dbb)


@app.post("/toppings", response_model=schemas.ToppingInDB)
def create_topping(topping: schemas.ToppingCreate, dbb: Session = Depends(get_db)):
    return Crud.create_topping(dbb, topping)


@app.put("/toppings/{tid}", response_model=schemas.ToppingInDB)
def update_topping(
    tid: int,
    topping: schemas.ToppingRequestUpdate,
    dbb: Session = Depends(get_db),
):

    prev_top = get_toppings_by_id_if_exists(tid, dbb)
    topping_update = schemas.ToppingUpdate(
        topping_id=tid,
        name=topping.name if topping.name else prev_top.name,
        price=topping.price if topping.price else prev_top.price,
    )
    return Crud.update_topping(dbb, topping_update)


@app.delete("/toppings/{tid}", response_model=schemas.ToppingInDB)
def delete_topping(tid: int, dbb: Session = Depends(get_db)):
    get_toppings_by_id_if_exists(tid, dbb)
    return Crud.delete_topping(dbb, tid)


if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=5000,
    )
