"""API routes for Drink model."""
from typing import List
from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from api.model.crud.crud import Crud
from api.util.utils import get_db, get_drink_by_id_if_exists
from api.schema import schemas

router = APIRouter()


@router.get("/drinks/{did}", response_model=schemas.DrinkInDB)
def read_drink(did: int, dbb: Session = Depends(get_db)):
    return get_drink_by_id_if_exists(did, dbb)


@router.get("/drinks", response_model=List[schemas.DrinkInDB])
def read_drinks(dbb: Session = Depends(get_db)):
    return Crud.get_drinks(dbb=dbb)


@router.post("/drinks", response_model=schemas.DrinkInDB)
def create_drink(drink: schemas.DrinkCreate, dbb: Session = Depends(get_db)):
    return Crud.create_drink(dbb, drink)


@router.put("/drinks/{did}", response_model=schemas.DrinkInDB)
def update_drink(
    did: int,
    drink: schemas.DrinkRequestUpdate,
    dbb: Session = Depends(get_db),
):

    prev_drink = get_drink_by_id_if_exists(did, dbb)
    drink_update = schemas.DrinkUpdate(
        drink_id=did,
        name=drink.name if drink.name else prev_drink.name,
        price=drink.price if drink.price else prev_drink.price,
    )
    return Crud.update_drink(dbb, drink_update)


@router.delete("/drinks/{did}", response_model=schemas.DrinkInDB)
def delete_drink(did: int, dbb: Session = Depends(get_db)):
    get_drink_by_id_if_exists(did, dbb)
    return Crud.delete_drink(dbb, did)
