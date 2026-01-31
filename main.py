from fastapi import FastAPI
app = FastAPI()
import requests
from dataclasses import dataclass
from datetime import datetime
from typing import Dict, Optional, List

BASE_URL = "http://localhost:8000"

buildings = [
    "AE1",   # Accolade East
    "AW2",   # Accolade West
    "AGPS3", # Adler Graduate Professional School
    "BSB4",  # Behavioural Sciences Building
    "BC5",   # Bethune College
    "BB6",   # Biology Building
    "BA7",   # Burton Auditorium
    "CC8",   # Calumet College
    "CUB9",  # Central Utilities Building
    "CB10",  # Chemistry Building
    "CSE11", # Computer Science & Engineering Building
    "CLH12", # Curtis Lecture Halls
    "DB13",  # Dahdaleh Building
    "FLS14", # Farquharson Life Sciences Building
    "FC15",  # Founders College
    "HNES16",# Health, Nursing & Environmental Studies
    "IMB17", # Ian Macdonald Boulevard Centre
    "KT18",  # Kaneff Tower
    "LB19",  # Lassonde Building
    "LSB20", # Life Sciences Building
    "MC21",  # McLaughlin College
    "NBC22", # Norman Bethune College
    "OHL23", # Osgoode Hall Law School
    "PSE24", # Petrie Science & Engineering Building
    "RB25",  # Ross Building
    "SL26",  # Scott Library
    "SC27",  # Senate Chamber
    "SSB28", # Schulich School of Business
    "SHSRC29",# Sherman Health Sciences Research Centre
    "SLH30", # Stedman Lecture Halls
    "SSE31", # Steacie Science & Engineering Library
    "TEL32", # Technology Enhanced Learning Building
    "VH33",  # Vari Hall
    "WOB34", # West Office Building
    "WC35",  # Winters College
    "YL36",  # York Lanes
    "AGYU37",# Art Gallery of York University
    "CFT38", # Centre for Film & Theatre
    "GFCA39",# Goldfarb Centre for Fine Arts
    "MPS40", # McLean Performance Studio
    "AC41",  # Aviva Centre
    "CIS42", # Canlan Ice Sports
    "LS43",  # Lions Stadium
    "TMC44", # Tait McKenzie Centre
    "TFC45", # Track & Field Centre
    "YS46",  # York Stadium
    "BCSS47",# Bennett Centre for Student Services
    "YSWS48",# Student Welcome & Support Centre
    "BR49",  # Bethune Residence
    "CR50",  # Calumet Residence
    "FR51",  # Founders Residence
    "PCR52", # Passy Crescent Residence
    "PRR53", # Pond Road Residence
    "QR54",  # Quad Residence
    "SR55",  # Stong Residence
    "TH56",  # Tatham Hall
    "VR57",  # Vanier Residence
    "WR58",  # Winters Residence
    "YCCC59",# York University Child Care Centre
    "YUSP60" # York University Steam Plant
]



washrooms = {
    1: 
        {
            "name": "name",
            "location": 
            {
            "type": "type",
            "coordinates": "coord",
            },
            "address": "addy",
            "accessibility_features": 
            {
            "period_products": 2,
            "baby_changing": 2,
            "wheelchair_accessible": 2,
            "gender_neutral": 2,
            "clean": 2,
            "verified": 2
            },
            "created_by": "mes"
        }

}

@app.post("/add/")
def mk_washroom(name: str, type: int, coord: int, addy: str, prd_prod: int, baby: int, wheelchair: int, gender: int, clean: int, verified: int, user: str): 
    return {
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
    for i in washrooms.keys():
        if (name == washroom[i]["name"]):

@app.get("/washrooms/")
def get_washrooms():
    # print(washrooms)
    return washrooms
