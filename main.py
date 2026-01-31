from fastapi import FastAPI
app = FastAPI()

@app.POST("/washrooms/")
def mk_washroom {
     "name": "Test Library Washroom",
     "location": {
       "type": "Point",
       "coordinates": [-79.3968, 43.6532]
     },
     "address": "123 College St, Toronto",
     "accessibility_features": {
       "period_products": 3,
       "baby_changing": 2,
       "wheelchair_accessible": 1,
       "gender_neutral": 1,
       "clean": 2,
       "verified": 1,
     },
     "created_by": "test_user"
}

