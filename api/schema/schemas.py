"""Pydantic models."""
from typing import Optional, List
from pydantic import BaseModel

from api.model.models import PizzaSizeEnum, DrinkNameEnum


class ToppingBase(BaseModel):
    """A base class containing pydantic data validation for Topping model."""

    name: str
    price: float


class ToppingCreate(ToppingBase):
    """A class containing pydantic data validation for creating a Topping model row."""


class ToppingInDB(ToppingBase):
    """A class containing pydantic data validation for in database Topping model."""

    topping_id: int
    # pizzas: Optional[List["PizzaInDB"]] = []

    class Config:
        """Configure pydantic to use orm mode. i.e. topping.id."""

        orm_mode = True


class ToppingUpdate(ToppingInDB):
    """A class containing pydantic data validation for updating a Topping model row."""


class ToppingRequestUpdate(BaseModel):
    """A class containing pydantic data validation response for update request."""

    name: Optional[str] = None
    price: Optional[float] = None


class PizzaBase(BaseModel):
    """A base class containing pydantic data validation for Pizza model."""

    name: str
    size: PizzaSizeEnum
    base_price: float


class PizzaCreate(PizzaBase):
    """A class containing pydantic data validation for creating a Pizza model row."""


class PizzaInDB(PizzaBase):
    """A class containing pydantic data validation for in database Pizza model."""

    pizza_id: int
    toppings: List[ToppingInDB] = []

    class Config:
        """Configure pydantic to use orm mode. i.e. topping.id."""

        orm_mode = True


class PizzaUpdate(PizzaInDB):
    """A class containing pydantic data validation for updating a Pizza model row."""


class PizzaRequestUpdate(BaseModel):
    """A class containing pydantic data validation response."""

    name: Optional[str] = None
    size: Optional[PizzaSizeEnum] = None
    base_price: Optional[float] = None
    toppings: List[int] = []


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


class DrinkBase(BaseModel):
    """A base class containing pydantic data validation for Drink model."""

    name: DrinkNameEnum
    price: float


class DrinkCreate(DrinkBase):
    """A class containing pydantic data validation for creating a Drink model row."""


class DrinkInDB(DrinkBase):
    """A class containing pydantic data validation for in database Drink model."""

    drink_id: int

    class Config:
        """Configure pydantic to use orm mode. i.e. drink.id."""

        orm_mode = True


class DrinkUpdate(DrinkInDB):
    """A class containing pydantic data validation for updating a Drink model row."""
