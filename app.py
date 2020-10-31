"""Main file"""
from typing import List
from fastapi.params import Depends
from fastapi import FastAPI
from sqlalchemy.orm import Session
import uvicorn

from api.database.db import engine, SessionLocal
from api.model import models
from api.schema import schemas
from api.model.crud.pizza_crud import SqlPizzaCRUD
from api.model.crud.customer_crud import SqlCustomerCRUD
from api.model.crud.drink_crud import SqlDrinkCRUD
from api.model.crud.topping_crud import SqlToppingCRUD

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


@app.post("/pizzas", response_model=schemas.PizzaInDB)
def create_pizza(pizza: schemas.PizzaCreate, dbb: Session = Depends(get_db)):
    return SqlPizzaCRUD.create_pizza(dbb, pizza)


@app.get("/pizzas", response_model=List[schemas.PizzaInDB])
def read_pizzas(dbb: Session = Depends(get_db)):
    return SqlPizzaCRUD.get_pizzas(dbb=dbb)


@app.post("/customers", response_model=schemas.CustomerInDB)
def create_customer(customer: schemas.CustomerCreate, dbb: Session = Depends(get_db)):
    return SqlCustomerCRUD.create_customer(dbb, customer)


@app.get("/customers", response_model=List[schemas.CustomerInDB])
def read_customers(dbb: Session = Depends(get_db)):
    return SqlCustomerCRUD.get_customers(dbb=dbb)


@app.post("/drinks", response_model=schemas.DrinkInDB)
def create_drink(drink: schemas.DrinkCreate, dbb: Session = Depends(get_db)):
    return SqlDrinkCRUD.create_drink(dbb, drink)


@app.get("/drinks", response_model=List[schemas.DrinkInDB])
def read_drinks(dbb: Session = Depends(get_db)):
    return SqlDrinkCRUD.get_drinks(dbb=dbb)


@app.post("/toppings", response_model=schemas.ToppingInDB)
def create_topping(topping: schemas.ToppingCreate, dbb: Session = Depends(get_db)):
    return SqlToppingCRUD.create_topping(dbb, topping)


@app.get("/toppings", response_model=List[schemas.ToppingInDB])
def read_toppings(dbb: Session = Depends(get_db)):
    return SqlToppingCRUD.get_toppings(dbb=dbb)


if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=5000,
    )
