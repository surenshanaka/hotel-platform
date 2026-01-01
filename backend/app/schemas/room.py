from pydantic import BaseModel

class RoomCreate(BaseModel):
    hotel_id: int
    price_per_night: float

class RoomUpdate(BaseModel):
    price_per_night: float

class RoomResponse(BaseModel):
    id: int
    price_per_night: float
    hotel_id: int

    class Config:
        from_attributes = True
