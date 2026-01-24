from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class ParticipantBase(BaseModel):
    name: str
    um: str
    department: Optional[str] = None

class ParticipantCreate(ParticipantBase):
    pass

class Participant(ParticipantBase):
    id: str
    project_id: str
    model_config = ConfigDict(from_attributes=True)

class PrizeBase(BaseModel):
    tier: str
    name: str
    count: int
    image: Optional[str] = None
    order: int = 0

class PrizeCreate(PrizeBase):
    pass

class Prize(PrizeBase):
    id: str
    project_id: str
    model_config = ConfigDict(from_attributes=True)

class PrizeImageUpdate(BaseModel):
    image: str # Base64 string

class WinnerBase(BaseModel):
    prize_id: str
    participant_id: str

class Winner(WinnerBase):
    id: str
    project_id: str
    won_at: datetime
    model_config = ConfigDict(from_attributes=True)

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    password: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: str
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class ProjectDetail(Project):
    participants: List[Participant] = []
    prizes: List[Prize] = []
    winners: List[Winner] = []
    model_config = ConfigDict(from_attributes=True)
