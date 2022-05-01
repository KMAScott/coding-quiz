var viewHighscoresBtn = document.querySelector("#view-highscores");
var startGameBtn = document.querySelector("#startGameBtn");
var submitNameBtn  = document.querySelector("#submitName");
var returnBtn  = document.querySelector("#returnBtn");
var clearHighscoresBtn  = document.querySelector("#clearHighscoresBtn");

var timerP = document.querySelector("#timerP");
var timerSpan = document.querySelector("#timerSpan");
var globalTimerPreset = 90;
var timeRemaining = globalTimerPreset;

var title = document.querySelector("#title");
var answerBtnList = document.body.querySelector("ul");
var questionIndexNum = 0;

var score = 0;
var gameOver = true;

var questionObject = {
    
        questions: [
            "Commonly used data types DO NOT include:",
            "String values must be enclosed within _____ when being assigned to variables.",
            "Arrays in JavaScript can be used to store:",
            "The condition of an if/else statement is enclosed with:",
            "Inside which HTML element do we put the JavaScript?",
            "What does DOM stand for?",
            "How do you add a comment in a JavaScript?",
            "Who invented JavaScript?",
        ],
        answers: [
            ["1. strings", "2. booleans", "correct:3. alerts", "4. numbers"],
            ["1. commas", "2. curly brackets", "correct:3. quotes", "4. parentheses"],
            ["1. numbers and strings", "2. other arrays", "3. booleans", "correct:4. all of the above"],
            ["1. quotes", "2. curly brackets", "correct:3. parentheses", "4. square brackets"],
            ["correct:1. <script>", "2. <js>", "3. <javascript>", "4. <link>"],
            ["1. Data Object Modifier", "correct:2. Document Object Model", "3. Dangerous Orb Mechanics", "4. Document Order Master"],
            ["correct:1. //This is a comment", "2. <!--This is a comment-->", "3. 'This is a comment", "4. * This is a comment *"],
            ["1. Douglas Crockford", "2. Sheryl Sandberg", "correct:3. Brendan Eich", "4. Ben Javascript"],
        ]
}

function preGame() {
    timeRemaining = globalTimerPreset;
    timerSpan.textContent = globalTimerPreset;
    document.querySelector("#highscores").style.display = "none";
    title.textContent = "Coding Quiz Challenge"
    title.style.display = "block";
    document.querySelector("#instructions").style.display = "block";
    startGameBtn.style.display = "block";
    viewHighscoresBtn.style.display = "block";

    return;
}

function startGame() {
    gameOver = false;
    questionIndexNum = 0;

    viewHighscoresBtn.style.display = "none";
    startGameBtn.style.display = "none";
    document.querySelector("#instructions").style.display = "none";
    timerP.style.display = "block";

    showQuestion(questionIndexNum);
    startTimer();

    return;
}

function startTimer() {
    var timerInterval = setInterval(function() {
        if(gameOver === true) {
            clearInterval(timerInterval);
            return;
        }
        if(timeRemaining < 1) {
            clearInterval(timerInterval);
            endGame();
        }

        timerSpan.textContent = timeRemaining;
        timeRemaining--;
    }, 1000);
    return;
}

function showQuestion(currentQuestionIndex) {
    title.textContent = questionObject.questions[currentQuestionIndex];
    createAnswerButtons(currentQuestionIndex);

    return;
}

function createAnswerButtons(currentQuestionIndex) {
    answerBtnList.innerHTML = "";

    for (let answerIndex = 0; answerIndex < questionObject.answers[currentQuestionIndex].length; answerIndex++) {
        var currentAnswerLi = document.createElement("li");
        var tempStr = questionObject.answers[currentQuestionIndex][answerIndex];

        if (questionObject.answers[currentQuestionIndex][answerIndex].includes("correct:")) {
            tempStr = questionObject.answers[currentQuestionIndex][answerIndex].substring(8, questionObject.answers[currentQuestionIndex][answerIndex].length);
            currentAnswerLi.id = "correct";
        }

        currentAnswerLi.textContent = tempStr;
        answerBtnList.appendChild(currentAnswerLi);
    }
    return;
}

function nextQuestion() {
    questionIndexNum++;
    if (questionIndexNum >= questionObject.questions.length) {
        endGame();
    } else {
        showQuestion(questionIndexNum);
    }
    return;
}

function endGame() {
    gameOver = true;
    score = timeRemaining;
    timerP.style.display = "none";
    title.style.display = "none";
    answerBtnList.innerHTML = "";

    document.querySelector("#score-span").textContent = score;
    document.querySelector("#enter-highscore").style.display = "block";

    return;
}

