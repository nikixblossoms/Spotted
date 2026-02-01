import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
buildings_collection = db["buildings"]

seed_data = [
    {
        "building_id": "DC",
        "name": "Davis Centre",
        "lat": 43.4729,
        "lng": -80.5422,
        "washrooms": []
    },
    {
        "building_id": "MC",
        "name": "Mathematics & Computer",
        "lat": 43.4720,
        "lng": -80.5439,
        "washrooms": []
    }
]

def run_seed():
    buildings_collection.delete_many({})
    buildings_collection.insert_many(seed_data)
    print(f"Successfully seeded buildings to {DB_NAME}!")

if __name__ == "__main__":
    run_seed()