from sqlalchemy.orm import Session 
from app.models.rate_history import RateAdjustmentHistory 
from app.models.room import Room

def adjust_room_rate(
    db: Session,
    room: Room,
    new_rate: float,
    reason: str
):
    if room.base_price == new_rate:
        return room

    try:
        history = RateAdjustmentHistory(
            room_id=room.id,
            old_rate=room.base_price,
            new_rate=new_rate,
            reason=reason
        )

        room.base_price = new_rate

        db.add(history)
        db.commit()
        db.refresh(room)

        return room

    except Exception:
        db.rollback()
        raise

