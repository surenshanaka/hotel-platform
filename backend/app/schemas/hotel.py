from pydantic import BaseModel

class HotelCreate(BaseModel):
    name: str
