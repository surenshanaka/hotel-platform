from fastapi import FastAPI
from app.api import auth, users, rooms

app = FastAPI(title="Hotel Management API")

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(rooms.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}