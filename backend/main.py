from fastapi import FastAPI
from pydantic import BaseModel
from agent import run_agent
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ShadowGuard API")

# ✅ ADD THIS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for hackathon/demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    message: str

@app.post("/analyze")
def analyze_input(user_input: UserInput):
    return run_agent(user_input.message)
