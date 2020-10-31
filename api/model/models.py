"""SQL Models"""
import enum
from sqlalchemy import Integer, Enum, Float, Column, String

from api.database.db import Base


class PizzaSizeEnum(enum.Enum):
    "Enumerate the sizes of pizza available i.e. XL, L, etc."
    XL = 0
    L = 1
    M = 2
    S = 3


class DrinkNameEnum(enum.Enum):
    "Enumerate the different drink names, i.e. Fanta, Pepsi, etc."
    Water = 0
    Sparkling_Water = 1
    Juice = 2
    Coke = 3
    Diet_Coke = 4
    Zero = 5
    Pepsi = 6
    Dr_Pepper = 7


class DeliveryTypeEnum(enum.Enum):
    "Enumerate the different delivery options"
    Pickup = 0
    InHouse = 1
    UberEats = 2
    Foodora = 3


class Pizza(Base):
    "Pizza model"
    __tablename__ = "pizza"
    pizza_id = Column("pizza_id", Integer, primary_key=True, nullable=False)
    name = Column("kind", String, nullable=True)
    size = Column("size", Enum(PizzaSizeEnum), nullable=True)
    base_price = Column("base_price", Float, nullable=False)


class Drink(Base):
    "Drink model"
    __tablename__ = "drink"
    drink_id = Column("drink_id", Integer, primary_key=True, nullable=False)
    name = Column("name", Enum(DrinkNameEnum), nullable=False)  # Should this instead be a regular string?
    price = Column("price", Float, nullable=False)


class Topping(Base):
    "Topping model"
    __tablename__ = "topping"
    topping_id = Column("topping_id", Integer, primary_key=True, nullable=False)
    name = Column("name", String, nullable=False)
    price = Column("price", Float, nullable=False)


class Customer(Base):
    "Customer model"
    __tablename__ = "customer"
    customer_id = Column("customer_id", Integer, primary_key=True, nullable=False)
    address = Column("address", String, nullable=False)
