function letter(object) {
    this.letter = object;
    this.guessed = false;

    this.letterString = function () {
        if (this.letter === " ") {
            this.guessed = true;
            return " ";

        } else {
            return this.letter;
        }
    }

};

this.guess = function(guess) {
    if (guess === this.letter) {
        this.guessed = true;
    }
}

module.exports = letter;