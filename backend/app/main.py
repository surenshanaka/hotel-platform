from fastapi import FastAPI

app = FastAPI(title="Hotel Management API")

@app.get("/health")
def health_check():
    return {"status": "ok"}
