"""Define CRUD operations for Customer model."""
from sqlalchemy.orm import Session

from api.model.models import Customer as CustomerModel
from api.schema.schemas import CustomerCreate, CustomerUpdate

# Note: using dbb instead of db since pylint complains if var name length
#       is less than 3
#       See https://github.com/PyCQA/pylint/issues/2018 for more details.


class CustomerCRUD:
    """Abtract class defining all CRUD operations for Customer model."""

    @classmethod
    def get_customers(cls, dbb: Session):
        raise NotImplementedError

    @classmethod
    def get_customer_by_id(cls, dbb: Session, customer_id: int):
        raise NotImplementedError

    @classmethod
    def create_customer(cls, dbb: Session, customer: CustomerCreate):
        raise NotImplementedError

    @classmethod
    def update_customer(cls, dbb: Session, customer: CustomerUpdate):
        raise NotImplementedError

    @classmethod
    def delete_customer(cls, dbb: Session, customer_id: int):
        raise NotImplementedError


class SqlCustomerCRUD(CustomerCRUD):
    """A class containing SQL CRUD operations for Customer model."""

    @classmethod
    def get_customers(cls, dbb: Session):
        return dbb.query(CustomerModel).all()

    @classmethod
    def get_customer_by_id(cls, dbb: Session, customer_id: int):
        return dbb.query(CustomerModel).filter(CustomerModel.customer_id == customer_id).first()

    @classmethod
    def create_customer(cls, dbb: Session, customer: CustomerCreate):
        db_customer = CustomerModel(**customer.dict())
        dbb.add(db_customer)
        dbb.commit()
        dbb.refresh(db_customer)
        return db_customer

    @classmethod
    def update_customer(cls, dbb: Session, customer: CustomerUpdate):
        dbb.add(CustomerUpdate)
        dbb.commit()

    @classmethod
    def delete_customer(cls, dbb: Session, customer_id: int):
        customer = cls.get_customer_by_id(dbb, customer_id)
        dbb.delete(customer)
