"""API routes for the Order model."""
from typing import List
from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from api.model.crud.crud import Crud
from api.schema import schemas
from api.schema.schemas import OrderCreate
from api.util.utils import get_db, get_order_by_id_if_exists, get_pizza_by_id_if_exists, get_drink_by_id_if_exists

router = APIRouter()


@router.get("/orders", response_model=List[schemas.OrderInDB])
def read_orders(dbb: Session = Depends(get_db)):
    return Crud.get_orders(dbb=dbb)


@router.get("/orders/{oid}", response_model=schemas.OrderInDB)
def read_order(oid: int, dbb: Session = Depends(get_db)):
    return get_order_by_id_if_exists(oid, dbb)


@router.post("/orders", response_model=schemas.OrderInDB)
def create_order(order: OrderCreate, dbb: Session = Depends(get_db)):
    return Crud.create_order(dbb, order)


@router.put("/orders/{oid}", response_model=schemas.OrderInDB)
def update_order(oid: int, order: schemas.OrderRequestUpdate, dbb: Session = Depends(get_db)):
    prev_order = get_order_by_id_if_exists(oid, dbb)

    pizzas = []
    for pid in order.pizzas:
        fpiz = get_pizza_by_id_if_exists(pid, dbb)
        pizzas.append(fpiz)

    drinks = []
    print(order.drinks)
    for did in order.drinks:
        fdrink = get_drink_by_id_if_exists(did, dbb)
        drinks.append(fdrink)

    order_update = schemas.OrderUpdate(
        order_id=oid,
        is_completed=order.is_completed if order.is_completed is not None else prev_order.is_completed,
        delivery_method=order.delivery_method if order.delivery_method else prev_order.delivery_method,
        pizzas=pizzas if pizzas else prev_order.pizzas,
        drinks=drinks if drinks else prev_order.drinks,
    )
    return Crud.update_order(dbb=dbb, order=order_update)


@router.delete("/orders/{oid}", response_model=schemas.OrderInDB)
def delete_order(oid: int, dbb: Session = Depends(get_db)):
    return Crud.delete_order(dbb=dbb, order_id=oid)
