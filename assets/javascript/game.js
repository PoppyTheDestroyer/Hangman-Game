//Array from which to choose.
var words = ["KISS MY SHINY METAL ASS", "KIF KROKER", "THE HEAD OF RICHARD NIXON", "ROBOT DEVIL", "CALCULON", "CLAMPS", "HEADLESS BODY OF AGNEW", "JURASSIC BARK", "SEYMORE", "BENDER BENDING RODRIGUEZ", "TURANGA LEELA", "PHILIP J FRY", "PROFESSOR FARNSWORTH", "AMY WONG", "DOCTOR ZOIDBERG", "PLANET EXPRESS", "NEW NEW YORK CITY", "ZAPP BRANNIGAN", "HERMES CONRAD", "NIBBLER", "GOOD NEWS EVERYONE", "SWEET ZOMBIE JESUS"];
//Letters in the words
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Sets everything to base numbers
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var guessedLetters = [];
var userGuess = null;
var wordToGuess = words[Math.floor(Math.random() * words.length)];
var wordLetters = [];
var html = "<p><h3>";
//Displays number of guesses remaining
//var updateGuessesLeft = function () {
//document.getElementById("guessesLeft").innerHTML = "Guesses remaining: " + guessesLeft;
//};
//Chooses word
//wordToGuess = words[Math.floor(Math.random() * words.length)];
//var updateWordToGuess = function () {
//};
//Breaks word into array, sets letters to "false" and spaces to "true"
//The reason will be explained later.
function lettersArray() {
    for (var i = 0, j = 0; i < wordToGuess.length; i++) {
        wordLetters[j] = wordToGuess.charAt(i);
        j++
        if (wordToGuess.charAt(i) != " ") {
            wordLetters[j] = false;
        }
        else {
            wordLetters[j] = true;
        } j++
    }
}
//Debugging
function consoleLogs() {
    console.log("wins: " + wins + "\n" + "losses: " + losses + "\n");
    console.log("guessesLeft: " + guessesLeft + "\n");
    console.log("guessesSoFar: " + guessedLetters + "\n");
    console.log("wordToBeGuessed: " + wordToGuess + "\n");
    console.log("arrayFromWord: " + wordLetters + "\n");
}
//Displays guessed letters
var updateGuessedLetters = function () {
    document.getElementById("lettersGuessed").innerHTML = "Your Guesses so far: " + guessedLetters.join(", ");
};
//Resets Everything
function reset() {
    guessesLeft = 9;
    guessedLetters = [];
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    wordLetters = [];
    lettersArray();
    var htmlGame = "<p><h3>";

    //updateGuessesLeft();
    //updateGuessedLetters();
    //
    for (var i = 0; i < wordToGuess.length; i += 1) {
        if (wordToGuess.charAt(i) === " ") {
            htmlGame += "&nbsp;&nbsp;";
        }
        else {
            htmlGame += "_&nbsp;";
        };
    };
//
    htmlGame += "</h3></p>";
    document.getElementById("game").innerHTML = htmlGame;
    var htmlStats = "<p><h3>" + "Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
    document.getElementById("stats").innerHTML = htmlStats;
}
function progress() {
    for (i = 0, j = 0; i < (wordLetters.length / 2); i += 1) {
        if (wordLetters[j + 1] === true) {
            html += wordLetters[j]
        }
        else {
            html += "_";
        };
        html += "&nbsp;";
        j = j + 2;
    };
    html += "</h1></p>"
    document.getElementById("game").innerHTML = html;
    htmlStats = "<p><h3>Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
    document.getElementById("stats").innerHTML = htmlStats;
    htmlGuesses = "<p><h3>"
    for (var i = 0; i < guessedLetters.length; i++) {
        htmlGuesses += guessedLetters[i] + "&nbsp;";
    }
    htmlGuesses += "</h3></p>";
    document.getElementById("guesses").innerHTML = htmlGuesses;
};

function checkUserGuess() {
    if (wordLetters.indexOf(userGuess) < 0 && guessedLetters.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
        guessesLeft -= 1;
    }
    if (guessedLetters.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
        guessedLetters[guessedLetters.length] = userGuess;
    }
    for (var i = 0; i < wordLetters.length; i += 1) {
        if (wordLetters[i] === userGuess) {
            wordLetters[i + 1] = true;
        }
    }
}
function userWin() {
    if (wordLetters.indexOf(false) < 0) {
        wins += 1;
        reset();
    };
};

function userLose() {
    if (guessesLeft === 0) {
        losses += 1;
        alert("You lose!")
        reset();
    };
};

function resetHTML() {
    html = "<p><h3>";
};
lettersArray();
reset();
consoleLogs();

document.onkeyup = function (event) {
    userGuess = String.fromCharCode(event.keyCode).toUpperCase();
    //var userGuess = event.key.toUpperCase();

    //guessedLetters.push(userGuess);
    //updateGuessesLeft();
    //updateGuessedLetters();


    checkUserGuess();

    progress();

    consoleLogs();

    resetHTML();

    userWin();
   
    userLose();
    consoleLogs();
};
