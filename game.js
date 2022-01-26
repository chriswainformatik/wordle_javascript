class Game {
    game_over;
    remaining_tries;
    word;

    constructor() {
        this.reset()
    }

    reset() {
        this.game_over = false
        this.remaining_tries = 6
        this.word = "HELLO"
    }

    setWord(word) {
        this.word = word
    }

    guess(guess) {
        var characters = new Array(guess.length)
        for (var i = 0; i < this.word.length; i++) {
            if (this.word.charAt(i) == guess.toUpperCase().charAt(i)) {
                characters[i] = 1
            } else if (this.word.includes(guess.toUpperCase().charAt(i))) {
                characters[i] = 0
            } else {
                characters[i] = -1
            }
        }
        return characters;
    }
}