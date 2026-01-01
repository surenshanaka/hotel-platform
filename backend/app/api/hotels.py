from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.hotel import Hotel

router = APIRouter(prefix="/hotels", tags=["Hotels"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def list_hotels(db: Session = Depends(get_db)):
    return db.query(Hotel).all()
