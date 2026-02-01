def calculate_washroom_score(washroom_data: dict) -> float:
    score = 0
    if washroom_data.get("cleanliness_score"): # Assume 0-2 from review
        score += washroom_data["cleanliness_score"]
    
    if washroom_data.get("is_accessible"): score += 1
    if washroom_data.get("has_baby_station"): score += 2
    if washroom_data.get("has_period_products"): score += 2
    if washroom_data.get("is_gender_neutral"): score += 1
    
    # Cap at 10
    return min(float(score), 10.0)


