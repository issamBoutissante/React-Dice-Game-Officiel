let rollDice = document.querySelector(".rollDice");
let DiceImage = document.querySelector("img");
DiceImage.parentElement.style.display = "none";

let current_1 = document.querySelector(".current_1");
let current_2 = document.querySelector(".current_2");
let hold = document.querySelector(".hold");
let totat_1 = document.querySelector(".total_1");
let totat_2 = document.querySelector(".total_2");
let activeCurrent = current_1;
totat_1.textContent = 0;
totat_2.textContent = 0;
let GameOver = false;

document.querySelector(".newGame").addEventListener("click", (e) => {
  GameOver = false;
  activeCurrent.parentElement.parentElement.classList.remove("winer");
  totat_1.textContent = "0";
  totat_2.textContent = "0";
  activeCurrent.textContent = "0";
});

//this is the event of Roll Dice button
rollDice.addEventListener("click", (e) => {
  if (!GameOver) {
    let ranNumber = Math.floor(Math.random() * 6) + 1;
    if (ranNumber === 1) {
      ranNumber = 0;
      activeCurrent.textContent = "0";
      changeCurrent();
    }
    if (ranNumber === 0) {
      DiceImage.parentElement.style.display = "none";
    } else {
      DiceImage.parentElement.style.display = "block";
    }
    DiceImage.src = `./assets/${ranNumber}.jpg`;
    activeCurrent.textContent = ranNumber;
  }
});

//this is the event of Hold button
hold.addEventListener("click", changeCurrent);
function changeCurrent(e) {
  activeCurrent.parentElement.parentElement.classList.remove("activePlayer");
  if (!GameOver) {
    DiceImage.parentElement.style.display = "none";
    let result = activeCurrent.textContent;
    activeCurrent.textContent = "0";
    if (activeCurrent === current_1) {
      isWinner(totat_1, current_2, result);
    } else {
      isWinner(totat_2, current_1, result);
    }
  }
  activeCurrent.parentElement.parentElement.classList.add("activePlayer");
}
function changePlayer() {
  if (activeCurrent === current_1) {
    activeCurrent = current_2;
  } else {
    activeCurrent = current_1;
  }
}

const isWinner = (total, current, result) => {
  total.textContent = parseInt(result) + parseInt(total.textContent);
  if (parseInt(total.textContent) >= 100) {
    activeCurrent.parentElement.parentElement.classList.add("winer");
    GameOver = true;
  } else {
    activeCurrent = current;
  }
};

//now i'm working on total of players
