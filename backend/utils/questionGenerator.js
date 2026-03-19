const QUESTION_BANK = {
    "Python": [
        {q: "What are decorators in Python and how do you use them?", a: "A decorator is a function that takes another function and extends its behavior without explicitly modifying it. They use the @ symbol."},
        {q: "What is the difference between a list and a tuple?", a: "Lists are mutable (can be changed), whereas tuples are immutable (cannot be changed after creation)."},
        {q: "Explain the Global Interpreter Lock (GIL) in Python.", a: "The GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once."},
        {q: "How is memory managed in Python?", a: "Memory management involves a private heap containing all objects, managed by the Python memory manager and an automatic garbage collector."}
    ],
    "Java": [
        {q: "What is the difference between an interface and an abstract class?", a: "An interface has only abstract methods (until Java 8) and multiple inheritance is allowed, while an abstract class can have concrete methods and doesn't support multiple inheritance."},
        {q: "Explain the concepts of OOPs.", a: "The four main concepts are Encapsulation, Inheritance, Polymorphism, and Abstraction."},
        {q: "How is exception handling done in Java?", a: "Using try, catch, finally, throw, and throws keywords to gracefully handle runtime errors."},
        {q: "What is a memory leak in Java and how can you avoid it?", a: "It occurs when objects are no longer used but still referenced. Avoid it by removing unused references and using weak references if necessary."}
    ],
    "Javascript": [
        {q: "What is closure in JavaScript?", a: "A closure gives you access to an outer function's scope from an inner function, essentially remembering the environment in which it was created."},
        {q: "Explain event delegation.", a: "Event delegation is a pattern where a single event listener is added to a parent element to handle events from its children via event bubbling."},
        {q: "What is the difference between let, const, and var?", a: "Var is function-scoped and hoisted. Let and const are block-scoped; const cannot be reassigned."},
        {q: "How does the event loop work?", a: "The event loop continuously checks the call stack and message queue, pushing callbacks to the stack when the stack is empty."}
    ],
    "React": [
        {q: "What is the Virtual DOM?", a: "A lightweight copy of the actual DOM. React uses it to diff changes and efficiently update only the changed parts in the real DOM."},
        {q: "Explain the useEffect hook.", a: "It lets you perform side effects in functional components, like data fetching, subscriptions, or manually changing the DOM."},
        {q: "What are React components?", a: "Independent, reusable pieces of UI. They can be functional (using hooks) or class-based components."},
        {q: "How do you manage state in React?", a: "Using the useState hook for local state, or Context API / Redux for global state."}
    ],
    "Node.Js": [
        {q: "What is the role of the V8 engine in Node.js?", a: "V8 is Google's open-source high-performance JavaScript engine, which Node.js uses to execute JavaScript outside the browser."},
        {q: "Explain synchronous vs asynchronous.", a: "Sync blocks execution until a task finishes. Async allows execution to continue while waiting for a task (like I/O) to complete."},
        {q: "What is callback hell?", a: "Deeply nesting multiple callbacks, making code hard to read. Avoid it using Promises or async/await."},
        {q: "How do you handle routing in Express.js?", a: "Using the express.Router() class to create modular, mountable route handlers."}
    ],
    "Mongodb": [
        {q: "How does MongoDB differ from SQL?", a: "MongoDB is a NoSQL document database storing data in JSON-like BSON format, lacking rigid schemas and complex JOIN operations."},
        {q: "What is a document in MongoDB?", a: "A record in a MongoDB collection consisting of field and value pairs."},
        {q: "Explain aggregation in MongoDB.", a: "Operations that process data records and return computed results via a processing pipeline."},
        {q: "How do you ensure high availability?", a: "By using Replica Sets, which automatically failover to secondary nodes if the primary goes down."}
    ],
    "Sql": [
        {q: "What are the different types of JOINs?", a: "INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN."},
        {q: "Explain WHERE vs HAVING.", a: "WHERE filters rows before aggregation. HAVING filters after aggregation (used with GROUP BY)."},
        {q: "What is normalization?", a: "Organizing data in a database to reduce redundancy and improve data integrity (1NF, 2NF, 3NF)."},
        {q: "What are primary keys?", a: "A unique identifier for each record in a database table."}
    ],
    "Machine Learning": [
        {q: "Supervised vs Unsupervised Learning?", a: "Supervised uses labeled data to predict outcomes. Unsupervised finds hidden patterns in unlabeled data."},
        {q: "What is overfitting?", a: "When a model learns the training data too well, including noise, performing poorly on new unseen data. Prevented via dropout, regularization, etc."},
        {q: "Explain the Bias-Variance tradeoff.", a: "Creating a model simple enough to generalize (low variance) but complex enough to capture the data accurately (low bias)."},
        {q: "How does Random Forest work?", a: "An ensemble method that creates multiple decision trees and merges them to get a more accurate and stable prediction."}
    ],
    "Data Analysis": [
        {q: "Steps to clean a dataset?", a: "Remove duplicates, handle missing values (impute/drop), detect outliers, and normalize/standardize data formats."},
        {q: "How do you handle missing values?", a: "By deleting rows/columns, or imputing them with the mean, median, mode, or predictive modeling."},
        {q: "Correlation vs Causation?", a: "Correlation means two variables move together. Causation means one directly causes the other. Correlation does not imply causation."},
        {q: "What is an outlier?", a: "A data point that differs significantly from other observations, potentially skewing the results."}
    ],
    "Docker": [
        {q: "Image vs Container?", a: "An image is a read-only template with instructions to create a container. A container is a runnable instance of an image."},
        {q: "Docker vs Virtual Machine?", a: "Docker shares the host OS kernel and is lightweight. VMs package entirely separate operating systems and are heavyweight."},
        {q: "What is a Dockerfile?", a: "A text document containing all the commands a user could call on the command line to assemble an image."},
        {q: "How do you link containers?", a: "Using Docker Compose or creating a custom user-defined Docker bridge network."}
    ],
    "Git": [
        {q: "git fetch vs git pull?", a: "Fetch downloads updates from remote but doesn't merge them. Pull downloads updates and immediately merges them."},
        {q: "How to handle merge conflicts?", a: "Open the conflicting files, manually edit the text to choose the correct changes, save, and then commit the resolution."},
        {q: "Concept of branching?", a: "Branching allows diverging from the main line of development to work on a feature independently without affecting the master codebase."},
        {q: "What does git rebase do?", a: "It rewrites the commit history by moving a sequence of commits to a new base commit, creating a cleaner, linear history."}
    ],
     "Html": [
        {q: "What are semantic tags?", a: "Tags that clearly describe their meaning to both the browser and developer, like <article>, <header>, and <footer>."},
        {q: "Block vs inline elements?", a: "Block elements take up the full width available and start a new line. Inline elements take up only necessary width and don't force a new line."},
        {q: "Purpose of the alt attribute?", a: "Provides alternative text for an image, aiding screen readers (accessibility) and displaying if the image fails to load."},
        {q: "How to embed video?", a: "Using the <video> tag with nested <source> tags pointing to the file URLs."}
     ],
     "Css": [
         {q: "What is the CSS Box Model?", a: "A box that wraps around every HTML element, consisting of margins, borders, padding, and the actual content."},
         {q: "Flexbox vs CSS Grid?", a: "Flexbox is designed for 1-dimensional layouts (rows OR columns). Grid is for 2-dimensional layouts (rows AND columns)."},
         {q: "What are pseudo-classes?", a: "Keywords added to selectors to style a specific state of an element (e.g., :hover, :active)."},
         {q: "How to make a website responsive?", a: "Using flexible grid layouts, percentages, relative units, and media queries to adapt styling based on screen size."}
     ]
};

function generateQuestions(skills, limit = 5) {
    let questionsList = [];
    
    const titleCaseSkills = skills.map(s => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    const matchedSkills = titleCaseSkills.filter(s => QUESTION_BANK[s] || QUESTION_BANK[s.replace('.Js', '.js')]);
    
    if (matchedSkills.length === 0) {
        return [
            {skill: "General", question: "Tell me about a challenging project you've worked on.", answer: "Sample strategy: Use the STAR method (Situation, Task, Action, Result) to frame your response."},
            {skill: "General", question: "What is your greatest strength as a developer?", answer: "Sample strategy: Mention problem-solving skills, fast learning, or communication, and give a concrete example."},
            {skill: "General", question: "Describe a time you had to learn a new technology quickly.", answer: "Sample strategy: Explain your learning process, like reading docs, building a tiny POC, and applying it to the project."},
            {skill: "General", question: "How do you handle working under tight deadlines?", answer: "Sample strategy: Discuss prioritization, cutting scope to an MVP, and communicating dependencies early."},
            {skill: "General", question: "Where do you see yourself in 5 years?", answer: "Sample strategy: Align your goals with the company's trajectory, expressing a desire to master their stack or move into leadership."}
        ];
    }
    
    const uniqueMatched = [...new Set(matchedSkills)];
    
    uniqueMatched.forEach(skill => {
        let sq = QUESTION_BANK[skill];
        if (!sq) sq = QUESTION_BANK[skill.replace('.Js', '.js')];
        if(sq) {
            const qObj = sq[Math.floor(Math.random() * sq.length)];
            questionsList.push({ skill: skill, question: qObj.q, answer: qObj.a });
        }
    });
    
    questionsList.sort(() => Math.random() - 0.5);
    return questionsList.slice(0, limit);
}

module.exports = { generateQuestions };
