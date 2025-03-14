// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDdVpt9ifDmqeGwTrkcSDui9Hun_NMgvE",
  authDomain: "gdg-online-exam-8ced0.firebaseapp.com",
  projectId: "gdg-online-exam-8ced0",
  storageBucket: "gdg-online-exam-8ced0.appspot.com",
  messagingSenderId: "1043960551230",
  appId: "1:1043960551230:web:a08aa52109c0486a127e6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// MCQ Questions
const questions = [
    { question: "Which Google service is primarily used for hosting machine learning models?", options: ["Google Cloud Run", "Google AI Hub", "Google Cloud AI Platform", "Google Compute Engine"], answer: 2 },
    { question: "What is the purpose of Google Cloud Run?", options: ["Hosting machine learning models", "Running serverless applications", "Managing databases", "Analyzing big data"], answer: 1 },
    { question: "Which Google service provides a fully managed database for PostgreSQL?", options: ["Google BigQuery", "Google Cloud Spanner", "Google Cloud SQL", "Google Firebase"], answer: 2 },
    {
        "question": "You are developing a chatbot that needs to generate human-like responses. Which technology would be the best choice for handling conversational AI?",
        "options": ["Google Cloud Functions", "Google Cloud Natural Language", "Google Dialogflow", "Google Cloud Storage"],
        answer: 2
      },
      
    { question: "What is the primary use of Google Looker Studio?", options: ["Data visualization", "Cloud storage", "AI model training", "Serverless computing"], answer: 0 },
    { question: "What is the primary function of an operating system?", options: ["Managing hardware and software resources", "Running only one application at a time", "Storing files permanently", "Enhancing network security"], answer: 0 },
    { question: "Which of the following is an example of a real-time operating system?", options: ["Windows 10", "Linux Ubuntu", "VxWorks", "macOS"], answer: 2 },
    { question: "What is a deadlock in an operating system?", options: ["When multiple processes complete execution successfully", "When processes wait indefinitely for resources", "A method to optimize performance", "A storage technique for big data"], answer: 1 },
    { question: "Which data structure is used in recursion?", options: ["Queue", "Stack", "Linked List", "Graph"], answer: 1 },
    { question: "What is the time complexity of searching an element in a BST in the worst case?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: 1 },
    { question: "Which data structure is best for implementing a priority queue?", options: ["Stack", "Heap", "Array", "Linked List"], answer: 1 },
    { question: "What is Google Cloud Platform (GCP) primarily used for?", options: ["Cloud computing and hosting", "Gaming development", "Graphic designing", "Video editing"], answer: 0 },
    { question: "Which AI framework is developed by Google?", options: ["PyTorch", "TensorFlow", "Scikit-learn", "Keras"], answer: 1 },
    { question: "What is the purpose of the self keyword in Python classes?", options: ["To define a function inside a class", "To refer to the current instance of the class", "To create a global variable", "To initialize a variable"], answer: 1 },
    { question: "What is Firebase primarily used for?", options: ["Hosting static websites", "Managing SQL databases", "Providing real-time database and authentication services", "Running machine learning models"], answer: 2 },
    { question: "Which Firebase service is used for real-time data synchronization?", options: ["Firestore", "Realtime Database", "Firebase Storage", "Firebase Hosting"], answer: 1 },
    { question: "What does Google’s Mobile-First Indexing mean?", options: ["Google prefers desktop websites over mobile versions", "Google indexes and ranks mobile-friendly sites first", "Websites without mobile versions are ranked higher", "Mobile indexing only applies to Android apps"], answer: 1 },
    { question: "What is Google Gemini API used for?", options: ["Data visualization", "Generative AI models", "Cloud security", "Web hosting"], answer: 1 },
    { question: "What is the main purpose of hashing in cybersecurity?", options: ["Encrypting passwords", "Compressing files", "Sorting large datasets", "Storing images"], answer: 0 },
    { question: "Which protocol is commonly used to secure website data transmission?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], answer: 2 },
    { question: "What is an SQL injection attack?", options: ["A method to optimize SQL queries", "A security vulnerability that allows attackers to modify databases", "A tool for improving database speed", "A type of network firewall"], answer: 1 },
    { question: "What is the time complexity of the QuickSort algorithm in the worst case?", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], answer: 1 },
    { question: "What is a hash table primarily used for?", options: ["Sorting data", "Searching and storing key-value pairs efficiently", "Image processing", "Machine learning"], answer: 1 },
    { question: "What is the main purpose of Google Kubernetes Engine (GKE)?", options: ["Managing containerized applications", "Running virtual machines", "Hosting SQL databases", "Deploying machine learning models"], answer: 0 },
    { question: "Which Google service is designed for real-time analytics?", options: ["Google BigQuery", "Google Cloud Storage", "Google Cloud Functions", "Google Firebase"], answer: 0 },
    { question: "What is the primary function of Google Bard?", options: ["A cloud storage solution", "A generative AI chatbot", "A web hosting service", "A programming IDE"], answer: 1 },
    { question: "What is the main advantage of Firebase Realtime Database?", options: ["Supports SQL queries", "Provides real-time data synchronization", "Works only with Android apps", "Requires no authentication"], answer: 1 },
    { question: "How does Google reCAPTCHA help websites?", options: ["Speeds up page loading", "Prevents spam and bots", "Encrypts user passwords", "Manages cloud storage"], answer: 1 },
    { question: "What is the purpose of Google App Engine?", options: ["Hosting and scaling web applications", "Running offline applications", "Encrypting user data", "Creating SQL databases"], answer: 0 },
    { question: "Which Google Cloud service is best for training AI models?", options: ["Google Cloud Storage", "Google AI Platform", "Google Compute Engine", "Google Cloud Run"], answer: 1 },
    { question: "Google Cloud Storage is primarily used for hosting websites.", options: ["True", "False", "None of the above"], answer: 1 },
    { question: "The self keyword in Python refers to the current instance of a class.", options: ["True", "False", "None of the above"], answer: 0 },
    { question: "Firebase Firestore and Firebase Realtime Database are the same.", options: ["True", "False", "None of the above"], answer: 1 },
    { question: "Hashing is mainly used for encrypting passwords.", options: ["True", "False", "None of the above"], answer: 0 },
    { question: "Google Kubernetes Engine (GKE) is used for managing containerized applications.", options: ["True", "False", "None of the above"], answer: 0 },
    { question: "SQL databases do not support transactions.", options: ["True", "False", "None of the above"], answer: 1 },
    { question: "Google Looker Studio is a cloud-based visualization tool.", options: ["True", "False", "None of the above"], answer: 0 },
    { question: "The time complexity of QuickSort in the average case is O(n log n).", options: ["True", "False", "None of the above"], answer: 0 },
    { question: "Google reCAPTCHA is used to improve website loading speed.", options: ["True", "False", "None of the above"], answer: 1 },
    { question: "Google Gemini API is primarily designed for natural language processing.", options: ["True", "False", "None of the above"], answer: 0 },
    { question: "If a train moves at 80 km/h for 3 hours, how far does it travel?", options: ["160 km", "200 km", "240 km", "300 km"], answer: 2 },
    { question: "What comes next in the sequence: 1, 4, 9, 16, __?", options: ["20", "25", "30", "36"], answer: 1 },
    { question: "A rectangle has a length of 10 cm and a width of 5 cm. What is its area?", options: ["50 cm²", "40 cm²", "25 cm²", "60 cm²"], answer: 0 },
    { question: "A person buys a book for ₹250 and sells it for ₹300. What is the profit?", options: ["₹50", "₹75", "₹100", "₹150"], answer: 0 },
    { question: "If you mix blue and yellow, what color do you get?", options: ["Green", "Purple", "Orange", "Brown"], answer: 0 },
    { question: "A car travels 120 km in 2 hours. What is its average speed?", options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"], answer: 2 },
    { question: "If a clock shows 3:15, what is the angle between the hour and minute hands?", options: ["37.5°", "45°", "52.5°", "90°"], answer: 0 },
    { question: "If a number is multiplied by 2 and then 6 is added to get 20, what is the number?", options: ["6", "7", "8", "10"], answer: 1 },
    { question: "What is the next number in the series: 2, 6, 12, 20, __?", options: ["28", "30", "32", "36"], answer: 0 },
    { question: "A box contains 4 red, 3 blue, and 5 green balls. What is the probability of picking a red ball?", options: ["1/4", "1/3", "2/5", "1/2"], answer: 2 }
];
let userName, userDepartment, userYear;
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timeLeft = 5400;
let timer;
let switchCount = 0; // Track screen switches

// Start Quiz (Attach to window for button click)
window.startQuiz = function () {
    userName = document.getElementById("name").value.trim();
    userDepartment = document.getElementById("department").value.trim();
    userYear = document.getElementById("year").value.trim();

    if (!userName || !userDepartment || !userYear) {
        alert("Please enter all details.");
        return;
    }

    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    loadQuestion();
    startTimer();

    // Track tab switching
    document.addEventListener("visibilitychange", handleVisibilityChange);
};

// Load Question
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    let q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;

    let optionsHTML = "";
    q.options.forEach((opt, index) => {
        optionsHTML += `<button class="option-btn" onclick="selectAnswer(${index}, this)">${opt}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

// Select Answer
window.selectAnswer = function (index, button) {
    selectedAnswer = index;
    document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
};

// Next Question
window.nextQuestion = function () {
    if (selectedAnswer !== null && selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;
    selectedAnswer = null;
    loadQuestion();
};

// Timer
function updateTimer() {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        showResult();
    }
}

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

// Handle Screen Switches
function handleVisibilityChange() {
    if (document.hidden) {
        switchCount++;

        if (switchCount === 1) {
            alert("⚠ Warning 1: Do not switch tabs! You have 2 warnings left.");
        } else if (switchCount === 2) {
            alert("⚠ Warning 2: This is your second warning! You have 1 warning left.");
        } else if (switchCount === 3) {
            alert("⚠ Final Warning: If you switch tabs again, your exam will be auto-submitted!");
        } else if (switchCount >= 4) {
            alert("⛔ You have switched tabs too many times! The exam is being submitted automatically.");
            showResult();
        }
    }
}

// Show Result
function showResult() {
    clearInterval(timer);
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("result-name").textContent = userName;
    document.getElementById("result-department").textContent = userDepartment;
    document.getElementById("result-year").textContent = userYear;
    document.getElementById("score").textContent = `${score} / ${questions.length}`;
    
    saveResultToFirebase();
    
    // Display "Exam has ended"
    document.getElementById("end-message").textContent = "Exam has ended.";
}

// Save to Firestore (Using Name as Document ID)
async function saveResultToFirebase() {
    try {
        const userRef = doc(db, "quizResults", userName); // Document ID = userName

        await setDoc(userRef, {
            name: userName,
            department: userDepartment,
            year: userYear,
            score: score,
            totalQuestions: questions.length,
            timestamp: serverTimestamp()
        });

        console.log(`Result saved successfully for ${userName}!`);
    } catch (error) {
        console.error("Error saving result:", error);
    }
}
