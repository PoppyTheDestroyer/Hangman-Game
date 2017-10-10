//Array from which to choose.
var words = ["KISS MY SHINY METAL ASS", "JURASSIC BARK", "SEYMORE", "BENDER BENDING RODRIGUEZ", "TURANGA LEELA", "PHILIP J FRY", "PROFESSOR FARNSWORTH", "AMY WONG", "DOCTOR ZOIDBERG", "PLANET EXPRESS", "NEW NEW YORK CITY", "ZAPP BRANNIGAN", "HERMES CONRAD", "NIBBLER", "GOOD NEWS EVERYONE", "SWEET ZOMBIE JESUS"];
//Letters in the words
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Sets everything to base numbers
var wins = 0;
var losses = 0;
var guessesLeft = 12;
var guessedLetters = [];
var userGuess = null;
var wordToGuess = words[Math.floor(Math.random() * words.length)];
var wordLetters = [];
var html = "<p><h3>";
//Displays number of guesses remaining
var updateGuessesLeft = function () {
    document.getElementById("guessesLeft").innerHTML = "Guesses remaining: " + guessesLeft;
};
//Chooses word
wordToGuess = words[Math.floor(Math.random() * words.length)];
var updateWordToGuess = function () {
};
//Breaks word into array
function lettersArray() {
    for (i = 0, j = 0; i < wordToGuess.length; i += 1) {
        wordLetters[j] = wordToGuess.charAt(i);
        j += 1
        if (wordToGuess.charAt(i) != " ") {
            wordLetters = false;
        }
        else {
            wordLetters = true;
        } j += 1
    }
};
//Displays guessed letters
var updateGuessedLetters = function () {
    document.getElementById("lettersGuessed").innerHTML = "Your Guesses so far: " + guessedLetters.join(", ");
};
//Resets Everything
function reset() {
    guessesLeft = 12;
    guessedLetters = [];
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    wordLetters = [];
    var htmlGame = "<p><h3>";
    lettersArray();
    updateGuessesLeft();
    updateGuessedLetters();
    for (var i = 0; i < wordToGuess.length; i += 1) {
        if (wordToGuess.charAt(i) === " ") {
            htmlGame += "&nbsp;&nbsp;";
        }
        else {
            htmlGame += "_&nbsp;";
        }
    }

    htmlGame += "</h3></p>";
    document.getElementById("game").innerHTML = htmlGame;
    var htmlStats = "<p><h3>" + "Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
    document.getElementById("stats").innerHTML = htmlStats;
}
console.log(wordToGuess);
function progress() {
    for (i = 0, j = 0; i < (wordLetters.length / 2); i += 1) {
        if (wordLetters[j + 1] == true) {
            html += wordLetters[j];
        } else {
            html += "_";
        }
        html += "&nbsp;";
        j = j + 2;
    }
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
    if (wordLetters.indexOf(userGuess) < 0 && guessedLetters.indexOf(userGuess) && letters.indexOf(userGuess) >= 0) {
        guessesLeft -=1;
    };
    if (guessedLetters.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
        guessedLetters[guessedLetters.length] = userGuess;
    };
    for (var i=0; i < wordLetters; i +=1) {
        if (wordLetters[i] === userGuess){
            wordLetters[i+1] = true;
        }
    }
}


document.onkeyup = function (event) {
    var userGuess = event.key.toUpperCase();

    guessedLetters.push(userGuess);
    updateGuessesLeft();
    updateGuessedLetters();
}
