from sqlalchemy.orm import Session 
from app.models.rate_history import RateAdjustmentHistory 
from app.models.room import Room

def adjust_room_rate(
    db: Session,
    room: Room,
    new_rate: float,
    reason: str
):
    if room.price_per_night == new_rate:
        return room

    try:
        history = RateAdjustmentHistory(
            room_id=room.id,
            old_rate=room.price_per_night,
            new_rate=new_rate,
            reason=reason
        )

        room.price_per_night = new_rate

        db.add(history)
        db.commit()
        db.refresh(room)

        return room

    except Exception as e:
        db.rollback()
        raise

