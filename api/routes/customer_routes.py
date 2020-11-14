"""API routes for the Customer model."""
from typing import List
from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from api.model.crud.crud import Crud
from api.schema import schemas
from api.util.utils import get_db, get_customer_by_id_if_exists

router = APIRouter()


@router.post("/customers", response_model=schemas.CustomerInDB)
def create_customer(customer: schemas.CustomerCreate, dbb: Session = Depends(get_db)):
    return Crud.create_customer(dbb, customer)


@router.get("/customers", response_model=List[schemas.CustomerInDB])
def read_customers(dbb: Session = Depends(get_db)):
    return Crud.get_customers(dbb=dbb)


@router.get("/customers/{cid}", response_model=schemas.CustomerInDB)
def read_customer(cid: int, dbb: Session = Depends(get_db)):
    return get_customer_by_id_if_exists(cid, dbb)


@router.put("/customers/{cid}", response_model=schemas.CustomerInDB)
def update_customer(cid: int, customer: schemas.CustomerRequestUpdate, dbb: Session = Depends(get_db)):
    prev_customer = get_customer_by_id_if_exists(cid, dbb)

    customer_update = schemas.CustomerUpdate(
        customer_id=cid,
        phone_number=customer.phone_number if customer.phone_number else prev_customer.phone_number,
        address=customer.address if customer.address else prev_customer.address,
    )

    return Crud.update_customer(dbb=dbb, customer=customer_update)
