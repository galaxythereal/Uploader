// Firebase Configuration
const firebaseConfig = {

  apiKey: "AIzaSyC5hI0CAK9NS8Ib25MffLM9k1VUaNxKVBE",

  authDomain: "uploader-7adc9.firebaseapp.com",

  databaseURL: "https://uploader-7adc9-default-rtdb.firebaseio.com",

  projectId: "uploader-7adc9",

  storageBucket: "uploader-7adc9.firebasestorage.app",

  messagingSenderId: "75308221496",

  appId: "1:75308221496:web:3b365c3bf19003193312cd",

  measurementId: "G-JV096Y4T69"

};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Game State
let currentUser = null;
let currentQuiz = null;
let score = 0;
let streak = 0;
let multiplier = 1;
let timer = null;
let currentQuestionIndex = 0;

// Sample quiz data (replace with Firebase data)
const quizzes = {
    "QUIZ123": {
        title: "Computer Science Basics",
        questions: [
            {
                question: "What does CPU stand for?",
                options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Unit"],
                correct: 0,
                points: 1000
            },
            // Add more questions
        ]
    }
};

// Achievements System
const achievements = {
    speedDemon: {
        id: 'speed-demon',
        title: 'Speed Demon',
        description: 'Answer correctly in under 5 seconds',
        icon: 'fas fa-bolt',
        points: 500
    },
    // Add more achievements
};

// Join Quiz Function
function joinQuiz() {
    const username = document.getElementById('username').value;
    const quizCode = document.getElementById('quizCode').value;

    if (!username || !quizCode) {
        gsap.to('#joinContainer', { x: [-10, 10, -10, 10, 0], duration: 0.4, ease: "power2.out" });
        return;
    }

    if (!quizzes[quizCode]) {
        gsap.to('#joinContainer', { x: [-10, 10, -10, 10, 0], duration: 0.4, ease: "power2.out" });
        return;
    }

    currentUser = username;
    currentQuiz = quizzes[quizCode];

    // Join quiz room in Firebase
    const userRef = database.ref('quiz_rooms/' + quizCode + '/users/' + username);
    userRef.set({ score: 0, streak: 0, timestamp: firebase.database.ServerValue.TIMESTAMP });

    // Animate transition
    gsap.to('#joinContainer', {
        opacity: 0,
        y: -50,
        duration: 0.5,
        onComplete: () => {
            document.getElementById('joinContainer').style.display = 'none';
            document.getElementById('quizContainer').style.display = 'block';
            gsap.from('#quizContainer', { opacity: 0, y: 50, duration: 0.5 });
            startQuiz();
        }
    });
}

// Add more functions for quiz logic, animations, and Firebase integration
