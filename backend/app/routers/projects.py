from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import pandas as pd
import io
from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/", response_model=List[schemas.Project])
def list_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()

@router.post("/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/{project_id}", response_model=schemas.ProjectDetail)
def get_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.delete("/{project_id}")
def delete_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"message": "Project deleted"}

@router.post("/{project_id}/import")
async def import_data(project_id: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    contents = await file.read()
    df_map = pd.read_excel(io.BytesIO(contents), sheet_name=None)
    
    # Process Participants
    if "人员名单" in df_map:
        df_p = df_map["人员名单"]
        # Clear existing participants
        db.query(models.Participant).filter(models.Participant.project_id == project_id).delete()
        for _, row in df_p.iterrows():
            p = models.Participant(
                project_id=project_id,
                name=str(row.get("姓名", "")),
                um=str(row.get("工号", "")),
                department=str(row.get("部门", "")) if "部门" in row else None
            )
            db.add(p)
            
    # Process Prizes
    if "奖项配置" in df_map:
        df_prz = df_map["奖项配置"]
        # Clear existing prizes
        db.query(models.Prize).filter(models.Prize.project_id == project_id).delete()
        for i, row in df_prz.iterrows():
            prz = models.Prize(
                project_id=project_id,
                tier=str(row.get("等级", "")),
                name=str(row.get("名称", "")),
                count=int(row.get("人数", 0)),
                order=i
            )
            db.add(prz)
            
    db.commit()
    return {"message": "Import successful"}

@router.post("/{project_id}/draw")
def record_draw(project_id: str, draw_data: List[schemas.WinnerBase], db: Session = Depends(get_db)):
    for item in draw_data:
        winner = models.Winner(
            project_id=project_id,
            prize_id=item.prize_id,
            participant_id=item.participant_id
        )
        db.add(winner)
    db.commit()
    return {"message": "Results recorded"}
