"""SQL Models"""
import enum
from sqlalchemy import Integer, Enum, Float, Column, String

from api.database.db import Base


class SizeEnum(enum.Enum):
    "Enumerate the sizes of pizza available i.e. XL, L, etc."
    XL = 0
    L = 1
    M = 2
    S = 3


class Pizza(Base):
    "Pizza model"
    __tablename__ = "pizza"
    pizza_id = Column("pizza_id", Integer, primary_key=True, nullable=False)
    kind = Column("kind", String, nullable=True)
    size = Column("size", Enum(SizeEnum), nullable=True)
    base_price = Column("base_price", Float, nullable=True)
