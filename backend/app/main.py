from fastapi import FastAPI
from app.db import Base, engine
from app.api.v1 import tasks, insights

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mini Task Tracker API")

app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
app.include_router(insights.router, prefix="/insights", tags=["Insights"])

@app.get("/")
def root():
    return {"message": "Task Tracker API is running"}
