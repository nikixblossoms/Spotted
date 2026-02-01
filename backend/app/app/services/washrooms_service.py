from typing import Dict, Any, List, Optional

# TEMP MVP: in-memory data.
# Later: swap this to Mongo reads (easy).
WASHROOMS = [
    {
        "id": "w1",
        "name": "Central Library - Floor 2",
        "lat": 43.7735,
        "lng": -79.5019,
        "features": {
            "clean": True,
            "wheelchair_accessible": True,
            "baby_changing": True,
            "baby_changing_location": "family",  # "family" or "public"
            "period_products": True,
            "hygiene_supplies": True,
            "gender_neutral": False,
        },
        "review_count": 4,
        "avg_rating": 4.5,
    },
    {
        "id": "w2",
        "name": "Student Center - Main Floor",
        "lat": 43.7742,
        "lng": -79.4982,
        "features": {
            "clean": True,
            "wheelchair_accessible": False,
            "baby_changing": False,
            "baby_changing_location": None,
            "period_products": False,
            "hygiene_supplies": True,
            "gender_neutral": True,
        },
        "review_count": 2,
        "avg_rating": 3.8,
    },
]

def compute_verified(review_count: int) -> bool:
    return review_count >= 3

def compute_score(features: Dict[str, Any], verified: bool) -> int:
    # weights:
    score = 0
    if features.get("clean"):
        score += 2
    if features.get("wheelchair_accessible"):
        score += 1
    if features.get("baby_changing"):
        score += 2
    if features.get("period_products"):
        score += 2
    if features.get("hygiene_supplies"):
        score += 2
    if features.get("gender_neutral"):
        score += 1
    if verified:
        score += 1

    # Your weights sum to 11, so cap at 10 for the UI scale.
    return min(10, score)

def matches_filters(item: Dict[str, Any], filters: Dict[str, Optional[bool]]) -> bool:
    feats = item["features"]
    verified = item["verified"]

    for key, value in filters.items():
        if value is None:
            continue
        if key == "verified":
            if verified != value:
                return False
        else:
            if feats.get(key) != value:
                return False
    return True

def get_washrooms(filters: Dict[str, Optional[bool]]) -> List[Dict[str, Any]]:
    out = []
    for w in WASHROOMS:
        verified = compute_verified(w["review_count"])
        w2 = {
            "id": w["id"],
            "name": w["name"],
            "lat": w["lat"],
            "lng": w["lng"],
            "features": w["features"],
            "review_count": w["review_count"],
            "avg_rating": w.get("avg_rating"),
            "verified": verified,
        }
        w2["score"] = compute_score(w2["features"], w2["verified"])

        if matches_filters(w2, filters):
            out.append(w2)
    return out
