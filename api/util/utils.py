"""Define utility functions."""
from sqlalchemy.orm import Session
from api.model.crud.crud import Crud


def get_pizza_by_id_if_exists(pid: int, dbb: Session):
    pizza = Crud.get_pizza_by_id(dbb, pid)
    if not pizza:
        raise Exception(f"No such pizza with {pid} found.")
    return pizza
