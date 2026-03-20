# 🎓 Placement Pulse — Smart Career Analysis & Prediction

> **Hackathon Project** | Empowering students with AI-driven placement readiness in seconds.

---

## 🏆 What Is Placement Pulse?

**Placement Pulse** is a full-stack career intelligence platform that analyzes a student's resume and instantly generates a personalized placement readiness report — including a placement probability score, skill gap analysis, role recommendations, and a mock interview question bank.

No heavy ML models. No cloud dependencies. Just fast, deterministic, interpretable heuristics that run entirely on a local Node.js server.

---

## ✨ Key Features

- **Resume Parsing** — Upload a PDF or DOCX resume; the backend extracts skills, projects, CGPA, and document quality metrics automatically.
- **Placement Probability Score** — A weighted multi-factor formula estimates your likelihood of placement as a percentage.
- **Skill Gap Analysis** — Compares your skills against an industry master list and suggests targeted learning resources (FreeCodeCamp, MDN, Coursera, YouTube).
- **Role & Company Recommendations** — Suggests job roles and target companies based on your score and detected skill set.
- **AI Mock Interview Generator** — Generates personalized technical interview questions and ideal answers mapped to your specific skills.
- **User Authentication** — Register and log in; sessions persist via localStorage with MongoDB user storage.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, Vanilla JS (ES6+), CSS3 (Glassmorphism), Chart.js, FontAwesome 6.4, Google Fonts |
| Backend | Node.js (v16+), Express.js |
| Database | MongoDB (via Mongoose) |
| File Upload | Multer |
| Resume Parsing | `pdf-parse` (PDF), `mammoth` (DOCX) |
| Cross-Origin | CORS |

---

## 🧠 How the AI Logic Works

### Placement Probability Algorithm
The score is a weighted sum of five factors:

| Factor | Weight | Source |
|---|---|---|
| Academic Score (CGPA) | 35% | User input |
| Domain Skill Score (DSA) | 30% | Resume skill matching |
| Resume Quality (ATS Score) | 10% | Word count, keyword density, section headers |
| Skill Breadth | 15% | Skills detected vs. master industry list |
| Project Count | 10% | Projects found in resume |

### Skill Gap Matcher
Set-difference analysis between detected resume skills and a curated `MASTER_SKILLS` list. For every gap, the system generates a justification and a direct learning resource link.

### Mock Interview Generator
A skill-to-question mapping dictionary selects the most relevant technical questions and ideal answers for your unique skill profile.

---

## 📂 Project Structure

```
ResumeAnalyzer/
├── backend/
│   ├── server.js                # Express API, Auth, Predict & Question endpoints
│   ├── package.json             # Backend dependencies
│   ├── uploads/                 # Temporary file storage (auto-cleaned)
│   └── utils/
│       ├── resumeParser.js      # PDF/DOCX extraction + skill mapping logic
│       └── questionGenerator.js # Skill-based mock Q&A generator
└── frontend/
    ├── index.html               # Main single-page dashboard
    ├── css/
    │   └── styles.css           # Premium Glassmorphism design system
    └── js/
        └── main.js              # State management & API communication
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB running locally on port `27017`

### 1. Start the Backend
```bash
cd backend
npm install
node server.js
```
The API will be available at `http://localhost:5000`.

### 2. Launch the Frontend
```bash
cd frontend
python -m http.server 8080
```
Open `http://localhost:8080` in your browser.

> **Note:** Serving via `python -m http.server` avoids browser CORS restrictions when the frontend calls the backend API.

---

## 🔌 API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/login` | Login with name/email + password |
| `POST` | `/api/upload` | Upload a resume (PDF/DOCX); returns parsed data |
| `POST` | `/predict` | Submit parsed data; returns placement probability, roles, companies |
| `POST` | `/generate-questions` | Submit skills array; returns personalized mock interview Q&A |

---

## 🎯 Project Goal

Placement Pulse bridges the gap between **learning** and **employment** by giving students an objective, data-backed view of their market readiness and a personalized roadmap to close skill gaps before their campus placements arrive.
