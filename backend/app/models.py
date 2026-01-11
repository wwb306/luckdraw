from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from .database import Base
import datetime
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    password = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    participants = relationship("Participant", back_populates="project", cascade="all, delete-orphan")
    prizes = relationship("Prize", back_populates="project", cascade="all, delete-orphan")
    winners = relationship("Winner", back_populates="project", cascade="all, delete-orphan")

class Participant(Base):
    __tablename__ = "participants"

    id = Column(String, primary_key=True, default=generate_uuid)
    project_id = Column(String, ForeignKey("projects.id"))
    name = Column(String)
    um = Column(String)
    department = Column(String, nullable=True)

    project = relationship("Project", back_populates="participants")
    winners = relationship("Winner", back_populates="participant", cascade="all, delete-orphan")

class Prize(Base):
    __tablename__ = "prizes"

    id = Column(String, primary_key=True, default=generate_uuid)
    project_id = Column(String, ForeignKey("projects.id"))
    tier = Column(String)
    name = Column(String)
    count = Column(Integer)
    image = Column(String, nullable=True)
    order = Column(Integer, default=0)

    project = relationship("Project", back_populates="prizes")
    winners = relationship("Winner", back_populates="prize", cascade="all, delete-orphan")

class Winner(Base):
    __tablename__ = "winners"

    id = Column(String, primary_key=True, default=generate_uuid)
    project_id = Column(String, ForeignKey("projects.id"))
    prize_id = Column(String, ForeignKey("prizes.id"))
    participant_id = Column(String, ForeignKey("participants.id"))
    won_at = Column(DateTime, default=datetime.datetime.utcnow)

    participant = relationship("Participant", back_populates="winners")
    prize = relationship("Prize", back_populates="winners")
    project = relationship("Project", back_populates="winners")
