# backend/schemas.py
from pydantic import BaseModel
from typing import Optional

class UserProfile(BaseModel):
    skills: Optional[str] = ""
    interests: Optional[str] = ""
    preferred_locations: Optional[str] = ""
    # We remove 'education' as it wasn't used in your final model logic