// ============================
// 1. QUESTIONS ARRAY
// ============================
let questions = [
    { q: "2 + 3 =", options: ["4", "5", "6"], answer: "5" },
    { q: "7 - 4 =", options: ["2", "3", "5"], answer: "3" },
    { q: "6 + 1 =", options: ["7", "8", "9"], answer: "7" },
    { q: "9 - 2 =", options: ["5", "6", "7"], answer: "7" }
];

let score = 0;
let timers = [];
let timerStarted = []; // to prevent starting timer twice

// ============================
// 2. SHUFFLE QUESTIONS
// ============================
function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

// ============================
// 3. START TIMER (only when clicked)
// ============================
function startTimer(id, index) {
    if (timerStarted[index] === true) return; // avoid double timer
    
    timerStarted[index] = true; // mark timer as started

    let timeLeft = 10;
    let timerDisplay = document.getElementById("timer-" + id);

    timerDisplay.innerHTML = "Time: " + timeLeft;

    timers[index] = setInterval(function () {
        timeLeft--;
        timerDisplay.innerHTML = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timers[index]);
            timerDisplay.innerHTML = "Time's up!";
        }
    }, 1000);
}

// ============================
// 4. DISPLAY ALL QUESTIONS
// ============================
function displayQuestions() {
    let quizArea = document.getElementById("quiz-area");
    quizArea.innerHTML = "";

    questions.forEach((item, index) => {
        timerStarted[index] = false;

        let qId = "q" + index;

        let box = document.createElement("div");
        box.className = "question-box";

        box.innerHTML = `
            <p><strong>${item.q}</strong></p>
            <div id="options-${qId}"></div>
            <p class="timer" id="timer-${qId}"></p>
            <p id="feedback-${qId}"></p>
        `;

        // Start timer when clicking the question box
        box.onclick = function () {
            startTimer(qId, index);
        };

        quizArea.appendChild(box);

        let optionsDiv = document.getElementById("options-" + qId);

        item.options.forEach(opt => {
            let btn = document.createElement("button");
            btn.className = "option-btn";
            btn.innerHTML = opt;

            btn.onclick = function (e) {
                e.stopPropagation(); 
                checkAnswer(opt, item.answer, qId);
            };

            optionsDiv.appendChild(btn);
        });
    });
}

// ============================
// 5. CHECK ANSWER
// ============================
function checkAnswer(selected, correct, id) {
    let feedback = document.getElementById("feedback-" + id);

    if (selected === correct) {
        feedback.innerHTML = "Correct!";
        score++;
    } else {
        feedback.innerHTML = "Incorrect!";
    }

    document.getElementById("score").innerHTML = "Score: " + score;
}

// ============================
// 7. START QUIZ
// ============================
function startQuiz() {
    shuffleQuestions();
    displayQuestions();
}

startQuiz();
