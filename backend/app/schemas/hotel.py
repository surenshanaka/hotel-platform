from pydantic import BaseModel
from typing import List
from .room import RoomResponse

class HotelCreate(BaseModel):
    name: str


class HotelUpdate(BaseModel):
    name: str


class HotelResponse(BaseModel):
    id: int
    name: str
    rooms: List[RoomResponse] = []

    class Config:
        from_attributes = True
