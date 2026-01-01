from pydantic import BaseModel

class HotelCreate(BaseModel):
    name: str


class HotelUpdate(BaseModel):
    name: str
