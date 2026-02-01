from pydantic import BaseModel, Field
from typing import List, Optional
from fastapi import APIRouter
router = APIRouter()

@router.get("/buildings")
def list_buildings():
    return {"ok": True}

class Review(BaseModel):
   building_id: str
   washroom_id: str
   cleanliness: int 
   gender_neutral: int
   period_products: int
   family_friendly: int 
   accessible: int
   verified: bool = False

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