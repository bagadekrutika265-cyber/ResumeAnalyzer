const API_URL = "http://127.0.0.1:5000";

const MASTER_SKILLS = ['python', 'javascript', 'c++', 'java', 'react', 'node.js', 'sql', 'mongodb', 'docker', 'machine learning', 'data structures', 'html', 'css', 'git', 'aws', 'django', 'express', 'typescript', 'tailwind'];

const SKILL_RESOURCES = {
    'python': { desc: 'Learn Python for backend and data science. Highly demanded.', link: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/' },
    'javascript': { desc: 'The core language of the web. Essential for front-end.', link: 'https://javascript.info/' },
    'c++': { desc: 'Master competitive programming and core concepts.', link: 'https://www.learncpp.com/' },
    'java': { desc: 'Enterprise standard for backend architectures.', link: 'https://www.codecademy.com/learn/learn-java' },
    'react': { desc: 'The most popular frontend library for building UI.', link: 'https://react.dev/learn' },
    'node.js': { desc: 'Run JavaScript on the server. Used by top startups.', link: 'https://nodejs.dev/learn' },
    'sql': { desc: 'Crucial for database management and data manipulation.', link: 'https://www.w3schools.com/sql/' },
    'mongodb': { desc: 'The leading NoSQL database for flexible data scaling.', link: 'https://university.mongodb.com/' },
    'docker': { desc: 'Containerize your applications for easy deployment.', link: 'https://docs.docker.com/get-started/' },
    'machine learning': { desc: 'Build predictive AI models and algorithms.', link: 'https://www.coursera.org/learn/machine-learning' },
    'data structures': { desc: 'The #1 requirement for clearing coding interviews.', link: 'https://www.geeksforgeeks.org/data-structures/' },
    'html': { desc: 'The foundation of all web pages.', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    'css': { desc: 'Style your web applications with modern layouts.', link: 'https://web.dev/learn/css/' },
    'git': { desc: 'Master version control and collaboration.', link: 'https://git-scm.com/doc' },
    'aws': { desc: 'Cloud computing and infrastructure for scaling.', link: 'https://aws.amazon.com/getting-started/' },
    'django': { desc: 'High-level Python web framework for rapid development.', link: 'https://www.djangoproject.com/start/' },
    'express': { desc: 'Fast, unopinionated, minimalist web framework for Node.js.', link: 'https://expressjs.com/' },
    'typescript': { desc: 'JavaScript with syntax for types.', link: 'https://www.typescriptlang.org/docs/' },
    'tailwind': { desc: 'A utility-first CSS framework for rapid UI development.', link: 'https://tailwindcss.com/docs' }
};

// Auth State
let currentUser = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

function checkAuth() {
    const savedUser = localStorage.getItem('placementPulseUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('userNameDisplay').textContent = currentUser.name;
        document.querySelectorAll('.auth-required').forEach(el => el.style.display = 'block');
        showSection('home');
    } else {
        document.querySelectorAll('.auth-required').forEach(el => el.style.display = 'none');
        showSection('auth');
    }
}

function toggleAuth(type) {
    if (type === 'login') {
        document.getElementById('loginBox').style.display = 'block';
        document.getElementById('registerBox').style.display = 'none';
        document.getElementById('loginError').style.display = 'none';
    } else {
        document.getElementById('loginBox').style.display = 'none';
        document.getElementById('registerBox').style.display = 'block';
        document.getElementById('regError').style.display = 'none';
    }
}

function logoutUser() {
    localStorage.removeItem('placementPulseUser');
    currentUser = null;
    checkAuth();
}

// Navigation Logic
function showSection(sectionId) {
    if(!currentUser && sectionId !== 'auth') return; // Route Guard

    document.querySelectorAll('.section-container').forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });
    const activeSec = document.getElementById(sectionId);
    if(activeSec) {
        activeSec.style.display = 'block';
        setTimeout(() => activeSec.classList.add('active'), 10);
    }
}

// Ensure default section is visible
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

// Drag and Drop Logic
const dropArea = document.getElementById('dropArea');
const resumeFileInput = document.getElementById('resumeFile');
const fileNameDisplay = document.getElementById('fileName');

dropArea.addEventListener('click', () => resumeFileInput.click());

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
        resumeFileInput.files = e.dataTransfer.files;
        fileNameDisplay.textContent = e.dataTransfer.files[0].name;
    }
});

resumeFileInput.addEventListener('change', function() {
    if(this.files[0]) {
        fileNameDisplay.textContent = this.files[0].name;
    }
});

// Form Submission & API Calls
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const file = resumeFileInput.files[0];
    if(!file) {
        alert("Please upload a resume.");
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const loader = document.getElementById('loader');
    
    submitBtn.classList.add('hidden');
    loader.classList.remove('hidden');

    try {
        // Step 1: Upload and Parse Resume
        const formData = new FormData();
        formData.append('resume', file);
        
        const uploadRes = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            body: formData
        });
        const uploadData = await uploadRes.json();
        
        if(!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");
        
        const resumeAnalysis = uploadData.data;

        // Step 2: Predict Placement
        const reqBody = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            cgpa: parseFloat(document.getElementById('cgpa').value),
            dss_score: parseFloat(document.getElementById('dss').value),
            skills_count: resumeAnalysis.skills_count,
            resume_score: resumeAnalysis.resume_score,
            projects_count: resumeAnalysis.projects_est,
            skills: resumeAnalysis.skills
        };

        const predictRes = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody)
        });
        const predictData = await predictRes.json();
        
        if(!predictRes.ok) throw new Error(predictData.error || "Prediction failed");

        // Step 3: Populate Dashboard
        populateDashboard(resumeAnalysis, predictData);

        // Step 3b: Populate Strategy if requested
        const wantStrategy = document.getElementById('wantStrategy').checked;
        if (wantStrategy) {
            populateStrategy(predictData.companies);
            document.getElementById('rawTextDisplay').textContent = resumeAnalysis.raw_text || "No text could be extracted.";
        } else {
            document.getElementById('strategyCard').style.display = 'none';
        }

        // Step 4: Generate Questions if requested
        const wantQuestions = document.getElementById('wantQuestions').checked;
        if(wantQuestions && resumeAnalysis.skills.length > 0) {
            const qsRes = await fetch(`${API_URL}/generate-questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ skills: resumeAnalysis.skills })
            });
            const qsData = await qsRes.json();
            populateQuestions(qsData.questions);
            document.getElementById('questionsCard').style.display = 'block';
        } else {
            document.getElementById('questionsCard').style.display = 'none';
        }

        // Show Dashboard
        showSection('dashboard');
        
    } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
    } finally {
        submitBtn.classList.remove('hidden');
        loader.classList.add('hidden');
    }
});

function populateDashboard(analysis, prediction) {
    // 1. Circular Progress for Probability
    const prob = prediction.probability;
    const circularProgress = document.querySelector('.circular-progress');
    const probValue = document.getElementById('probValue');
    const probInsight = document.getElementById('probInsight');
    
    let color = 'var(--danger)';
    if(prob >= 75) color = 'var(--success)';
    else if(prob >= 50) color = 'var(--warning)';
    
    // Animate counter
    let currentVal = 0;
    const interval = setInterval(() => {
        currentVal++;
        probValue.textContent = `${currentVal}%`;
        circularProgress.style.background = `conic-gradient(${color} ${currentVal * 3.6}deg, rgba(255,255,255,0.1) 0deg)`;
        if(currentVal >= Math.floor(prob)) clearInterval(interval);
    }, 20);

    if(prob >= 80) probInsight.textContent = "Excellent! You are highly placed-able.";
    else if(prob >= 50) probInsight.textContent = "Good chance, but upskilling is recommended.";
    else probInsight.textContent = "You need to work heavily on your core skills and projects.";

    // 2. Stats Card
    document.getElementById('resumeScoreTxt').textContent = `${Math.round(analysis.resume_score)}/100`;
    setTimeout(() => {
        document.getElementById('resumeScoreBar').style.width = `${analysis.resume_score}%`;
    }, 500);

    // Skills Tags
    const skillsContainer = document.getElementById('skillsTags');
    skillsContainer.innerHTML = '';
    const skillsToLoop = analysis.skills || [];
    skillsToLoop.forEach(skill => {
        const span = document.createElement('span');
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });
    if(skillsToLoop.length === 0) skillsContainer.innerHTML = '<span>None detected</span>';

        const missing = MASTER_SKILLS.filter(s => !analysis.skills.map(us => us.toLowerCase()).includes(s));
        
        const missingDiv = document.getElementById('missingSkillsTags');
        missingDiv.innerHTML = '';
        missing.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            missingDiv.appendChild(span);
        });
        if(missing.length === 0) missingDiv.innerHTML = '<span>None</span>';

        // Initial Resources based on missing skills
        renderResources(missing);

    // 3. Jobs/Eligibility Card
    const rolesUl = document.getElementById('recRoles');
    rolesUl.innerHTML = '';
    const rolesToLoop = prediction.roles || [];
    rolesToLoop.forEach(role => {
        const li = document.createElement('li');
        li.textContent = role;
        rolesUl.appendChild(li);
    });

    const compUl = document.getElementById('recCompanies');
    compUl.innerHTML = '';
    const companiesToLoop = prediction.companies || [];
    companiesToLoop.forEach(company => {
        const li = document.createElement('li');
        li.textContent = company;
        compUl.appendChild(li);
    });
}

function populateQuestions(questions) {
    const qList = document.getElementById('questionsList');
    qList.innerHTML = '';
    
    const questionsToLoop = questions || [];
    questionsToLoop.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'qa-item';
        div.innerHTML = `
            <div class="qa-question" onclick="this.nextElementSibling.classList.toggle('hidden')">
                <span><span class="badge">${item.skill}</span> ${item.question}</span>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="qa-answer hidden">
                <p><strong>Sample Answer:</strong> ${item.answer}</p>
            </div>
        `;
        qList.appendChild(div);
    });
}

const companyStrategies = {
    "TCS": "<div style='margin-bottom:8px;'><strong>Packages:</strong> Ninja (3.36 LPA), Digital (7.0 LPA), Prime (9.0 LPA)</div><strong>Pattern:</strong><br>1. NQT Foundation (Traits, Quants, Reasoning, Verbal)<br>2. Advanced Section (Advanced Quants, Advanced Coding)<br>3. Technical & HR Interview",
    "Cognizant": "<div style='margin-bottom:8px;'><strong>Packages:</strong> GenC (4.0 LPA), GenC Elevate (4.3 LPA), GenC Pro (5.4 LPA)</div><strong>Pattern:</strong><br>1. Aptitude & Logical Reasoning<br>2. Automata Fix (Debugging & Coding)<br>3. SME Technical Interview<br>4. HR Interview",
    "Infosys": "<div style='margin-bottom:8px;'><strong>Packages:</strong> System Engineer (3.6 LPA), Specialist Programmer (8.0 LPA)</div><strong>Pattern:</strong><br>1. Online Test (Logical, Mathematical, Verbal, Pseudocode)<br>2. Technical Interview<br>3. HR Interview",
    "Wipro": "<div style='margin-bottom:8px;'><strong>Packages:</strong> Elite (3.5 LPA), Turbo (6.5 LPA)</div><strong>Pattern:</strong><br>1. Online Assessment (Aptitude, Essay Writing, Basic Coding)<br>2. Technical Interview<br>3. HR Discussion",
    "Google": "<div style='margin-bottom:8px;'><strong>Packages:</strong> SWE L3 (~15-30+ LPA base)</div><strong>Pattern:</strong><br>1. Online Assessment<br>2. Phone Screen (DSA)<br>3. 4-5 Onsite Interviews (DSA + System Design)<br>4. Team Match",
    "Amazon": "<div style='margin-bottom:8px;'><strong>Packages:</strong> SDE 1 (~15-20+ LPA base)</div><strong>Pattern:</strong><br>1. Online Assessment (Debugging, Coding, Work Styles)<br>2. 3-4 Onsite Rounds (DSA + 14 Leadership Principles heavily emphasized)",
    "Microsoft": "<div style='margin-bottom:8px;'><strong>Packages:</strong> SDE 1 (~15+ LPA base)</div><strong>Pattern:</strong><br>1. Online Coding Test<br>2. 3 Onsite Rounds (Focus on Trees, LL, System Design fundamentals)",
    "Oracle": "<div style='margin-bottom:8px;'><strong>Packages:</strong> Member Technical Staff (~12-18 LPA base)</div><strong>Pattern:</strong><br>1. Online Test (Aptitude, CS Core, Coding)<br>2. 3 Technical Rounds (OOPs, DBMS, System Design, DSA)<br>3. HR Round",
    "IBM": "<div style='margin-bottom:8px;'><strong>Packages:</strong> Associate Developer (~4.5 - 7.5 LPA)</div><strong>Pattern:</strong><br>1. Cognitive Ability Test<br>2. Learning Agility Assessment<br>3. English Language Test<br>4. Coding Assessment<br>5. Interviews",
    "Local Startups": "<div style='margin-bottom:8px;'><strong>Packages:</strong> Highly Variable (3 - 12+ LPA)</div><strong>Pattern:</strong><br>1. Resume Screening<br>2. Take-Home Assignment / Machine Round<br>3. Technical Deep-Dive Interview<br>4. Founder/Cultural Fit Interview",
    "Startups": "<div style='margin-bottom:8px;'><strong>Packages:</strong> Highly Variable (3 - 12+ LPA)</div><strong>Pattern:</strong><br>1. Resume Screening<br>2. Take-Home Assignment / Machine Round<br>3. Technical Deep-Dive Interview<br>4. Founder/Cultural Fit Interview"
};

function populateStrategy(companies) {
    const sList = document.getElementById('strategyList');
    sList.innerHTML = '';
    
    const companiesToLoop = companies || [];
    companiesToLoop.forEach(company => {
        const strat = companyStrategies[company] || "Focus on your core skills and build practical projects to demonstrate your abilities.";
        const div = document.createElement('div');
        div.className = 'strategy-item';
        div.innerHTML = `<h4><i class="fa-solid fa-building"></i> ${company}</h4><p>${strat}</p>`;
        sList.appendChild(div);
    });
    
    document.getElementById('strategyCard').style.display = companiesToLoop.length > 0 ? 'block' : 'none';
}

// Auth Forms Listeners
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;margin:0;"></div>';
    
    try {
        const res = await fetch(API_URL + '/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nameOrEmail: document.getElementById('loginName').value,
                password: document.getElementById('loginPassword').value
            })
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.error);
        
        localStorage.setItem('placementPulseUser', JSON.stringify(data.user));
        checkAuth();
        e.target.reset();
    } catch(err) {
        const errDiv = document.getElementById('loginError');
        errDiv.textContent = err.message;
        errDiv.style.display = 'block';
    } finally {
        btn.innerHTML = 'Login';
    }
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;margin:0;"></div>';
    
    try {
        const res = await fetch(API_URL + '/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: document.getElementById('regName').value,
                email: document.getElementById('regEmail').value,
                password: document.getElementById('regPassword').value
            })
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.error);
        
        localStorage.setItem('placementPulseUser', JSON.stringify(data.user));
        checkAuth();
        e.target.reset();
    } catch(err) {
        const errDiv = document.getElementById('regError');
        errDiv.textContent = err.message;
        errDiv.style.display = 'block';
    } finally {
        btn.innerHTML = 'Register';
    }
});

function renderResources(skills, isSearch = false) {
    const resContainer = document.getElementById('resourcesList');
    if(!isSearch) resContainer.innerHTML = '';
    else resContainer.innerHTML = '<h4>Search Results:</h4>';

    if (!skills || skills.length === 0) {
        if(!isSearch) resContainer.innerHTML = '<p style="color:var(--success);"><i class="fa-solid fa-check-circle"></i> Outstanding! You have all the core recommended skills for these roles.</p>';
        return;
    }

    skills.slice(0, 4).forEach(skill => {
        const info = SKILL_RESOURCES[skill.toLowerCase()];
        if (info) {
            resContainer.innerHTML += `
            <div class="resource-item">
                <h4>${skill.toUpperCase()}</h4>
                <p>${info.desc}</p>
                <a href="${info.link}" target="_blank">Start Learning <i class="fa-solid fa-external-link-alt"></i></a>
            </div>
            `;
        } else if(isSearch) {
            resContainer.innerHTML += `
            <div class="resource-item">
                <h4>${skill.toUpperCase()}</h4>
                <p>We don't have a curated course yet, but you can find great tutorials here.</p>
                <a href="https://www.youtube.com/results?search_query=${skill}+tutorial" target="_blank">Search YouTube <i class="fa-solid fa-external-link-alt"></i></a>
            </div>
            `;
        }
    });
}

// Resource Search Handler
document.getElementById('skillSearchBtn')?.addEventListener('click', () => {
    const query = document.getElementById('skillSearchInput').value.trim();
    if(query) renderResources([query], true);
});

document.getElementById('skillSearchInput')?.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        const query = e.target.value.trim();
        if(query) renderResources([query], true);
    }
});
