# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.recommendations import router as recommendations_router

app = FastAPI(title="Internship Recommendation API")

# Allow requests from any origin (useful for Supabase functions)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendations_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"status": "API is running"}