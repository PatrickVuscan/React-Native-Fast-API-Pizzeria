"""Define utility functions."""
from sqlalchemy.orm import Session
from api.model.crud.crud import Crud
from api.database.db import SessionLocal


def get_pizza_by_id_if_exists(pid: int, dbb: Session):
    pizza = Crud.get_pizza_by_id(dbb, pid)
    if not pizza:
        raise Exception(f"No such pizza with {pid} found.")
    return pizza


def get_topping_by_id_if_exists(tid: int, dbb: Session):
    topping = Crud.get_topping_by_id(dbb, tid)
    if not topping:
        raise Exception(f"No such topping with {tid} found.")
    return topping


def get_drink_by_id_if_exists(did: int, dbb: Session):
    drink = Crud.get_drink_by_id(dbb, did)
    if not drink:
        raise Exception(f"No such drink with {did} found.")
    return drink


def get_order_by_id_if_exists(oid: int, dbb: Session):
    order = Crud.get_order_by_id(dbb, oid)
    if not order:
        raise Exception(f"No such order with {oid} found.")
    return order


def get_customer_by_id_if_exists(cid: int, dbb: Session):
    customer = Crud.get_customer_by_id(dbb, cid)
    if not customer:
        raise Exception(f"No such customer with {cid} found.")
    return customer


def get_db():
    local_db: Session = SessionLocal()
    try:
        yield local_db
    finally:
        local_db.close()  # pylint: disable=no-member
