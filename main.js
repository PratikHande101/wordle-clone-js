let current_cell = 0;
let current_row = 0;
let guessed_words = { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" };

// function cellSetter(key) {
//   if (guessed_words[current_row].length < 5) {
//     guessed_words[current_row] = guessed_words[current_row] + key;
//     console.log(guessed_words[current_row]);
//     const cell = document.getElementById(`char_${current_cell + 1}`);
//     cell.innerHTML = key.toUpperCase();
//     current_cell++;
//   } else {
//     guessed_words[current_row];
//     current_row++;
//   }
// }

// function cellResetter() {
//   // const cell = document.getElementById(`char_${current_cell + 1}`);
//   // cell.innerHTML = "";
//   if (current_cell != 0) {
//     current_cell--;
//   }
// }

function dictSetter(value) {
  if (
    guessed_words[current_row].length < 5 &&
    value != "Enter" &&
    value != "Backspace"
  ) {
    guessed_words[current_row] = guessed_words[current_row] + value;
    // console.log(guessed_words[current_row][current_cell]);
    // console.log(current_cell);

    const cell = document.getElementById(`char_${current_cell + 1}`);
    cell.innerHTML = guessed_words[current_row][current_cell].toUpperCase();

    current_cell += 1;
  } else if (guessed_words[current_row].length >= 5 && value == "Enter") {
    dictFinaliser();
  }
  console.log(guessed_words);
}

function dictResetter() {
  if (current_cell > 0) {
    guessed_words[current_row] = guessed_words[current_row].slice(0, -1);
    current_cell -= 1;

    const cell = document.getElementById(`char_${current_cell + 1}`);
    cell.innerHTML = "";

    console.log(guessed_words);
  }
}

function dictFinaliser() {
  let flag = false;

  for (let i = 0; i < current_row; i++) {
    if (guessed_words[i] === guessed_words[current_row]) {
      flag = true;
    }
  }

  if (flag === false && words.includes(guessed_words[current_row])) {
    current_row += 1;
  } else {
    alert("The fuck is " + guessed_words[current_row]);
  }
}

window.addEventListener("keydown", (ev) => {
  let value = ev.key;
  if (value === "Backspace" && current_cell >= 0) {
    dictResetter();
  } else if (value.toLowerCase() !== value.toUpperCase() || value === "Enter") {
    dictSetter(value);
  }
});


