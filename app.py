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
from api.util.utils import get_pizza_by_id_if_exists

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
    prev_pizza = get_pizza_by_id_if_exists(pid, dbb)
    pizza_update = schemas.PizzaUpdate(
        pizza_id=pid,
        kind=pizza.kind if pizza.kind else prev_pizza.kind,
        size=pizza.size if pizza.size else prev_pizza.size,
        base_price=pizza.base_price if pizza.base_price else prev_pizza.base_price,
    )
    return Crud.update_pizza(dbb, pizza_update)


@app.delete("/pizzas/{pid}", response_model=schemas.PizzaInDB)
def delete_pizza(pid: int, dbb: Session = Depends(get_db)):
    print(pid)
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


@app.post("/toppings", response_model=schemas.ToppingInDB)
def create_topping(topping: schemas.ToppingCreate, dbb: Session = Depends(get_db)):
    return Crud.create_topping(dbb, topping)


@app.get("/toppings", response_model=List[schemas.ToppingInDB])
def read_toppings(dbb: Session = Depends(get_db)):
    return Crud.get_toppings(dbb=dbb)


if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=5000,
    )
