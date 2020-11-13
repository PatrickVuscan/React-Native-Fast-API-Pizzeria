"""Aggregate all model CRUD operations."""
from .pizza_crud import SqlPizzaCRUD
from .customer_crud import SqlCustomerCRUD
from .drink_crud import SqlDrinkCRUD
from .topping_crud import SqlToppingCRUD
from .order_crud import SqlOrderCRUD


# pylint: disable=too-many-ancestors
class Crud(SqlPizzaCRUD, SqlCustomerCRUD, SqlDrinkCRUD, SqlToppingCRUD, SqlOrderCRUD):
    """A class containing all Crud operations for all models in database."""
