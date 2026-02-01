from fastapi import FastAPI
from app.routes import washrooms

app = FastAPI(title="Spotted API")

# Include our routes
app.include_router(washrooms.router, prefix="/api")
# meow
@app.get("/")
async def root():
    return {"status": "Spotted Backend is Live!"}
