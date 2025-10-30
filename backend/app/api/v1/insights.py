from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date
from app import models
from app.db import get_db

router = APIRouter()

@router.get("/")
def get_insights(db: Session = Depends(get_db)):
    tasks = db.query(models.Task).all()
    total = len(tasks)
    if total == 0:
        return {"summary": "No tasks available."}

    high = len([t for t in tasks if t.priority == "High"])
    due_soon = len([t for t in tasks if t.due_date and (t.due_date - date.today()).days <= 2])
    busy_msg = f"You have {total} tasks, {high} high-priority, and {due_soon} due soon."
    return {"summary": busy_msg}
