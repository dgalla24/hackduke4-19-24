from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()  # ← this is what uvicorn is looking for

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ask")
async def ask(request: Request):
    body = await request.json()
    user_prompt = body["prompt"]

    system_prompt = (
        "You are an expert emergency medical assistant built to support paramedics and EMTs inside ambulances. "
        "You respond with clear, step-by-step medical guidance based on standard emergency protocols. "
        "Be confident, precise, and calm. Prioritize immediate action and avoid unnecessary disclaimers. "
        "Do not make assumptions without information. If you need clarification, say what you need.\n\n"
        "EMT query: "
    )

    full_prompt = system_prompt + user_prompt

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "llama3", "prompt": full_prompt, "stream": False},
    )

    data = response.json()
    return {"response": data["response"]}