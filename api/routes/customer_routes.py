"""API routes for the Customer model."""
from typing import List
from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from api.model.crud.crud import Crud
from api.schema import schemas
from api.util.utils import get_db

router = APIRouter()


@router.post("/customers", response_model=schemas.CustomerInDB)
def create_customer(customer: schemas.CustomerCreate, dbb: Session = Depends(get_db)):
    return Crud.create_customer(dbb, customer)


@router.get("/customers", response_model=List[schemas.CustomerInDB])
def read_customers(dbb: Session = Depends(get_db)):
    return Crud.get_customers(dbb=dbb)
