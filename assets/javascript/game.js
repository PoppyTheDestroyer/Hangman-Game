//Array from which to choose.
var words = [
  "KISS MY SHINY METAL ASS",
  "KIF KROKER",
  "THE HEAD OF RICHARD NIXON",
  "ROBOT DEVIL",
  "CALCULON",
  "CLAMPS",
  "HEADLESS BODY OF AGNEW",
  "JURASSIC BARK",
  "SEYMORE",
  "BENDER BENDING RODRIGUEZ",
  "TURANGA LEELA",
  "PHILIP J FRY",
  "PROFESSOR FARNSWORTH",
  "AMY WONG",
  "DOCTOR ZOIDBERG",
  "PLANET EXPRESS",
  "NEW NEW YORK CITY",
  "ZAPP BRANNIGAN",
  "HERMES CONRAD",
  "NIBBLER",
  "GOOD NEWS EVERYONE",
  "SWEET ZOMBIE JESUS"
];
//Letters in the words
var letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

//Sets everything to base numbers
var wins = 0;
var losses = 0;
var guessesLeft = 6;
var guessedLetters = [];
var userGuess = null;
var wordToGuess = words[Math.floor(Math.random() * words.length)];
var wordLetters = [];
var html = "<p><h2>";
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
    j++;
    if (wordToGuess.charAt(i) != " ") {
      wordLetters[j] = false;
    } else {
      wordLetters[j] = true;
    }
    j++;
  }
}

//Displays guessed letters
var updateGuessedLetters = function() {
  document.getElementById("lettersGuessed").innerHTML =
    "Your Guesses so far: " + guessedLetters.join(", ");
};
//Resets Everything
function reset() {
  guessesLeft = 6;
  guessedLetters = [];
  wordToGuess = words[Math.floor(Math.random() * words.length)];
  wordLetters = [];
  lettersArray();
  var htmlGame = "<p><h2>";

  //updateGuessesLeft();
  //updateGuessedLetters();
  for (var i = 0; i < wordToGuess.length; i += 1) {
    if (wordToGuess.charAt(i) === " ") {
      htmlGame += "&nbsp;&nbsp;";
    } else {
      htmlGame += "_&nbsp;";
    }
  }

  htmlGame += "</h2></p>";
  document.getElementById("game").innerHTML = htmlGame;
  var htmlStats =
    `<p><h4 class='record'>Wins: ${wins}
    <br>Losses: ${losses} <br>Guesses Left: ${guessesLeft} 
    </h4></p>`;
  document.getElementById("stats").innerHTML = htmlStats;
}
function progress() {
  for (i = 0, j = 0; i < wordLetters.length / 2; i += 1) {
    if (wordLetters[j + 1] === true) {
      html += wordLetters[j];
    } else {
      html += "_";
    }
    html += "&nbsp;";
    j = j + 2;
  }
  html += "</h2></p>";
  document.getElementById("game").innerHTML = html;
  htmlStats =
  `<p><h4>Wins: ${wins}
  <br>Losses: ${losses} <br>Guesses Left: ${guessesLeft} 
  </h4></p>`;
  document.getElementById("stats").innerHTML = htmlStats;
  htmlGuesses = "<p><h2>";
  for (var i = 0; i < guessedLetters.length; i++) {
    htmlGuesses += guessedLetters[i] + "&nbsp;";
  }
  htmlGuesses += "</h2></p>";
  document.getElementById("guesses").innerHTML = htmlGuesses;
}

function checkUserGuess() {
  if (
    wordLetters.indexOf(userGuess) < 0 &&
    guessedLetters.indexOf(userGuess) < 0 &&
    letters.indexOf(userGuess) >= 0
  ) {
    guessesLeft -= 1;
  }
  if (
    guessedLetters.indexOf(userGuess) < 0 &&
    letters.indexOf(userGuess) >= 0
  ) {
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
    var r = confirm(`${wordToGuess}\nYou Win!\nPlay Again?`);
    if (r == true) {
      reset();
    } else {
      alert("Thanks for playing!");
    }
  }
}

function userLose() {
  if (guessesLeft === 0) {
    losses += 1;
    var r = confirm(`${wordToGuess}\nYou Lose!\nPlay Again?`);
    if (r == true) {
      reset();
    } else {
      alert("Thanks for playing (loser)");
    }
  }
}

function resetHTML() {
  html = "<p><h2>";
}
lettersArray();
reset();

document.onkeyup = function(event) {
  userGuess = String.fromCharCode(event.keyCode).toUpperCase();
  //var userGuess = event.key.toUpperCase();

  //guessedLetters.push(userGuess);
  //updateGuessesLeft();
  //updateGuessedLetters();

  checkUserGuess();

  progress();

  resetHTML();

  userWin();

  userLose();
};
