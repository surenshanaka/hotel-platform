from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, users, rooms, hotels

app = FastAPI(title="Hotel Management API")

# Allow requests from your frontend
origins = [
    "http://localhost:3000",  # Next.js dev
    "http://127.0.0.1:3000",  # Next.js dev alternate
    # Add your production URL here when deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all (not recommended in production)
    allow_credentials=True,
    allow_methods=["*"],    # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],    # Authorization, Content-Type, etc.
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(rooms.router)
app.include_router(hotels.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}