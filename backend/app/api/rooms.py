from fastapi import APIRouter
from app.services.rate_service import calculate_effective_rate

router = APIRouter(prefix="/rooms", tags=["Rooms"])

@router.get("/{room_id}/rate")
def get_effective_rate(room_id: int, days_before_checkin: int):
    base_price = 100.0  # mocked for assessment
    rate = calculate_effective_rate(base_price, days_before_checkin)
    return {"effective_rate": rate}
