"""Define CRUD operations for Drink model."""
from sqlalchemy.orm import Session

from api.model.models import Drink as DrinkModel
from api.schema.schemas import DrinkCreate, DrinkUpdate

# Note: using dbb instead of db since pylint complains if var name length
#       is less than 3
#       See https://github.com/PyCQA/pylint/issues/2018 for more details.


class DrinkCRUD:
    """Abtract class defining all CRUD operations for Drink model."""

    @classmethod
    def get_drinks(cls, dbb: Session):
        raise NotImplementedError

    @classmethod
    def get_drink_by_id(cls, dbb: Session, drink_id: int):
        raise NotImplementedError

    @classmethod
    def create_drink(cls, dbb: Session, drink: DrinkCreate):
        raise NotImplementedError

    @classmethod
    def update_drink(cls, dbb: Session, drink: DrinkUpdate):
        raise NotImplementedError

    @classmethod
    def delete_drink(cls, dbb: Session, drink_id: int):
        raise NotImplementedError


class SqlDrinkCRUD(DrinkCRUD):
    """A class containing SQL CRUD operations for Drink model."""

    @classmethod
    def get_drinks(cls, dbb: Session):
        return dbb.query(DrinkModel).all()

    @classmethod
    def get_drink_by_id(cls, dbb: Session, drink_id: int):
        return dbb.query(DrinkModel).filter(DrinkModel.drink_id == drink_id).first()

    @classmethod
    def create_drink(cls, dbb: Session, drink: DrinkCreate):
        db_drink = DrinkModel(**drink.dict())
        dbb.add(db_drink)
        dbb.commit()
        dbb.refresh(db_drink)
        return db_drink

    @classmethod
    def update_drink(cls, dbb: Session, drink: DrinkUpdate):
        dbb.add(DrinkUpdate)
        dbb.commit()

    @classmethod
    def delete_drink(cls, dbb: Session, drink_id: int):
        drink = cls.get_drink_by_id(dbb, drink_id)
        dbb.delete(drink)
