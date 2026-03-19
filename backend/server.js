const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

const { parseResume } = require('./utils/resumeParser');
const { generateQuestions } = require('./utils/questionGenerator');

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://127.0.0.1:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);



// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/placementPulse')
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });
        
        const user = await User.create({ name, email, password });
        res.json({ message: "Registration successful", user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { nameOrEmail, password } = req.body;
        if (!nameOrEmail || !password) return res.status(400).json({ error: "Name/Email and password required" });
        
        const user = await User.findOne({ 
            $or: [{ email: nameOrEmail }, { name: nameOrEmail }],
            password: password 
        });
        
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
        
        res.json({ message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('resume'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No resume file provided" });

    try {
        const filePath = req.file.path;
        const parsedData = await parseResume(filePath, req.file.originalname);
        
        fs.unlinkSync(filePath); // Cleanup

        if (parsedData.error) {
            return res.status(400).json({ error: parsedData.error });
        }

        res.json({ message: "Successfully parsed", data: parsedData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/predict', (req, res) => {
    // JS Heuristic for Hackathon since ML pkl can't be imported natively
    const data = req.body;
    const cgpa = parseFloat(data.cgpa || 0);
    const dss = parseFloat(data.dss_score || 0);
    const skillsCount = parseInt(data.skills_count || 0);
    const resumeScore = parseFloat(data.resume_score || 0);
    const projectsCount = parseInt(data.projects_count || 0);

    // Mathematical formulation mimicking the Random Forest weights
    let score = (cgpa / 10 * 35) + (dss / 100 * 30) + (Math.min(skillsCount, 15) / 15 * 15) + (resumeScore / 100 * 10) + (Math.min(projectsCount, 5) / 5 * 10);
    
    // Add some noise or scaling
    let probPercentage = Math.min(100, Math.max(0, score));

    // Recommend roles
    const skills = data.skills || [];
    let recRoles = [];
    if (skills.includes('Python') && skills.includes('Machine Learning')) recRoles.push('AI/ML Engineer');
    if (skills.includes('React') && skills.includes('Node.Js')) recRoles.push('Full Stack Developer');
    if (skills.includes('Sql') && (skills.includes('Python') || skills.includes('Data Analysis'))) recRoles.push('Data Analyst');
    if (recRoles.length === 0) recRoles.push('Software Engineer');

    // Recommend companies
    let recComp = [];
    if (probPercentage > 80) recComp = ["Google", "Amazon", "Microsoft", "Oracle"];
    else if (probPercentage > 60) recComp = ["IBM", "TCS", "Cognizant"];
    else recComp = ["Infosys", "Wipro", "Cognizant", "Local Startups"];

    res.json({
        probability: Number(probPercentage.toFixed(2)),
        roles: recRoles,
        companies: recComp,
        message: "Prediction successful"
    });
});

app.post('/generate-questions', (req, res) => {
    const data = req.body;
    const skills = data.skills || [];
    const questions = generateQuestions(skills);
    res.json({ questions, message: "Questions generated successfully" });
});

app.listen(5000, () => {
    console.log(`Node.js server listening on port 5000`);
});
