"""Define CRUD operations for Drink model."""
from sqlalchemy.orm import Session

from api.model.models import Drink as DrinkModel
from api.schema.schemas import DrinkCreate, DrinkUpdate

# Note: using dbb instead of db since pylint complains if var name length
#       is less than 3
#       See https://github.com/PyCQA/pylint/issues/2018 for more details.


class DrinkCRUD:
    """Abtract class defining all CRUD operations for Drink model."""

    @staticmethod
    def get_drinks(dbb: Session):
        raise NotImplementedError

    @staticmethod
    def get_drink_by_id(dbb: Session, drink_id: int):
        raise NotImplementedError

    @staticmethod
    def create_drink(dbb: Session, drink: DrinkCreate):
        raise NotImplementedError

    @staticmethod
    def update_drink(dbb: Session, drink: DrinkUpdate):
        raise NotImplementedError

    @staticmethod
    def delete_drink(dbb: Session, drink_id: int):
        raise NotImplementedError


class SqlDrinkCRUD(DrinkCRUD):
    """A class containing SQL CRUD operations for Drink model."""

    @staticmethod
    def get_drinks(dbb: Session):
        return dbb.query(DrinkModel).all()

    @staticmethod
    def get_drink_by_id(dbb: Session, drink_id: int):
        return dbb.query(DrinkModel).filter(DrinkModel.drink_id == drink_id).first()

    @staticmethod
    def create_drink(dbb: Session, drink: DrinkCreate):
        db_drink = DrinkModel(**drink.dict())
        dbb.add(db_drink)
        dbb.commit()
        dbb.refresh(db_drink)
        return db_drink

    @staticmethod
    def update_drink(dbb: Session, drink: DrinkUpdate):
        drink_in_db = SqlDrinkCRUD.get_drink_by_id(dbb, drink.drink_id)
        drink_in_db.name = drink.name
        drink_in_db.price = drink.price
        dbb.commit()
        return drink_in_db

    @staticmethod
    def delete_drink(dbb: Session, drink_id: int):
        drink = SqlDrinkCRUD.get_drink_by_id(dbb, drink_id)
        dbb.delete(drink)
        dbb.commit()
        return drink
