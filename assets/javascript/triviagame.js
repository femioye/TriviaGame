"use strict";


const questions = ['Who was the legendary Benedictine monk who invented champagne?',
                   'Which ocean is the largest in the world?', 
                   'Name the seventh planet from the sun.', 
                   'Name the largest freshwater lake in the world?', 
                   'What is the capital city of Spain?'];

const answers = [['Don Moen', 'Dom Perignon', 'Don Jazzy', 'Paparazzi'], 
                ['Pacific ocean', 'Atlantic ocean', 'Arctic ocean', 'Indian ocean'], 
                ['Saturn', 'Jupiter', 'Uranus', 'Pluto'],      
                ['Lake Huron', 'Lake Malawi', 'Great Slave Lake', 'Lake Superior'], 
                ['Manchester', 'Prince Edward Island', 'Madrid', 'Boston']];

const correctAnswer = [1, 0, 2, 3, 2];

const answerComments = ['Dom Perignon (1638–1715) was a monk and cellar master at the Benedictine abbey in Hautvillers who invented champagne.', 
'Pacific ocean is the largest ocean in the world.', 
'Uranus is the third of the outer planets, the seventh in order from the Sun.', 
'Lake Superior is the largest freshwater lake in the world', 
'Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole.'];

let questionAndAnswerIndex = 0;
let answered;
let timer;
let seconds;
let answer;
let correctAnswers = 0;
let incorrectAnswers = 0;
let unanswered = 0;


const startTimerFunction = function() {
    timer = setInterval(function() {
        if (!answered && seconds >= 0) {
            $('#timer').text(seconds);
            seconds -= 1;    
        } else {
            checkAnswer();
        };
    }, 900);
};

const nextQuestion = function() {
    $('#question').text(questions[questionAndAnswerIndex]);
    $('#timer-location').append('Seconds Remaining: <span id="timer">30</span>');
    for (let count = 0; count < 4; count++) {
        $(`#answer${count + 1}`).append(`<p class="possible-answer">${answers[questionAndAnswerIndex][count]}</p>`);
    };
    answer = '';
    answered = false;
    seconds = 30;
    startTimerFunction();
};

const checkAnswer = function() {
    clearInterval(timer);
    for (let count = 0; count < 4; count++) {
        $(`#answer${count + 1}`).empty();
    };    
    if (answer === correctAnswer[questionAndAnswerIndex]) {
        correctAnswers += 1;
        $('#timer-location').text('You are absolutely right!');
    } else if (answer !== '') {
        incorrectAnswers += 1;
        $('#timer-location').text('Sorry, you are wrong!');
    } else {
        unanswered += 1;
        $('#timer-location').text('Time Out!');
    };
    $('#question').text(answerComments[questionAndAnswerIndex]);
    questionAndAnswerIndex += 1;
    if (questionAndAnswerIndex < questions.length) {
        setTimeout(function() {
            $('#timer-location').empty();
            $('#answer1').empty();
            nextQuestion();
        }, 8000);
    } else {
        setTimeout(function() {
            $('#answer1').empty();
            endGame();
        }, 8000); 
    };
};

const endGame = function() {
    $('#timer-location').text('Game Ends!');
    $('#answer1').append(`<p class="results">Correct Answers: ${correctAnswers}</p>`);
    $('#answer2').append(`<p class="results">Incorrect Answers: ${incorrectAnswers}</p>`);
    $('#answer3').append(`<p class="results">Unanswered Questions: ${unanswered}</p>`);
    $('#restart-button').append('<button id="restart" class="btn btn-default">Play Again?</button>');
    $('#restart').click(function() {
        $('#timer-location').empty();
        for (let i = 0; i < 3; i++) {
            $(`#answer${i + 1}`).empty();
        };
        $('#restart-button').empty();
        questionAndAnswerIndex = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        nextQuestion();
    }); 
};

$('#start').click(function() {
    $('#start-button').empty();
    $('#main-section').addClass("question-container");
    nextQuestion();    
});

$('#answer1').click(function() {
    if (answer === '') {
        answer = 0;
        answered = true;
    };
});

$('#answer2').click(function() {
    if (answer === '') {
        answer = 1;
        answered = true;
    };
});

$('#answer3').click(function() {
    if (answer === '') {
        answer = 2;
        answered = true;
    };
});

$('#answer4').click(function() {
    if (answer === '') {
        answer = 3;
        answered = true;
    };
});