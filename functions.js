let game = new Game();

let max_tries = 6
let character_count = 5

document.addEventListener('DOMContentLoaded', function () {
    createBlankWordle();
    createKeyboard();
  }, false);


var current_try = 0
var current_character = 0


function createBlankWordle() {
    var wrapper = document.getElementById("wordle-wrapper")

    for (var i = 0; i < max_tries; i++) {
        var row_div = document.createElement("div")
        row_div.classList.add("wordle-row")
        row_div.id = "wordle-row-" + i
        for (var j = 0; j < character_count; j++) {
            var wordle_character_div = document.createElement("div")
            wordle_character_div.classList.add("wordle-character")
            wordle_character_div.id = "wordle-character-" + i + "-" + j
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

function createKeyboard() {
    keys_first_row = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"]
    keys_first_row.forEach((item) => {
        var key_div = document.createElement("div")
        key_div.innerHTML = item
        key_div.classList.add("single-key")
        key_div.id = "key-" + item
        key_div.addEventListener("click", function () {
            enterCharacter(item)
        })
        document.getElementById("keyboard-first-row").appendChild(key_div)
    })

    keys_second_row = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"]
    keys_second_row.forEach((item) => {
        var key_div = document.createElement("div")
        key_div.innerHTML = item
        key_div.classList.add("single-key")
        key_div.id = "key-" + item
        key_div.addEventListener("click", function () {
            enterCharacter(item)
        })
        document.getElementById("keyboard-second-row").appendChild(key_div)
    })

    keys_third_row = ["Y", "X", "C", "V", "B", "N", "M"]
    keys_third_row.forEach((item) => {
        var key_div = document.createElement("div")
        key_div.innerHTML = item
        key_div.classList.add("single-key")
        key_div.id = "key-" + item
        key_div.addEventListener("click", function () {
            enterCharacter(item)
        })
        document.getElementById("keyboard-third-row").appendChild(key_div)
    })

    var del_div = document.createElement("div")
    del_div.innerHTML = "DELETE"
    del_div.classList.add("single-key")
    del_div.id = "key-" + "DELETE"
    del_div.addEventListener("click", deleteLastChar)
    document.getElementById("keyboard-third-row").appendChild(del_div)

    var enter_div = document.createElement("div")
    enter_div.innerHTML = "ENTER"
    enter_div.classList.add("single-key")
    enter_div.id = "key-" + "ENTER"
    enter_div.addEventListener("click", testGuess)
    document.getElementById("keyboard-third-row").appendChild(enter_div)
}


function enterCharacter(character) {
    console.log(current_try)
    console.log(current_character)
    if (current_try < max_tries) {
        if (current_character < character_count) {
            document.getElementById("wordle-character-" + current_try + "-" + current_character).innerHTML = character
            document.getElementById("wordle-character-input-" + current_try + "-" + current_character).value = character
            current_character++;
        }
    }
}

function testGuess() {
    if (current_character == character_count) {
        var word = ""
        for (var i = 0; i < character_count; i++) {
            word += document.getElementById("wordle-character-input-" + current_try + "-" + i).value
        }
        console.log(word)
        var result = game.guess(word)
        console.log(result)
        updateCharacterColors(word, result)

        current_character = 0
        current_try++
    }
}


function deleteLastChar() {
    if (current_character > 0) {
        current_character--;
        document.getElementById("wordle-character-" + current_try + "-" + current_character).innerHTML = ""
        document.getElementById("wordle-character-input-" + current_try + "-" + current_character).value = ""
    }
}


function updateCharacterColors(word, resultArray) {
    resultArray.forEach((item, index) => {
        var wordle_div = document.getElementById("wordle-character-" + current_try + "-" + index)
        var key_div = document.getElementById("key-" + word[index])
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