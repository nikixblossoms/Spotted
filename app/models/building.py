from pydantic import BaseModel, Field
from typing import List, Optional
from fastapi import APIRouter
router = APIRouter()

@router.get("/buildings")
def list_buildings():
    return {"ok": True}

class Review(BaseModel):
    username: str
    rating: int
    comment: str

class Washroom(BaseModel):
    washroom_id: str
    floor: int
    is_gender_neutral: bool = False
    has_period_products: bool = False
    is_accessible: bool = False
    has_baby_station: bool = False
    verified: bool = False

class Building(BaseModel):
    building_id: str
    name: str
    lat: float
    lng: float
    washrooms: List[Washroom] = []

@router.get("/buildings/nearby")
async def get_nearby(lat: float, lng: float):
    # Find buildings within a certain radius
    cursor = db.buildings.find({
        "location": {
            "$near": {
                "$geometry": {"type": "Point", "coordinates": [lng, lat]},
                "$maxDistance": 1000  # 1km radius
            }
        }
    })
    return await cursor.to_list(length=10)