let current_cell = 0;
let current_cell_ui = 0;
let current_row = 0;
let guessed_words = { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" };
let isGuessed = false;
let finalWord;
let spanElements = document.querySelectorAll('#keyboard span');

window.onload = () => {
    finalWord = words[(Math.floor(Math.random() * words.length))];
    //console.log(finalWord);
};

function dictSetter(value) {
    if (current_row < 6) {
        if (
            guessed_words[current_row].length < 5 &&
            value != "Enter" &&
            value != "Backspace"
        ) {
            guessed_words[current_row] = guessed_words[current_row] + value;
            current_cell_ui = current_cell + 5 * current_row;
            const cell = document.getElementById(`char_${current_cell_ui + 1}`);
            cell.innerHTML = guessed_words[current_row][current_cell].toUpperCase();
    
            current_cell += 1;
        } else if (guessed_words[current_row].length >= 5 && value == "Enter") {
            dictFinaliser();
        } 
    } else {
        alert("Try again tomorrow");
    }
    
    //console.log(guessed_words);
}

function dictResetter() {
    if (current_cell > 0) {
        guessed_words[current_row] = guessed_words[current_row].slice(0, -1);
        current_cell -= 1;

        current_cell_ui = current_cell + 5 * current_row;
        const cell = document.getElementById(`char_${current_cell_ui + 1}`);
        cell.innerHTML = "";

        console.log(guessed_words);
    }
}

function dictFinaliser() {
    let flag = false;
    let guessCount = 0;

    for (let i = 0; i < current_row; i++) {
        if (guessed_words[i] === guessed_words[current_row]) {
        flag = true;
        alert("You have already gussed this word before...");
        return;
        }
    }

    if (flag === false && words.includes(guessed_words[current_row])) {

        for (let i = 0, j = 0; i < 5; i++) {
            const cell = document.getElementById(`char_${(i + (5*current_row) + 1)}`);
            if (guessed_words[current_row][i] == finalWord[i] && guessCount < 5) {
                cell.classList.add('green');
                for (let j = 0; j < spanElements.length; j++) {
                    if (spanElements[j].textContent.toLowerCase() === guessed_words[current_row][i].toLowerCase()) {
                        spanElements[j].classList.add('green');
                    }
                }                

                guessCount += 1;
                if (guessCount == 5) {
                    console.log("Bravo!");
                    isGuessed = true;
                }
            } else if (finalWord.includes(guessed_words[current_row][i])) {
                cell.classList.add('yellow');
                for (let j = 0; j < spanElements.length; j++) {
                    if (spanElements[j].textContent.toLowerCase() === guessed_words[current_row][i].toLowerCase()) {
                        spanElements[j].classList.add('yellow');
                    }
                }  
            } else if (!finalWord.includes(guessed_words[current_row][i])){
                cell.classList.add('not_present');
                for (let j = 0; j < spanElements.length; j++) {
                    if (spanElements[j].textContent.toLowerCase() === guessed_words[current_row][i].toLowerCase()) {
                        spanElements[j].classList.add('not_present');
                    }
                }
            }
        }

        current_row += 1;
        current_cell = 0;
    } else {
        alert("What the fuck is " + guessed_words[current_row] + "?");
    }
}

window.addEventListener("keydown", (ev) => {
    if (!isGuessed) {
        let value = ev.key;
        if (value === "Backspace" && current_cell >= 0) {
            dictResetter();
        } else if (value.toLowerCase() !== value.toUpperCase() || value === "Enter") {
            dictSetter(value);
        }
    }
});


