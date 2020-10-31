"""Aggregate all model CRUD operations."""
from .pizza_crud import SqlPizzaCRUD


class Crud(SqlPizzaCRUD):
    """A class containing all Crud operations for all models in database."""
