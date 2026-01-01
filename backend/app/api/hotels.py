from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.core.database import SessionLocal
from app.models.hotel import Hotel
from app.schemas.hotel import HotelCreate, HotelUpdate, HotelResponse

router = APIRouter(prefix="/hotels", tags=["Hotels"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# HOTEL CRUD
# -----------------------------

@router.get("/", response_model=list[HotelResponse])
def list_hotels(db: Session = Depends(get_db)):
    return db.query(Hotel).options(joinedload(Hotel.rooms)).all()


@router.post("/")
def create_hotel(hotel: HotelCreate, db: Session = Depends(get_db)):
    new_hotel = Hotel(name=hotel.name)
    db.add(new_hotel)
    db.commit()
    db.refresh(new_hotel)
    return new_hotel


@router.get("/{hotel_id}", response_model=HotelResponse)
def get_hotel(hotel_id: int, db: Session = Depends(get_db)):
    hotel = db.query(Hotel).options(joinedload(Hotel.rooms)).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return hotel


@router.put("/{hotel_id}")
def update_hotel(
    hotel_id: int,
    data: HotelUpdate,
    db: Session = Depends(get_db)
):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")

    hotel.name = data.name
    db.commit()
    return hotel


@router.delete("/{hotel_id}")
def delete_hotel(hotel_id: int, db: Session = Depends(get_db)):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")

    db.delete(hotel)
    db.commit()
    return {"message": "Hotel deleted"}
