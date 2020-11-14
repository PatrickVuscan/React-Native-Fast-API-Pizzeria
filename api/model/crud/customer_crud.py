"""Define CRUD operations for Customer model."""
from sqlalchemy.orm import Session

from api.model.models import Customer as CustomerModel
from api.schema.schemas import CustomerCreate, CustomerUpdate

# Note: using dbb instead of db since pylint complains if var name length
#       is less than 3
#       See https://github.com/PyCQA/pylint/issues/2018 for more details.


class CustomerCRUD:
    """Abtract class defining all CRUD operations for Customer model."""

    @staticmethod
    def get_customers(dbb: Session):
        raise NotImplementedError

    @staticmethod
    def get_customer_by_id(dbb: Session, customer_id: int):
        raise NotImplementedError

    @staticmethod
    def create_customer(dbb: Session, customer: CustomerCreate):
        raise NotImplementedError

    @staticmethod
    def update_customer(dbb: Session, customer: CustomerUpdate):
        raise NotImplementedError

    @staticmethod
    def delete_customer(dbb: Session, customer_id: int):
        raise NotImplementedError


class SqlCustomerCRUD(CustomerCRUD):
    """A class containing SQL CRUD operations for Customer model."""

    @staticmethod
    def get_customers(dbb: Session):
        return dbb.query(CustomerModel).all()

    @staticmethod
    def get_customer_by_id(dbb: Session, customer_id: int):
        return dbb.query(CustomerModel).filter(CustomerModel.customer_id == customer_id).first()

    @staticmethod
    def create_customer(dbb: Session, customer: CustomerCreate):
        db_customer = CustomerModel(**customer.dict())
        dbb.add(db_customer)
        dbb.commit()
        dbb.refresh(db_customer)
        return db_customer

    @staticmethod
    def update_customer(dbb: Session, customer: CustomerUpdate):
        customer_in_db = SqlCustomerCRUD.get_customer_by_id(dbb, customer.customer_id)

        customer_in_db.address = customer.address
        customer_in_db.phone_number = customer.phone_number

        dbb.commit()
        return customer_in_db

    @staticmethod
    def delete_customer(dbb: Session, customer_id: int):
        customer = SqlCustomerCRUD.get_customer_by_id(dbb, customer_id)
        dbb.delete(customer)
