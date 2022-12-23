class Game {
    game_over
    remaining_tries
    word

    constructor() {
        this.reset()
    }

    reset() {
        this.game_over = false
        this.remaining_tries = 6
        this.word = "TIRED"
    }

    setWord(word) {
        this.word = word
    }

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
                console.log(i + gChar)
                characters[i] = 0
            }
        }

        return characters;
    }
}