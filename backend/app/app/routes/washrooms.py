from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.building import Washroom, Review
from app.utils.scoring import calculate_washroom_score

router = APIRouter()

@router.post("/buildings/{b_id}/washrooms")
async def add_washroom(b_id: str, washroom: Washroom):
    # Push a new washroom into the building's list
    result = await db.buildings.update_one(
        {"building_id": b_id},
        {"$push": {"washrooms": washroom.dict()}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Building not found")
    return {"message": "Washroom added!"}

@router.post("/buildings/{b_id}/washrooms/{w_id}/reviews")
async def add_review(b_id: str, w_id: str, review: Review):
    # 1. Add the review to the washroom
    await db.buildings.update_one(
        {"building_id": b_id, "washrooms.washroom_id": w_id},
        {"$push": {"washrooms.$.reviews": review.dict()}}
    )

    # 2. Fetch the updated washroom to calculate the new state
    building = await db.buildings.find_one({"building_id": b_id})
    washroom = next((w for w in building['washrooms'] if w['washroom_id'] == w_id), None)

    # 3. Calculate Score and Verification
    # Start with the features (accessibility, products, etc.)
    new_score = 0
    if washroom.get("is_accessible"): new_score += 1
    if washroom.get("has_period_products"): new_score += 2
    if washroom.get("has_baby_station"): new_score += 2
    if washroom.get("is_gender_neutral"): new_score += 1
    
    # Check Verification (The 3-review rule)
    is_verified = len(washroom.get("reviews", [])) >= 3
    if is_verified: new_score += 1 # Bonus point for being verified!

    # 4. Save the final results back to MongoDB
    await db.buildings.update_one(
        {"building_id": b_id, "washrooms.washroom_id": w_id},
        {"$set": {
            "washrooms.$.ai_score": min(new_score, 10),
            "washrooms.$.verified": is_verified
        }}
    )

    return {"message": "Review added!", "new_score": new_score, "verified": is_verified}