"""API routes for the Pizza model."""
from typing import List
from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from api.model.crud.crud import Crud
from api.schema import schemas
from api.util.utils import get_db, get_pizza_by_id_if_exists, get_topping_by_id_if_exists

router = APIRouter()


@router.get("/pizzas/{pid}", response_model=schemas.PizzaInDB)
def read_pizza(pid: int, dbb: Session = Depends(get_db)):
    return get_pizza_by_id_if_exists(pid, dbb)


@router.get("/pizzas", response_model=List[schemas.PizzaInDB])
def read_pizzas(dbb: Session = Depends(get_db)):
    return Crud.get_pizzas(dbb=dbb)


@router.post("/pizzas", response_model=schemas.PizzaInDB)
def create_pizza(pizza: schemas.PizzaCreate, dbb: Session = Depends(get_db)):
    return Crud.create_pizza(dbb, pizza)


@router.put("/pizzas/{pid}", response_model=schemas.PizzaInDB)
def update_pizza(
    pid: int,
    pizza: schemas.PizzaRequestUpdate,
    dbb: Session = Depends(get_db),
):
    toppings = []
    for tid in pizza.toppings:
        ftop = get_topping_by_id_if_exists(tid, dbb)
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


@router.delete("/pizzas/{pid}", response_model=schemas.PizzaInDB)
def delete_pizza(pid: int, dbb: Session = Depends(get_db)):
    get_pizza_by_id_if_exists(pid, dbb)
    return Crud.delete_pizza(dbb, pid)
