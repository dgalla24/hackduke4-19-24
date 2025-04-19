# hackduke4-19-24
# 🚑 LLaMAid: Offline Ambulance AI Copilot

An emergency-ready AI assistant that runs entirely offline for use inside ambulances or field ops. Built using:

- 🧠 LLaMA 3 via Ollama (local LLM)
- ⚙️ FastAPI (backend)
- 🌐 Next.js + Tailwind CSS (frontend)

## 🔧 How to Run

1. `ollama run llama3`
2. `cd backend && source venv/bin/activate && uvicorn main:app --reload --port 8000`
3. `cd frontend && npm run dev`

Then go to: [http://localhost:3000](http://localhost:3000)

## 💡 Why Offline?

Critical EMS environments don’t always have Wi-Fi or cell coverage. We built this with a local-first AI model for:
- Privacy
- Speed
- Reliability

