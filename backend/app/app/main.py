from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.washrooms import router as washrooms_router

app = FastAPI(title="Spotted API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(washrooms_router, prefix="/api")
