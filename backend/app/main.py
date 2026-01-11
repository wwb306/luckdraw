from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import projects
from . import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Lucky Draw Pro API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(projects.router, prefix="/api")

from fastapi.staticfiles import StaticFiles
import os

# Serve static files from frontend/dist
if os.path.exists("./frontend/dist"):
    app.mount("/", StaticFiles(directory="./frontend/dist", html=True), name="static")

@app.get("/")
def read_root():
    return {"message": "Welcome to Lucky Draw Pro API"}
