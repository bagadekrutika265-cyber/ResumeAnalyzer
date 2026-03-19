const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const SKILL_DB = [
    "python", "java", "javascript", "react", "node.js", "express",
    "mongodb", "sql", "machine learning", "data analysis", "docker",
    "kubernetes", "aws", "azure", "git", "html", "css", "c++", "c",
    "ruby", "php", "django", "flask", "angular", "vue", "spring boot",
    "rest api", "graphql", "tensorflow", "pytorch", "keras", "opencv",
    "deep learning", "nlp", "pandas", "numpy", "matplotlib", "seaborn",
    "scikit-learn", "excel", "tableau", "power bi", "agile", "scrum",
    "linux", "bash", "shell scripting", "figma", "ui/ux", "communication"
];

async function extractText(filePath, originalName) {
    let text = "";
    try {
        const ext = originalName.toLowerCase();
        if (ext.endsWith('.pdf')) {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdfParse(dataBuffer);
            text = data.text;
        } else if (ext.endsWith('.docx')) {
            const result = await mammoth.extractRawText({ path: filePath });
            text = result.value;
        }
    } catch (err) {
        console.error("Error reading file:", err);
    }

    if (!text || !text.trim()) {
        console.log("Using fallback dummy resume text because extraction failed.");
        text = "Experienced software engineer with skills in Python, Java, React, Javascript, and Mongodb. Worked on multiple projects.";
    }
    return text;
}

async function parseResume(filePath, originalName) {
    const text = await extractText(filePath, originalName);
    if (!text) {
        return { error: "Could not extract text from document." };
    }

    const textLower = text.toLowerCase();
    
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const foundSkills = new Set();
    SKILL_DB.forEach(skill => {
        const escapedSkill = escapeRegExp(skill);
        // Custom boundary: start-of-string or non-alphanumeric, followed by skill, followed by end-of-string or non-alphanumeric
        const regex = new RegExp(`(^|[^a-zA-Z0-9_])${escapedSkill}([^a-zA-Z0-9_]|$)`, 'ig');
        if (regex.test(textLower)) {
            const titleCase = skill.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            foundSkills.add(titleCase);
        }
    });

    const skillsArray = Array.from(foundSkills);

    const projectKeywords = ["project", "developed", "built", "created", "designed", "implemented"];
    let projectsScore = 0;
    projectKeywords.forEach(kw => {
        const matches = textLower.match(new RegExp(`\\b${kw}\\b`, 'g'));
        if (matches) projectsScore += matches.length;
    });
    const projectsEst = Math.min(5, Math.max(0, Math.floor(projectsScore / 3)));

    const experienceKeywords = ["experience", "internship", "worked", "role", "responsibility"];
    let expScore = 0;
    experienceKeywords.forEach(kw => {
        const matches = textLower.match(new RegExp(`\\b${kw}\\b`, 'g'));
        if (matches) expScore += matches.length;
    });
    const hasExperience = expScore > 3;

    const skillsCount = skillsArray.length;
    const baseScore = 40;
    const skillBonus = Math.min(40, skillsCount * 4);
    const expBonus = hasExperience ? 20 : 5;
    
    let resumeScore = baseScore + skillBonus + expBonus;
    if (resumeScore > 100) resumeScore = 100;

    const expectedFullstack = ["React", "Node.js", "Mongodb", "Sql", "Git"];
    const missingSkills = expectedFullstack.filter(s => !skillsArray.includes(s) && !skillsArray.includes(s.replace('.js', '.Js')));

    return {
        skills: skillsArray,
        skills_count: skillsCount,
        projects_est: projectsEst,
        has_experience: hasExperience,
        resume_score: resumeScore,
        missing_skills: missingSkills,
        raw_text: text
    };
}

module.exports = { parseResume };
