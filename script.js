var index = 0;
var interval;
var secondsLeft = 60;
var score = 0;
var highscore;
var name;
var body = document.body;

var navEl = document.querySelector("#nav-div");
var divEl = document.querySelector("#first-div");

var timeEl = document.createElement("h4");
var startEl = document.createElement("h4");
var qustionEl = document.createElement("p");
var startBtn = document.createElement("button");
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");
var labelEl = document.createElement("label");  
var inputEl = document.createElement("input");
var submitBtn = document.createElement("button");
var scoreDiv = document.createElement("div");

timeEl.className = "pt-1";
startEl.className = "start";
qustionEl.className = "question";
startBtn.className = "btn btn-primary ml-3";
btn1.className = "btn btn-primary ml-3 mb-2 answer";
btn2.className = "btn btn-primary ml-3 mb-2 answer";
btn3.className = "btn btn-primary ml-3 mb-2 answer";
btn4.className = "btn btn-primary ml-3 mb-2 answer";
labelEl.className = "ml-4";
inputEl.className = "ml-4";
submitBtn.className = "btn btn-primary ml-4";
scoreDiv.className = "mt-4 ml-4"

startEl.textContent = "Try to answer the following questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by 10 seconds!"
startBtn.textContent = "Start";
inputEl.placeholder = "Initials";
submitBtn.textContent = "Submit"

navEl.appendChild(timeEl);
divEl.prepend(startEl);
divEl.appendChild(startBtn);
divEl.appendChild(btn1);
divEl.appendChild(btn2);
divEl.appendChild(btn3);
divEl.appendChild(btn4);
divEl.prepend(qustionEl);
divEl.appendChild(labelEl);
divEl.appendChild(inputEl);
divEl.appendChild(submitBtn);
divEl.appendChild(scoreDiv);

btn1.value = "0";
btn2.value = "1";
btn3.value = "2";
btn4.value = "3";

qustionEl.hidden = true;
btn1.hidden = true;
btn2.hidden = true;
btn3.hidden = true;
btn4.hidden = true;
labelEl.hidden = true;
inputEl.hidden = true;
submitBtn.hidden = true;
scoreDiv.hidden = true;

var questions = [
    { q: 'Inside which HTML element do we put the Javascript?', a: ['<js>', '<script>', '<scripting>', '<javascript>'], ca: '1' },
    { q: 'How do you write "Hello World" in an alert box?', a: ['masBox("Hello World");', 'alertBox("Hello World");', 'msg("Hello World");', 'alert("Hello World");'], ca: '3' },
    { q: 'How do you call a function named "myFunction"?', a: ['call myFunction()', 'myFunction()', 'call function myFunction()', 'function myFunction'], ca: '1' },
    { q: 'How do you write an IF statement in JavaScript?', a: ['if (i==5)', 'if i = 5', 'if i == 5 then', 'if i = 5 then'], ca: '0' },
    { q: 'How does a FOR loop start?', a: ['for (var i = 0; i < 5; i++)', 'for var i = 0 to 5', 'for (i < 5; i++)', 'for (i = 0; i < 5)'], ca: '0' },
];

startBtn.addEventListener("click", function () {
    startTimer();
    score = 0;
    startEl.hidden = true;
    startBtn.hidden = true;
    qustionEl.hidden = false;
    btn1.hidden = false;
    btn2.hidden = false;
    btn3.hidden = false;
    btn4.hidden = false;
    labelEl.hidden = true;
    inputEl.hidden = true;
    submitBtn.hidden = true;
    scoreDiv.hidden = true;
    askQuestions(index);
})

divEl.addEventListener("click", function (event) {
    if (event.target.matches(".answer")) {          
        var buttonClicked = event.target.value;

        if (index === 0 && buttonClicked === "1") {
            score++;
        } else if (index === 1 && buttonClicked === "3") {
            score++;
        } else if (index === 2 && buttonClicked === "1") {
            score++;
        } else if (index === 3 && buttonClicked === "0") {
            score++;
        } else if (index === 4 && buttonClicked === "0") {
            score++;
        } else {
            secondsLeft -= 10;
        }
        if (index < 4) {
            index++;
            askQuestions(index);
        } else {
            endGanme();
            clearInterval(interval);
        }
    }
})

function startTimer() {
    interval = setInterval(function () {
        secondsLeft--;
        timeLeft();
        
        if (secondsLeft <= 0) {
            clearInterval(interval);
            endGanme();
        }
    }, 1000);
}

function timeLeft() {
    timeEl.textContent =  secondsLeft;
}

function askQuestions(index) {
    qustionEl.textContent = questions[index].q;
    btn1.textContent = questions[index].a[0];
    btn2.textContent = questions[index].a[1];
    btn3.textContent = questions[index].a[2];
    btn4.textContent = questions[index].a[3];
}

function endGanme() {
    startEl.textContent = "Game Over";
    startEl.hidden = false;
    qustionEl.hidden = true;
    btn1.hidden = true;
    btn2.hidden = true;
    btn3.hidden = true;
    btn4.hidden = true;
    startBtn.textContent = "Restart"
    startBtn.hidden = false;
    secondsLeft= 60;
    index = 0;
    labelEl.hidden = false;
    inputEl.hidden = false;
    submitBtn.hidden = false;
    scoreDiv.hidden = false;
    labelEl.textContent = "Highscore: " + score + " out of 5";
    highscore = localStorage.getItem("highscore");
    name = localStorage.getItem("name");
    scoreDiv.textContent = "Last score: " + name + " : " + highscore;
}

submitBtn.addEventListener("click", function() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("name", inputEl.value);
    name = inputEl.value;
})

// Style elements
body.setAttribute("style", "background: #999;");
timeEl.setAttribute("style", "color: #fff;");
inputEl.style.maxWidth = "90px";
btn1.style.minWidth = "200px";
btn2.style.minWidth = "200px";
btn3.style.minWidth = "200px";
btn4.style.minWidth = "200px";
scoreDiv.style.fontWeight = "bold"
scoreDiv.style.fontSize = "22px";