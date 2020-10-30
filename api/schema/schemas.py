"""Pydantic models."""
from pydantic import BaseModel

from api.model.models import PizzaSizeEnum


class PizzaBase(BaseModel):
    """A base class containing pydantic data validation for Pizza model."""

    kind: str
    size: PizzaSizeEnum
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


class CustomerBase(BaseModel):
    """A base class containing pydantic data validation for Customer model."""

    address: str


class CustomerCreate(CustomerBase):
    """A class containing pydantic data validation for creating a Customer model row."""


class CustomerInDB(CustomerBase):
    """A class containing pydantic data validation for in database Customer model."""

    customer_id: int

    class Config:
        """Configure pydantic to use orm mode. i.e. customer.id."""

        orm_mode = True


class CustomerUpdate(CustomerInDB):
    """A class containing pydantic data validation for updating a Customer model row."""
