# backend/api/recommendations.py
from fastapi import APIRouter, HTTPException
from recommendation_model import RecommendationModel
from schemas import UserProfile
import os

router = APIRouter()

# This ensures the model loads your CSV correctly when deployed
DATASET_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'internships_dataset.csv')

try:
    model = RecommendationModel(dataset_path=DATASET_PATH)
except Exception as e:
    raise RuntimeError(f"Failed to initialize model: {e}")

@router.post("/recommend")
async def get_recommendations(profile: UserProfile, top_n: int = 5):
    try:
        recommendations_df = model.recommend(profile.dict(), top_n)
        return recommendations_df.to_dict(orient='records')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))