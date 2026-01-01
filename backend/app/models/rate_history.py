from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class RateAdjustmentHistory(Base):
    __tablename__ = "rate_adjustment_history"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(Integer, ForeignKey("rooms.id"), nullable=False)

    old_rate = Column(Float, nullable=False)
    new_rate = Column(Float, nullable=False)
    reason = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    room = relationship("Room", back_populates="rate_history")
