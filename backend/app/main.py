from fastapi import FastAPI
from app.core.database import engine
from app.models import base

app = FastAPI(title="Hotel Management API")

base.Base.metadata.create_all(bind=engine)

@app.get("/health")
def health_check():
    return {"status": "ok"}
