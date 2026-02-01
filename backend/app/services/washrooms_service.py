from typing import Optional, Dict, Any, List
from app.utils.scoring import compute_score, compute_verified

# MVP hardcoded data (demo now, db swap later)
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
            "baby_changing_location": "family",
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

def _matches_filters(w: Dict[str, Any], filters: Dict[str, Optional[bool]]) -> bool:
    feats = w["features"]
    for key, val in filters.items():
        if val is None:
            continue
        if key == "verified":
            if w["verified"] != val:
                return False
        else:
            if feats.get(key) != val:
                return False
    return True

def list_washrooms(filters: Dict[str, Optional[bool]]) -> List[Dict[str, Any]]:
    out = []
    for w in WASHROOMS:
        verified = compute_verified(w["review_count"])
        enriched = {**w, "verified": verified}
        enriched["score"] = compute_score(enriched["features"], enriched["verified"])
        if _matches_filters(enriched, filters):
            out.append(enriched)
    return out
