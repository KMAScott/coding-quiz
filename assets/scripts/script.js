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
    document.querySelector("header").style.display = "flex";
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

function correctAnswer(event) {
    if (event.target != answerBtnList) {
        if (!(event.target.id.includes("correct"))) {
            timeRemaining -= 10;
        }
        nextQuestion();
    }
    return;
}

function storeHighscoreAndName() {
    var highscoreText = document.querySelector("input");
    var tempArrHighscore = [];

    if (highscoreText.value != "" || highscoreText.value != null) {
        var tempObject = {
            names: highscoreText.value,
            scores: score
        }
        if(window.localStorage.getItem("highscores") == null) {
            tempArrHighscore.push(tempObject);
            window.localStorage.setItem("highscores", JSON.stringify(tempArrHighscore));
        } else {
            tempArrHighscore = JSON.parse(window.localStorage.getItem("highscores"));

            for (let index = 0; index <= tempArrHighscore.length; index++) {
                if (index == tempArrHighscore.length) {
                    tempArrHighscore.push(tempObject)
                    break;
                }else if (tempArrHighscore[index].scores < score) {
                    tempArrHighscore.splice(index, 0, tempObject);
                }
            }
            window.localStorage.setItem("highscores", JSON.stringify(tempArrHighscore))
        }
        document.querySelector("input").value = "";
        score = 0;

        showHighscores();
    }
    return;
}

function showHighscores() {
    title.style.display = "none";
    startGameBtn.style.display = "none";
    document.querySelector("header").style.display = "none";
    document.querySelector("#instructions").style.display = "none";
    document.querySelector("#enter-highscore").style.display = "none";

    document.querySelector("#highscores").style.display = "block";

    tempOl = document.querySelector("ol");
    tempOl.innerHTML = "";

    tempArrHighscore = JSON.parse(window.localStorage.getItem("highscores"));
    if (tempArrHighscore != null) {
        for (let index = 0; index < tempArrHighscore.length; index++) {
            var newLi = document.createElement("li")
            newLi.textContent = tempArrHighscore[index].names + " - " + tempArrHighscore[index].scores;
            tempOl.appendChild(newLi);
        }

    } else {
        var newLi = document.createElement("p")
        newLi.textContent = "No Highscores"
        tempOl.appendChild(newLi);
    }
    return;
}

function clearHighscores() {
    document.querySelector("ol").innerHTML = "";
    window.localStorage.clear();

    preGame();

    return;
}

function initialize() {
    startGameBtn.addEventListener("click", startGame);
    answerBtnList.addEventListener("click", correctAnswer);
    viewHighscoresBtn.addEventListener("click", showHighscores);
    submitNameBtn.addEventListener("click", storeHighscoreAndName);
    clearHighscoresBtn.addEventListener("click", clearHighscores);
    returnBtn.addEventListener("click", preGame);

    preGame();

    return;
}

initialize();