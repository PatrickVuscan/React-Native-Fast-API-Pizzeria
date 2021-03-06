"""SQL Models"""
import enum
from sqlalchemy import Integer, Enum, Float, Column, String, Table, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy.sql.sqltypes import Boolean

from api.database.db import Base


class PizzaSizeEnum(enum.Enum):
    "Enumerate the sizes of pizza available i.e. XL, L, etc."
    XL = 0
    L = 1
    M = 2
    S = 3


class DrinkNameEnum(enum.Enum):
    "Enumerate the different drink names, i.e. Fanta, Pepsi, etc."
    WATER = 0
    SPARKLING_WATER = 1
    JUICE = 2
    COKE = 3
    DIET_COKE = 4
    ZERO = 5
    PEPSI = 6
    DR_PEPPER = 7


class DeliveryMethodEnum(enum.Enum):
    "Enumerate the different delivery options"
    PICKUP = 0
    IN_HOUSE = 1
    UBER_EATS = 2
    FOODORA = 3


order_pizzas = Table(
    "order_pizza",
    Base.metadata,
    Column("pizza_id", Integer, ForeignKey("pizza.pizza_id")),
    Column("order_id", Integer, ForeignKey("order.order_id")),
)
order_drinks = Table(
    "order_drink",
    Base.metadata,
    Column("drink_id", Integer, ForeignKey("drink.drink_id")),
    Column("order_id", Integer, ForeignKey("order.order_id")),
)

pizza_toppings = Table(
    "pizza_top",
    Base.metadata,
    Column("pizza_id", Integer, ForeignKey("pizza.pizza_id")),
    Column("topping_id", Integer, ForeignKey("topping.topping_id")),
)


class Pizza(Base):
    "Pizza model"
    __tablename__ = "pizza"
    pizza_id = Column("pizza_id", Integer, primary_key=True, nullable=False)
    name = Column("kind", String, nullable=True)
    size = Column("size", Enum(PizzaSizeEnum), nullable=True)
    base_price = Column("base_price", Float, nullable=False)
    _orders = relationship("Order", secondary=order_pizzas, backref=backref("pizzas"))


class Topping(Base):
    "Topping model"
    __tablename__ = "topping"
    topping_id = Column("topping_id", Integer, primary_key=True, nullable=False)
    name = Column("name", String, nullable=False)
    price = Column("price", Float, nullable=False)
    _pizzas = relationship("Pizza", secondary=pizza_toppings, backref=backref("toppings"))


class Drink(Base):
    "Drink model"
    __tablename__ = "drink"
    drink_id = Column("drink_id", Integer, primary_key=True, nullable=False)
    name = Column("name", Enum(DrinkNameEnum), nullable=False)  # Should this instead be a regular string?
    price = Column("price", Float, nullable=False)
    _orders = relationship("Order", secondary=order_drinks, backref=backref("drinks"))


class Order(Base):
    "Order model"
    __tablename__ = "order"
    order_id = Column("order_id", Integer, primary_key=True, nullable=False)
    is_completed = Column("is_completed", Boolean, default=False)
    delivery_method = Column(
        "delivery_method", Enum(DeliveryMethodEnum), default=DeliveryMethodEnum.PICKUP, nullable=False
    )  # Should this instead be a regular string?
    customer_id = Column(Integer, ForeignKey("customer.customer_id"), nullable=False)


class Customer(Base):
    "Customer model"
    __tablename__ = "customer"
    customer_id = Column("customer_id", Integer, primary_key=True, nullable=False)
    phone_number = Column("phone_number", String, nullable=False)
    address = Column("address", String, nullable=True)
    orders = relationship("Order")
