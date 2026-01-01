from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.room import Room
from app.schemas.room import RoomCreate, RoomUpdate
from app.schemas.rate_history import RateAdjustmentCreate

router = APIRouter(prefix="/rooms", tags=["Rooms"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# ROOM CRUD
# -----------------------------

@router.get("/")
def list_rooms(db: Session = Depends(get_db)):
    return db.query(Room).all()


@router.post("/")
def create_room(room: RoomCreate, db: Session = Depends(get_db)):
    new_room = Room(**room.dict())
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room


@router.get("/{room_id}")
def get_room(room_id: int, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room


@router.put("/{room_id}")
def update_room(room_id: int, data: RoomUpdate, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    room.price_per_night = data.price_per_night
    db.commit()
    return room


@router.delete("/{room_id}")
def delete_room(room_id: int, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    db.delete(room)
    db.commit()
    return {"message": "Room deleted"}


# -----------------------------
# BUSINESS LOGIC
# -----------------------------

@router.post("/{room_id}/adjust-rate")
def adjust_rate(
    room_id: int,
    payload: RateAdjustmentCreate,
    db: Session = Depends(get_db)
):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    updated_room = adjust_room_rate(
        db,
        room,
        payload.new_rate,
        payload.reason
    )

    return {
        "message": "Rate updated successfully",
        "room_id": updated_room.id,
        "new_rate": updated_room.base_price
    }

@router.get("/{room_id}/rate-history")
def get_rate_history(room_id: int, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    return room.rate_history

