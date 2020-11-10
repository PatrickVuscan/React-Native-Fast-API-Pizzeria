"""Define CRUD operations for Pizza model."""
from sqlalchemy.orm import Session

from api.model.models import Pizza as PizzaModel, Topping as ToppingModel
from api.schema.schemas import PizzaCreate, PizzaUpdate

# Note: using dbb instead of db since pylint complains if var name length
#       is less than 3
#       See https://github.com/PyCQA/pylint/issues/2018 for more details.


class PizzaCRUD:
    """Abtract class defining all CRUD operations for Pizza model."""

    @staticmethod
    def get_pizzas(dbb: Session):
        raise NotImplementedError

    @staticmethod
    def get_pizza_by_id(dbb: Session, pizza_id: int):
        raise NotImplementedError

    @staticmethod
    def create_pizza(dbb: Session, pizza: PizzaCreate):
        raise NotImplementedError

    @staticmethod
    def update_pizza(dbb: Session, pizza: PizzaUpdate):
        raise NotImplementedError

    @staticmethod
    def delete_pizza(dbb: Session, pizza_id: int):
        raise NotImplementedError


class SqlPizzaCRUD(PizzaCRUD):
    """A class containing SQL CRUD operations for Pizza model."""

    @staticmethod
    def get_pizzas(dbb: Session):
        return dbb.query(PizzaModel).all()

    @staticmethod
    def get_pizza_by_id(dbb: Session, pizza_id: int):
        return dbb.query(PizzaModel).filter(PizzaModel.pizza_id == pizza_id).first()

    @staticmethod
    def create_pizza(dbb: Session, pizza: PizzaCreate):
        db_pizza = PizzaModel(**pizza.dict())
        dbb.add(db_pizza)
        dbb.commit()
        dbb.refresh(db_pizza)
        return db_pizza

    @staticmethod
    def update_pizza(dbb: Session, pizza: PizzaUpdate):
        pizza_in_db = dbb.query(PizzaModel).filter(PizzaModel.pizza_id == pizza.pizza_id).first()

        pizza_in_db.name = pizza.name
        pizza_in_db.size = pizza.size
        pizza_in_db.base_price = pizza.base_price

        for topping in pizza.toppings:
            print(f"update_pizza: Toppings found: {topping} with type {type(topping)}")
            tp_in_db = dbb.query(ToppingModel).filter(ToppingModel.topping_id == topping.topping_id).first()
            pizza_in_db.toppings.append(tp_in_db)
        dbb.commit()
        return pizza_in_db

    @staticmethod
    def delete_pizza(dbb: Session, pizza_id: int):
        pizza = SqlPizzaCRUD.get_pizza_by_id(dbb, pizza_id)
        dbb.delete(pizza)
        dbb.commit()
        return pizza
