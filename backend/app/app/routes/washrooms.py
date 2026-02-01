from fastapi import APIRouter, Query
from typing import Optional, List, Dict, Any
from app.services.washrooms_service import get_washrooms

router = APIRouter()

@router.get("/washrooms")
def list_washrooms(
    period_products: Optional[bool] = Query(None),
    wheelchair_accessible: Optional[bool] = Query(None),
    baby_changing: Optional[bool] = Query(None),
    gender_neutral: Optional[bool] = Query(None),
    verified: Optional[bool] = Query(None),
):
    filters = {
        "period_products": period_products,
        "wheelchair_accessible": wheelchair_accessible,
        "baby_changing": baby_changing,
        "gender_neutral": gender_neutral,
        "verified": verified,
    }
    return get_washrooms(filters)
