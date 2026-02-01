from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client.spotted_data
buildings_collection = db.buildings
washrooms_collection = db.washrooms
reviews_collection = db.reviews
