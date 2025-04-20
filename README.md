# 🚑 LLaMAid: Offline Ambulance AI Copilot

An emergency-ready AI assistant that runs **entirely offline**—designed for use in ambulances, field deployments, and disaster zones. Built during HackDuke 4/19/24 using:

- 🧠 [LLaMA 3](https://ollama.com/library/llama3) via [Ollama](https://ollama.com/) (local LLM)
- ⚙️ FastAPI (Python backend)
- 🌐 Next.js + Tailwind CSS (TypeScript frontend)

---

## 🔧 How to Run Locally

### 🧠 1. Start the LLaMA 3 model

Make sure [Ollama](https://ollama.com/) is installed and running:

```bash
ollama run llama3
```

---

### 🔙 2. Backend Setup (FastAPI)

```bash
cd backend
python3 -m venv venv              # only needed once
source venv/bin/activate          # activate the environment
pip install -r requirements.txt   # install dependencies
uvicorn main:app --reload --port 8000
```

If `requirements.txt` is missing, use:

```bash
pip install fastapi uvicorn requests
```

---

### 🌐 3. Frontend Setup (Next.js + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Features

- 🎤 Voice input via browser microphone
- 💬 Real-time AI-generated emergency response guidance
- 📝 SBAR summary generator for structured handoffs
- ⚡ Offline LLM inference using `ollama run llama3`
- 🧠 Prompting optimized for EMT/paramedic context

---

## ❓ Why Offline?

Critical EMS environments often lack Wi-Fi or reliable cellular coverage. LLaMAid was built to run **100% offline** so first responders can get fast, private, and reliable AI assistance during emergencies.

---

## 📁 File Structure

```
hackduke4-19-24/
├── backend/          # FastAPI backend (local AI routing)
├── frontend/         # Next.js frontend (UI logic)
├── public/           # Static assets (e.g., logo image)
└── README.md         # You’re here
```

---

## 🤝 Team

Built by [Daniel Gallagher](https://github.com/dgalla24) and [Jacob Cho](https://github.com/jacobc1327) at HackDuke 2025.
