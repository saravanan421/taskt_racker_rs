from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Mini Task Tracker API"
    DATABASE_URL: str = "sqlite:///./tasks.db"

settings = Settings()
