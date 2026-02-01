from fastapi import FastAPI, HTTPException
from bson import ObjectId
import os
import googlemaps
from dotenv import load_dotenv

from database import buildings_collection, washrooms_collection, reviews_collection

load_dotenv()
map_client = googlemaps.Client(key=os.getenv("Maps_API_Key"))

app = FastAPI()

@app.get("/buildings")
def get_buildings():
    buildings = list(buildings_collection.find({}, {"_id": 0}))
    return {"buildings": buildings}

@app.get("/washrooms")
def get_washrooms():
    washrooms = list(washrooms_collection.find({}, {"_id": 0}))
    return {"washrooms": washrooms}

@app.get("/reviews")
def get_reviews():
    reviews = list(reviews_collection.find({}, {"_id": 0}))
    return {"reviews": reviews}

def verify_washroom(washroom_id: str) -> bool:
    count = reviews_collection.count_documents({"washroom_id": washroom_id, "verified": True})
    return count >= 3
