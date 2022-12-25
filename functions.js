let game = new Game();

let max_tries = 6
let character_count = 5

let keys_first_row = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"]
let keys_second_row = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"]
let keys_third_row = ["Y", "X", "C", "V", "B", "N", "M"]

var modal_try_again = null

/**
 * Initial setup of page
 */
document.addEventListener('DOMContentLoaded', function () {
    createBlankWordle();
    createKeyboard();
    resizeElements();
    document.getElementById("btn-set-word").addEventListener("click", function () {
        var w = prompt("enter a 5-character word")
        if (w.length != 5) {
            alert("Word length was not 5. Word was not set.")
        } else {
            game.setWord(w.toUpperCase())
        }
    })
    var reset_buttons = document.getElementsByClassName("btn-reset");
    [].forEach.call(reset_buttons, function (element) {
        element.addEventListener("click", function() {
            window.location.reload();
        })
    })
    modal_try_again = new bootstrap.Modal(document.getElementById('modal-try-again'), {
        backdrop: 'static'
    })
    //modal_try_again.show()
}, false);

/**
 * Key Listener for keyboard input
 */
document.addEventListener("keyup", (event) => {
    if (keys_first_row.includes(event.key.toUpperCase()) || keys_second_row.includes(event.key.toUpperCase()) || keys_third_row.includes(event.key.toUpperCase())) {
        enterCharacter(event.key.toUpperCase())
    }
    if (event.key == 'Enter') {
        testGuess()
    }
     if (event.key == 'Backspace') {
        deleteLastChar()
     }
})


window.addEventListener("resize", resizeElements)

/**
 * Resize elements according to screen width making the site responsive.
 */
function resizeElements() {
    var wordle_divs = document.getElementsByClassName("wordle-character")
    var key_divs = document.getElementsByClassName("single-key")
    if (this.window.innerWidth < 576) {
        for (let item of wordle_divs) {
            item.classList.remove("fs-1")
            item.classList.remove("fs-2")
            item.classList.add("fs-3")
        }
        for (let item of key_divs) {
            item.classList.remove("fs-2")
            item.classList.remove("fs-4")
            //item.classList.add("fs-5")
        }
    } else if (window.innerWidth < 768) {
        for (let item of wordle_divs) {
            item.classList.remove("fs-1")
            item.classList.add("fs-2")
            item.classList.remove("fs-3")
        }
        for (let item of key_divs) {
            item.classList.remove("fs-2")
            item.classList.add("fs-4")
            //item.classList.remove("fs-5")
        }
    } else {
        for (let item of wordle_divs) {
            item.classList.add("fs-1")
            item.classList.remove("fs-2")
            item.classList.remove("fs-3")
        }
        for (let item of key_divs) {
            item.classList.add("fs-2")
            item.classList.remove("fs-4")
            item.classList.remove("fs-5")
        }
    }
}


var current_try = 0
var current_character = 0

/**
 * Creates the 6 rows of 5-character words as DOM elements.
 */
function createBlankWordle() {
    var wrapper = document.getElementById("wordle-wrapper")

    for (var i = 0; i < max_tries; i++) {
        var row_div = document.createElement("div")
        row_div.classList.add("wordle-row")
        row_div.classList.add("d-flex")
        row_div.classList.add("justify-content-center")
        row_div.id = "wordle-row-" + i
        for (var j = 0; j < character_count; j++) {
            var wordle_character_div = document.createElement("div")
            wordle_character_div.classList.add("wordle-character")
            wordle_character_div.id = "wordle-character-" + i + "-" + j
            wordle_character_div.classList.add("fs-1")
            wordle_character_div.classList.add("fw-bolder")
            row_div.appendChild(wordle_character_div)
            var wordle_character_input = document.createElement("input")
            wordle_character_input.type = "hidden"
            wordle_character_input.value = ""
            wordle_character_input.id = "wordle-character-input-" + i + "-" + j
            row_div.appendChild(wordle_character_input)
        }
        wrapper.appendChild(row_div)    
    }
}

/**
 * Creates the keyboard as DOM elements.
 */
function createKeyboard() {
    keys_first_row.forEach((item) => {
        var key_div = document.createElement("div")
        key_div.innerHTML = item
        key_div.classList.add("single-key")
        key_div.classList.add("fs-2")
        key_div.id = "key-" + item
        key_div.addEventListener("click", function () {
            enterCharacter(item)
        })
        document.getElementById("keyboard-first-row").appendChild(key_div)
    })

    keys_second_row.forEach((item) => {
        var key_div = document.createElement("div")
        key_div.innerHTML = item
        key_div.classList.add("single-key")
        key_div.classList.add("fs-2")
        key_div.id = "key-" + item
        key_div.addEventListener("click", function () {
            enterCharacter(item)
        })
        document.getElementById("keyboard-second-row").appendChild(key_div)
    })

    var enter_div = document.createElement("div")
    enter_div.innerHTML = "ENTER"
    enter_div.classList.add("single-key")
    enter_div.classList.add("fs-2")
    enter_div.id = "key-" + "ENTER"
    enter_div.addEventListener("click", testGuess)
    document.getElementById("keyboard-third-row").appendChild(enter_div)

    keys_third_row.forEach((item) => {
        var key_div = document.createElement("div")
        key_div.innerHTML = item
        key_div.classList.add("single-key")
        key_div.classList.add("fs-2")
        key_div.id = "key-" + item
        key_div.addEventListener("click", function () {
            enterCharacter(item)
        })
        document.getElementById("keyboard-third-row").appendChild(key_div)
    })

    var del_div = document.createElement("div")
    del_div.innerHTML = "DELETE"
    del_div.classList.add("single-key")
    del_div.classList.add("fs-2")
    del_div.id = "key-" + "DELETE"
    del_div.addEventListener("click", deleteLastChar)
    document.getElementById("keyboard-third-row").appendChild(del_div)
}

/**
 * Enters a character if the max tries haven't been exceeded 
 * and if you haven't already entered 5 characters.
 * Invoked by pressing a character key or by clicking on a character button.
 * 
 * @param {string} character The character to be entered. Must be a 1-character string.
 */
function enterCharacter(character) {
    if (current_try < max_tries) {
        if (current_character < character_count) {
            document.getElementById("wordle-character-" + current_try + "-" + current_character).innerHTML = character
            document.getElementById("wordle-character-input-" + current_try + "-" + current_character).value = character
            current_character++;
        }
    }
}

/**
 * Test the current guess if the user has entered 5 characters.
 * Invoked by pressing the return key or by clicking the "Enter" button.
 */
function testGuess() {
    if (current_character == character_count) {
        var word = ""
        for (var i = 0; i < character_count; i++) {
            word += document.getElementById("wordle-character-input-" + current_try + "-" + i).value
        }
        //console.log(word)
        var result = game.guess(word)
        //console.log(result)
        updateCharacterColors(word, result)
        if (result.every(elem => elem == 1)) {
            doConfetti();
        } else {
            current_character = 0
            current_try++
            if (current_try == max_tries) {
                modal_try_again.show();
            }
        }
    }
}

/**
 * Delete the last character of the current guess 
 * if the guess hasn't already been tested 
 * and if there are more than 0 characters that have been entered.
 */
function deleteLastChar() {
    if (current_character > 0) {
        current_character--;
        document.getElementById("wordle-character-" + current_try + "-" + current_character).innerHTML = ""
        document.getElementById("wordle-character-input-" + current_try + "-" + current_character).value = ""
    }
}

/**
 * Update the color of each character according to the entered word and the result of Game.guess(word).
 * The result array is of the following format:
 *  [0, 1, 0, -1, -1]
 * (where -1 = grey, 0 = yellow and 1 = green)
 * 
 * @param {string} word The guessed word that has been entered
 * @param {object} resultArray The result array containing -1, 0 or 1 for each character
 */
function updateCharacterColors(word, resultArray) {
    resultArray.forEach((item, index) => {
        var wordle_div = document.getElementById("wordle-character-" + current_try + "-" + index)
        var key_div = document.getElementById("key-" + word[index])
        wordle_div.classList.add("text-light")
        key_div.classList.add("text-light")
        if (item == 1) {
            wordle_div.classList.add("character-correct")
            key_div.classList.remove("character-correct-position-wrong")
            key_div.classList.add("character-correct")
        } else if (item == 0) {
            wordle_div.classList.add("character-correct-position-wrong")
            if (!key_div.classList.contains("character-correct")) {
                key_div.classList.add("character-correct-position-wrong")
            }
        } else {
            wordle_div.classList.add("character-wrong")
            key_div.classList.add("character-wrong")
        }
    })
}