class Game {
    // declare attributes
    game_over
    remaining_tries
    word
    wordsList = [
        "TIRED",
        "HOUSE",
        "BUILD",
        "SLAVE",
        "AFTER",
        "DRIVE",
        "GLOVE",
        "TRUST",
        "LEAVE",
        "GUIDE",
        "ANGEL",
        "CANDY",
        "RUSTY",
        "TRAIH",
        "WHERE",
        "SAXON"
    ]

    /**
     * Creates a new game by performing reset().
     */
    constructor() {
        this.reset()
    }

    /**
     * Performs a complete reset of the game.
     * Choses a new word randomly from the word list.
     */
    reset() {
        this.game_over = false
        this.remaining_tries = 6
        this.word = this.wordsList[Math.floor(Math.random() * this.wordsList.length)]
    }

    /**
     * Sets the word that has to be guessed.
     * Must be 5 characters long.
     * 
     * @param {string} word The new 5-character word
     */
    setWord(word) {
        this.word = word
    }

    /**
     * Checks the guessed word and returns an array like
     *  [0, 1, 0, -1, -1]
     * (where -1 = grey, 0 = yellow and 1 = green)
     * to mark the characters in the guessed word.
     * 
     * @param {string} guess The guessed word
     * @returns An integer array if length 5
     */
    guess(guess) {
        var characters = new Array(guess.length)

        // set every character to "grey"
        for (var i = 0; i < this.word.length; i++) {
            characters[i] = -1
        }
        
        // count how often every character is in the word
        var wordCharCount = {}
        for (var i = 0; i < this.word.length; i++) {
            wordCharCount[this.word.charAt(i)] = 0
        }
        for (var i = 0; i < this.word.length; i++) {
            wordCharCount[this.word.charAt(i)]++
        }

        // set right characters to "green"
        // and decrease the characters count to mark it as "used"
        for (var i = 0; i < this.word.length; i++) {
            var wChar = this.word.charAt(i)
            var gChar = guess.toUpperCase().charAt(i)
            if (wChar == gChar) {
                characters[i] = 1
                wordCharCount[gChar]--
            }
        }

        // set right characters at the wrong position to "yellow"
        // if they are not already green (= "used")
        for (var i = 0; i < this.word.length; i++) {
            var wChar = this.word.charAt(i)
            var gChar = guess.toUpperCase().charAt(i)
            if (this.word.includes(gChar) && wordCharCount[gChar] > 0) {
                characters[i] = 0
                wordCharCount[gChar]--
            }
        }

        return characters;
    }
}