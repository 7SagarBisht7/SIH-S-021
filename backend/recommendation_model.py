# backend/recommendation_model.py
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os

class RecommendationModel:
    def __init__(self, dataset_path: str):
        if not os.path.exists(dataset_path):
            raise FileNotFoundError(f"Dataset not found at path: {dataset_path}")

        print("Loading dataset and initializing model...")
        self.internships = pd.read_csv(dataset_path)
        self._prepare_data()
        self.vectorizer = TfidfVectorizer(max_features=2000, stop_words='english')
        self.X = self.vectorizer.fit_transform(self.internships['combined_text'])
        print("Model initialized successfully.")

    def _prepare_data(self):
        # Clean and prepare the data for vectorization
        for col in ['internship_title', 'description', 'required_skills', 'sector', 'location']:
             if col in self.internships.columns:
                self.internships[col] = self.internships[col].astype(str).fillna('')
        
        self.internships['combined_text'] = (
            self.internships['internship_title'] + " " +
            self.internships['description'] + " " +
            (self.internships['required_skills'] + " ") * 3 + # Boost skills weight
            self.internships['sector'] + " " +
            self.internships['location']
        )

    def recommend(self, profile: dict, top_n: int = 5):
        # Generate recommendations from a user profile
        skills = profile.get("skills", "").lower()
        interests = profile.get("interests", "").lower()
        preferred_locations_str = profile.get("preferred_locations", "").lower()
        preferred_locations = [loc.strip() for loc in preferred_locations_str.split(',')]

        user_text = (skills + " ") * 3 + (interests + " ") * 2 + preferred_locations_str
        
        u_vec = self.vectorizer.transform([user_text])
        sims = cosine_similarity(u_vec, self.X).flatten()

        loc_boost = np.array([
            0.15 if any(loc in internship_loc.lower() for loc in preferred_locations if loc) else 0
            for internship_loc in self.internships['location']
        ])

        scores = sims + loc_boost
        
        results = self.internships.copy()
        results['score'] = scores

        return results.sort_values('score', ascending=False).head(top_n)[
            ["internship_id", "internship_title", "sector", "location", "required_skills", "score", "description"]
        ]