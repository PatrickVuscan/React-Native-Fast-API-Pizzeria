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


if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=5000,
    )
