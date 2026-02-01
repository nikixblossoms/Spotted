def compute_verified(review_count: int) -> bool:
    return review_count >= 3

def compute_score(features: dict, verified: bool) -> int:
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
    return min(10, score)
