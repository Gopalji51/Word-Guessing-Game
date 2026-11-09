// 1. Available Words
const Words = [
    "JAVASCRIPT",
    "PYTHON",
    "COMPUTER",
    "PROGRAMMING",
    "DEVELOPER",
    "ANDROID",
    "FUNCTION",
    "VARIABLE",
    "DATABASE",
    "INTERNET"
];


// 2. Get Html elements
const wordElement = document.getElementById("word");
const keyboard = document.getElementById("keyboard");
const attemptsElement = document.getElementById("attempts");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");


// 3. Game Variable
let selectedWord = "";
let correctLetters = [];
let wrongLetters = [];
let attempts = 6;
let score = 0;
let gameOver = false;


// 4. Start a new game
function StartGame() {

    // Reset game vaariables
    correctLetters = [];
    wrongLetters = [];
    attempts = 6;
    gameOver = false;

    // Select random word
    const randomIndex = Math.floor(Math.random() * Words.length);
    selectedWord = Words[randomIndex];

    // Reset HTML
    attemptsElement.textContent = attempts;
    messageElement.textContent = "Choose a letter to Start!";
    messageElement.style.color = "#444";

    // Display word
    displayWord();

    // Create alphabet buttons
    createKeyboard();
}


// 5. Display hidden word
function displayWord() {
    wordElement.innerHTML = "";

    for (let i = 0; i < selectedWord.length; i++) {
        
        const letter = document.createElement("span");
        letter.classList.add("letter");

        if (correctLetters.includes(selectedWord[i])) {
            letter.textContent = selectedWord[i];
        } else {
            letter.textContent = "_";
        }
        wordElement.appendChild(letter);
    }
}


// 6. Create alphate buttons
function createKeyboard() {
    keyboard.innerHTML = "";

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < alphabet.length; i++) {

        const button = document.createElement("button");
        button.textContent = alphabet[i];

        button.addEventListener("click", function () {
            checkLetter(alphabet[i], button);
        });
        keyboard.appendChild(button);
    }
}


// 7. Check selected letter
function checkLetter(letter, button) {

    if (gameOver) {
        return;
    }
    button.disabled = true;

    // Check correct letter
    if (selectedWord.includes(letter)) {
        correctLetters.push(letter);
        messageElement.textContent = "Correct letter!";
    } else {
        wrongLetters.push(letter);
        attempts--;
        messageElement.textContent = "Wrong letter! Try again.";
    }

    // Update attempts
    attemptsElement.textContent = attempts;

    // Update hidden word
    displayWord();

    // Check win or lose
    checkGameStatus();
}


// 8. Check game status
function checkGameStatus() {

    // Check whether all letters are guessed
    const isWon = [...selectedWord].every(function (letter) {
        return correctLetters.includes(letter);
    });
    if (isWon) {
        gameOver = true;
        score++;
        scoreElement.textContent = score;

        messageElement.textContent = "Congratulations! You guessed the word: " + selectedWord;
        messageElement.style.color = "green";
        disableKeyboard();
    } else if (attempts === 0) {
        gameOver = true;
        messageElement.textContent = "Game Over! The word was: " + selectedWord;
        messageElement.style.color = "red";

        // Reveal the complete word
        wordElement.innerHTML = "";

        for (let i = 0; i < selectedWord.length; i++) {

            const letter = document.createElement("span");

            letter.classList.add("letter");
            letter.textContent = selectedWord[i];
            wordElement.appendChild(letter);
        }
        disableKeyboard();
    }
}


// 9. Disable all buttons
function disableKeyboard() {

    const buttons = keyboard.querySelectorAll("button");
    buttons.forEach(function (button) {
        button.disabled = true;
    });
}


// 10. Restart button
restartBtn.addEventListener("click", function() {
    StartGame();
});


// 11. Start game when page loads
StartGame();