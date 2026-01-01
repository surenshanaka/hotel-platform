from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.hotel import HotelCreate
from app.models.hotel import Hotel

router = APIRouter(prefix="/hotels", tags=["Hotels"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{hotel_id}")
def get_hotel(hotel_id: int, db: Session = Depends(get_db)):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return hotel


@router.post("/")
def create_hotel(hotel: HotelCreate, db: Session = Depends(get_db)):
    new_hotel = Hotel(name=hotel.name)
    db.add(new_hotel)
    db.commit()
    db.refresh(new_hotel)
    return new_hotel

