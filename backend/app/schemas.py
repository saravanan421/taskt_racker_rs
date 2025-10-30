from pydantic import BaseModel
from datetime import date
from enum import Enum

class PriorityEnum(str, Enum):
    low = "Low"
    medium = "Medium"
    high = "High"

class StatusEnum(str, Enum):
    pending = "Pending"
    in_progress = "In Progress"
    completed = "Completed"

class TaskBase(BaseModel):
    title: str
    description: str | None = None
    priority: PriorityEnum
    status: StatusEnum
    due_date: date

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    status: StatusEnum | None = None
    priority: PriorityEnum | None = None

class TaskResponse(TaskBase):
    id: int
    class Config:
        orm_mode = True
