"""Define CRUD operations for Topping model."""
from sqlalchemy.orm import Session

from api.model.models import Topping as ToppingModel
from api.schema.schemas import ToppingCreate, ToppingUpdate

# Note: using dbb instead of db since pylint complains if var name length
#       is less than 3
#       See https://github.com/PyCQA/pylint/issues/2018 for more details.


class ToppingCRUD:
    """Abtract class defining all CRUD operations for Topping model."""

    @staticmethod
    def get_toppings(dbb: Session):
        raise NotImplementedError

    @staticmethod
    def get_topping_by_id(dbb: Session, topping_id: int):
        raise NotImplementedError

    @staticmethod
    def create_topping(dbb: Session, topping: ToppingCreate):
        raise NotImplementedError

    @staticmethod
    def update_topping(dbb: Session, topping: ToppingUpdate):
        raise NotImplementedError

    @staticmethod
    def delete_topping(dbb: Session, topping_id: int):
        raise NotImplementedError


class SqlToppingCRUD(ToppingCRUD):
    """A class containing SQL CRUD operations for Topping model."""

    @staticmethod
    def get_toppings(dbb: Session):
        return dbb.query(ToppingModel).all()

    @staticmethod
    def get_topping_by_id(dbb: Session, topping_id: int):
        return dbb.query(ToppingModel).filter(ToppingModel.topping_id == topping_id).first()

    @staticmethod
    def create_topping(dbb: Session, topping: ToppingCreate):
        db_topping = ToppingModel(**topping.dict())
        dbb.add(db_topping)
        dbb.commit()
        dbb.refresh(db_topping)
        return db_topping

    @staticmethod
    def update_topping(dbb: Session, topping: ToppingUpdate):
        top_in_db = SqlToppingCRUD.get_topping_by_id(dbb, topping.topping_id)
        top_in_db.name = topping.name
        top_in_db.price = topping.price
        dbb.commit()
        return top_in_db

    @staticmethod
    def delete_topping(dbb: Session, topping_id: int):
        topping = SqlToppingCRUD.get_topping_by_id(dbb, topping_id)
        dbb.delete(topping)
        dbb.commit()
        return topping
