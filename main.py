from fastapi import FastAPI
app = FastAPI()

@app.post("/washrooms/")
def mk_washroom(name: str, type: int, coord: int, addy: str, prd_prod: int, baby: int, wheelchair: int, gender: int, clean: int, verified: int, user: str): 
    {
        "name": name,
        "location": 
        {
        "type": type,
        "coordinates": coord,
        },
        "address": addy,
        "accessibility_features": 
        {
        "period_products": prd_prod,
        "baby_changing": baby,
        "wheelchair_accessible": wheelchair,
        "gender_neutral": gender,
        "clean": clean,
        "verified": verified
        },
        "created_by": user
    }

