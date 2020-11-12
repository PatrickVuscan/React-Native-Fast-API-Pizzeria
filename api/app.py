"""Main file"""
from fastapi import FastAPI
import uvicorn

from api.database.db import engine
from api.model import models
from api.routes.pizza_routes import router as pizza_router
from api.routes.topping_routes import router as topping_router
from api.routes.drink_routes import router as drink_router
from api.routes.customer_routes import router as customer_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def hello_world():
    return {"Hello": "World"}


app.include_router(pizza_router)
app.include_router(topping_router)
app.include_router(drink_router)
app.include_router(customer_router)

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=5000,
    )
