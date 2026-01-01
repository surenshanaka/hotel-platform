from pydantic import BaseModel

class RateAdjustmentCreate(BaseModel):
    new_rate: float
    reason: str
