"""Define CRUD operations for Pizza model."""
from sqlalchemy.orm import Session

from api.model.models import Pizza as PizzaModel
from api.schema.schemas import PizzaCreate, PizzaUpdate

# Note: using dbb instead of db since pylint complains if var name length
#       is less than 3
#       See https://github.com/PyCQA/pylint/issues/2018 for more details.


class PizzaCRUD:
    """Abtract class defining all CRUD operations for Exercise model."""

    @classmethod
    def get_pizzas(cls, dbb: Session):
        raise NotImplementedError

    @classmethod
    def get_pizza_by_id(cls, dbb: Session, pizza_id: int):
        raise NotImplementedError

    @classmethod
    def create_pizza(cls, dbb: Session, pizza: PizzaCreate):
        raise NotImplementedError

    @classmethod
    def update_pizza(cls, dbb: Session, pizza: PizzaUpdate):
        raise NotImplementedError

    @classmethod
    def delete_pizza(cls, dbb: Session, pizza_id: int):
        raise NotImplementedError


class SqlPizzaCRUD(PizzaCRUD):
    """A class containing SQL CRUD operations for Exercise model."""

    @classmethod
    def get_pizzas(cls, dbb: Session):
        return dbb.query(PizzaModel).all()

    @classmethod
    def get_pizza_by_id(cls, dbb: Session, pizza_id: int):
        return dbb.query(PizzaModel).filter(PizzaModel.pizza_id == pizza_id).first()

    @classmethod
    def create_pizza(cls, dbb: Session, pizza: PizzaCreate):
        db_pizza = PizzaModel(**pizza.dict())
        dbb.add(db_pizza)
        dbb.commit()
        dbb.refresh(db_pizza)
        return db_pizza

    @classmethod
    def update_pizza(cls, dbb: Session, pizza: PizzaUpdate):
        dbb.add(PizzaUpdate)
        dbb.commit()

    @classmethod
    def delete_pizza(cls, dbb: Session, pizza_id: int):
        pizza = cls.get_pizza_by_id(dbb, pizza_id)
        dbb.delete(pizza)
