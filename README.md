<<<<<<< HEAD
# 🎓 Placement Pulse - Smart Career Analysis & Prediction

Placement Pulse is a high-performance, **Node.js-based** career intelligence platform designed to empower students for recruitment success. It combines advanced document parsing, heuristic-driven AI modeling, and personalized learning roadmaps to provide a modern, "Hackathon-Ready" solution for placement readiness.

---

## 🏗️ The Tech Stack (Under the Hood)

The platform is architected for speed, modularity, and high-fidelity UI/UX without the overhead of heavy frameworks.

### **Frontend Architecture**
- **Core:** HTML5 & Vanilla JavaScript (ES6+). No bulky React/Vue dependencies.
- **Styling:** Custom-built **Glassmorphism Design System** using CSS3 Variables, Backdrop-filters, and advanced Grid/Flexbox layouts.
- **Iconography:** FontAwesome 6.4 (Solid/Brands stacks).
- **Typography:** Google Fonts (Outfit & Inter) for a sleek, premium SaaS appearance.
- **Visuals:** Chart.js integration for real-time statistical rendering (Placement Probabilities).

### **Backend Architecture**
- **Runtime:** Node.js (v16+) with the **Express.js** framework.
- **Authentication:** Custom **Auth Module** using in-memory data structures and LocalStorage session persistence.
- **File Handling:** `Multer` middleware for high-speed multipart/form-data upload streams.
- **Parsing Engines:** 
    - `pdf-parse`: NLP extraction from raw unstructured PDF data.
    - `mammoth`: Structural text conversion from `.docx` (Microsoft Word) documents.
- **Networking:** `CORS` enabled for cross-origin frontend-to-backend communication.

---

## 🧠 AI & Heuristic Logic (ML Simulation)

Instead of using a generic, heavy ML model, Placement Pulse uses a specialized **Deterministic Heuristic Algorithm** written in JavaScript. This allows for instant results and high interpretability.

### **1. Placement Probability Algorithm**
The final "Placement %" is calculated using a weighted multi-factor formula:
- **Academic Score (35% Weight):** Based on your CGPA.
- **Domain Competency (25% Weight):** Your DSS (Domain Skill Score).
- **Practical Exposure (20% Weight):** Estimated count of projects found in your resume.
- **Document Quality (10% Weight):** An ATS-style **Resume Score** calculated by the parser (word count, keyword density, section headers).
- **Skill Breadth (10% Weight):** Comparison of your detected skills vs the global industry requirement list.

### **2. Skill Gap & Learning Matcher**
The system performs a case-insensitive **set-difference analysis**. It maps your extracted resume skills against a curated `MASTER_SKILLS` tech stack. For every missing skill, it dynamically generates:
- A justification of why that skill matters.
- A direct link to a top-tier learning resource (FreeCodeCamp, MDN, Coursera, or YouTube deep-dives).

### **3. AI Interview Question Generator**
A mapping logic that analyzes your unique skill set and selects the most relevant technical questions and "Ideal Responses" from a high-quality technical dictionary, ensuring your mock interview is 100% personalized.

---

## 📂 Project Directory Structure

```text
resumeanlyzer/
├── backend/
│   ├── utils/
│   │   ├── resumeParser.js      # Extraction logic for PDF/DOCX + Skill Mapping
│   │   └── questionGenerator.js # Logic for skill-based Mock Q&A
│   ├── uploads/                 # Temporary processing directory
│   ├── server.js                # Express API & Auth Logic
│   └── package.json             # Backend dependencies
└── frontend/
    ├── index.html               # Main Dashboard Interface
    ├── css/
    │   └── styles.css           # Premium Glassmorphism Stylings
    └── js/
        └── main.js              # State Management & API Communication
```

---

## 🚀 Quick Setup & Installation

### **1. Setup the Backend (Node.js)**
```bash
cd backend
npm install
node server.js
```
The server will start listening on `http://localhost:5000`. 
> [!IMPORTANT]
> Ensure you have **MongoDB** installed and running locally on port 27017 for user persistence.

### **2. Launch the Web App**
You can open `frontend/index.html` directly, but for best performance (CORS handling), serve it via a local server:
```bash
cd frontend
python -m http.server 8080
```
Navigate to `http://localhost:8080`.

---

## 🎯 Project Aim
The core aim of **Placement Pulse** is to bridge the gap between "Learning" and "Employment" by providing students with an objective, data-backed view of their market readiness and a personalized roadmap to close their skill gaps before their dream placements arrive.
