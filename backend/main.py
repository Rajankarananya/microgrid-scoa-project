from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("fake_results.json") as f:
    RESULTS = json.load(f)

@app.get("/")
def read_root():
    return {"message": "Backend is running"}

@app.get("/api/schedule")
def get_schedule(week: str = "week_normal", method: str = "hybrid"):
    return RESULTS[week][method]

@app.get("/api/compare")
def get_compare(week: str = "week_normal"):
    return RESULTS[week]