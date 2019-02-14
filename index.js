var Word = require("./word.js");

var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz"

//words being guessed
var space = [
    "sun",
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
    "moon",
    "comet",
    "planet",
    "star",
    "solar",
    "galaxy",
    "nova",
    "rocket",
    "titan",
    "europa"
];
var randomGroup = Math.floor(Math.random() * space.length);
var randomWord = space[randomGroup];

var compWord = new Word(randomWord);

var newWord = false;
var correctLetters = [];
var incorrectLetters = [];

var guessesLeft = 10;

//generate a new word at random
function wordGame() {
    if (newWord) {
        var randomGroup = Math.floor(Math.random() * space.length);
        var randomWord = space(randomGroup);
        compWord = new Word(randomWord);

        newWord = false;
    }
    //array that holds completed word
    var wordComplete = [];

    if (wordComplete.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Select letter from a - z",
                name: "userInput"
            }
        ]).then(function (input) {
            if (!letterArray.includes(input.userInput) &&
                input.userInput.length > 1
            ) {
                console.log("\nPlease try again\n")

                wordGame();

            } else {
                if (incorrectLetters.includes(input.userInput) &&
                    correctLetters.includes(input.userInput) &&
                    input.userInput === ""
                ) {
                    console.log("\nAlready guessed or nothing was entered");
                    wordGame();
                } else {
                    var wordCheck = [];
                    compWord.userGuess(input.userInput);

                    compWord.objArray.forEach(wordCheck);
                    if (wordCheck.join("") === wordComplete.join('')) {
                        console.log("\nIncorrect")
                        incorrectLetters.push(input.userInput);
                        guessesLeft--;
                    } else {
                        console.log("\nCorrect")
                        correctLetters.push(input.userInput);
                    }
                    compWord();
                    console.log("Letters Guessed: " + guessesLeft + "\n");
                    console.log("Letters Left: " + incorrectLetters.join(" ") + "n");

                    if (guessesLeft > 0) {
                        compWord();
                    } else {
                        console.log("You have lost!")
                    }
                    function wordCheck(key) {
                        wordCheck.push(key.guessed);
                    }
                }
            }
        });
    } else {
        console.log("You win!");
    }
    function completeCheck(key) {
        wordComplete.push(key.guessed);

    }
}
function restartGame() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would youl ike to play again?",
            choices: ["Yes", "No"],
            name: "restart"
        }
    ])
        .then(function (input) {
            if (input.restart === "Play again") {
                newWord = true;
                incorrectLetters =[];
                correctLetters =[];
                guessesLeft = 10;
                wordGame();
            } else {
                return;
            }
    });
}
wordGame();