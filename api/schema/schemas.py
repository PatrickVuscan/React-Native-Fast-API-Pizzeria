"""Pydantic models."""
from pydantic import BaseModel

from api.model.models import SizeEnum


class PizzaBase(BaseModel):
    """A base class containing pydantic data validation for Pizza model."""

    kind: str
    size: SizeEnum
    base_price: int


class PizzaCreate(PizzaBase):
    """A class containing pydantic data validation for creating a Pizza model row."""


class PizzaInDB(PizzaBase):
    """A class containing pydantic data validation for in database Pizza model."""

    pizza_id: int

    class Config:
        """Configure pydantic to use orm mode. i.e. pizza.id."""

        orm_mode = True


class PizzaUpdate(PizzaInDB):
    """A class containing pydantic data validation for updating a Pizza model row."""
