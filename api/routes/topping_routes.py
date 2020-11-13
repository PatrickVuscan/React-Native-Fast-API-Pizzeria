"""API routes for the Topping model."""
from typing import List
from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from api.util.utils import get_db, get_topping_by_id_if_exists
from api.schema import schemas
from api.model.crud.crud import Crud

router = APIRouter()


@router.get("/toppings/{tid}", response_model=schemas.ToppingInDB)
def read_topping(tid: int, dbb: Session = Depends(get_db)):
    return get_topping_by_id_if_exists(tid, dbb)


@router.get("/toppings", response_model=List[schemas.ToppingInDB])
def read_toppings(dbb: Session = Depends(get_db)):
    return Crud.get_toppings(dbb=dbb)


@router.post("/toppings", response_model=schemas.ToppingInDB)
def create_topping(topping: schemas.ToppingCreate, dbb: Session = Depends(get_db)):
    return Crud.create_topping(dbb, topping)


@router.put("/toppings/{tid}", response_model=schemas.ToppingInDB)
def update_topping(
    tid: int,
    topping: schemas.ToppingRequestUpdate,
    dbb: Session = Depends(get_db),
):

    prev_top = get_topping_by_id_if_exists(tid, dbb)
    topping_update = schemas.ToppingUpdate(
        topping_id=tid,
        name=topping.name if topping.name else prev_top.name,
        price=topping.price if topping.price else prev_top.price,
    )
    return Crud.update_topping(dbb, topping_update)


@router.delete("/toppings/{tid}", response_model=schemas.ToppingInDB)
def delete_topping(tid: int, dbb: Session = Depends(get_db)):
    get_topping_by_id_if_exists(tid, dbb)
    return Crud.delete_topping(dbb, tid)
