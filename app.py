"""Main file"""
from fastapi import FastAPI
from sqlalchemy.orm import Session
import uvicorn

from api.database.db import engine, SessionLocal, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    local_db: Session = SessionLocal()
    try:
        yield local_db
    finally:
        local_db.close() # pylint: disable=no-member


@app.get("/")
def hello_world():
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=5000,
    )
