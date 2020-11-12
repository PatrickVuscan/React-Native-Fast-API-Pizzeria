"""Define CRUD operations for Order model."""
from sqlalchemy.orm import Session

from api.model.models import Order as OrderModel, Pizza as PizzaModel
from api.schema.schemas import OrderCreate, OrderUpdate

# Note: using dbb instead of db since pylint complains if var name length
#       is less than 3
#       See https://github.com/PyCQA/pylint/issues/2018 for more details.


class OrderCRUD:
    """Abtract class defining all CRUD operations for Order model."""

    @staticmethod
    def get_orders(dbb: Session):
        raise NotImplementedError

    @staticmethod
    def get_order_by_id(dbb: Session, order_id: int):
        raise NotImplementedError

    @staticmethod
    def create_order(dbb: Session, order: OrderCreate):
        raise NotImplementedError

    @staticmethod
    def update_order(dbb: Session, order: OrderUpdate):
        raise NotImplementedError

    @staticmethod
    def delete_order(dbb: Session, order_id: int):
        raise NotImplementedError


class SqlOrderCRUD(OrderCRUD):
    """A class containing SQL CRUD operations for Order model."""

    @staticmethod
    def get_orders(dbb: Session):
        return dbb.query(OrderModel).all()

    @staticmethod
    def get_order_by_id(dbb: Session, order_id: int):
        return dbb.query(OrderModel).filter(OrderModel.order_id == order_id).first()

    @staticmethod
    def create_order(dbb: Session, order: OrderCreate):
        db_order = OrderModel(**order.dict())
        dbb.add(db_order)
        dbb.commit()
        dbb.refresh(db_order)
        return db_order

    @staticmethod
    def delete_order(dbb: Session, order_id: int):
        order = SqlOrderCRUD.get_order_by_id(dbb, order_id)
        dbb.delete(order)
        dbb.commit()
        return order

    @staticmethod
    def update_order(dbb: Session, order: OrderUpdate):
        order_in_db = SqlOrderCRUD.get_order_by_id(dbb, order.order_id)

        order_in_db.is_completed = order.is_completed
        order_in_db.delivery_method = order_in_db.delivery_method

        order_in_db.pizzas = []
        for p in order.pizzas:
            p_in_db = dbb.query(PizzaModel).filter(PizzaModel.pizza_id == p.pizza_id).first()
            order_in_db.pizzas.append(p_in_db)

        dbb.commit()
        return order_in_db
