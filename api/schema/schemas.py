"""Pydantic models."""
from typing import Optional, List
from pydantic import BaseModel

from api.model.models import DeliveryMethodEnum, PizzaSizeEnum, DrinkNameEnum


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

    phone_number: str
    address: Optional[str] = None


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


class CustomerRequestUpdate(BaseModel):
    """A class containing pydantic data validation response."""

    phone_number: Optional[str] = None
    address: Optional[str] = None


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


class DrinkRequestUpdate(BaseModel):
    """A class containing pydantic data validation response."""

    name: Optional[DrinkNameEnum] = None
    price: Optional[float] = None


class OrderBase(BaseModel):
    """A base class containing pydantic data validation for Order model."""

    is_completed: bool = False
    delivery_method: DeliveryMethodEnum = DeliveryMethodEnum.PICKUP


class OrderCreate(OrderBase):
    """A class containing pydantic data validation for creating a Order model row."""


class OrderInDB(OrderBase):
    """A class containing pydantic data validation for in database Order model."""

    order_id: int
    pizzas: List[PizzaInDB] = []
    drinks: List[DrinkInDB] = []

    class Config:
        """Configure pydantic to use orm mode. i.e. drink.id."""

        orm_mode = True


class OrderRequestUpdate(BaseModel):
    """A class containing pydantic data validation response for update request."""

    is_completed: Optional[bool] = None
    delivery_method: Optional[DeliveryMethodEnum] = None
    pizzas: List[int] = []
    drinks: List[int] = []


class OrderUpdate(OrderInDB):
    """A class containing pydantic data validation for updating a Order model row."""
