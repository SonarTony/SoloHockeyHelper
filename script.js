// Simple random die roll
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// Map white / black combinations to card image files.
// You can add more combos as you create more cards.
const cardImages = {
  // white 1, black 1
  "1-1": "images/card_1_1.png"
};

function updateDiceDisplay(white, black, red, green) {
  document.getElementById("whiteDie").textContent = white;
  document.getElementById("blackDie").textContent = black;
  document.getElementById("redDie").textContent = red;
  document.getElementById("greenDie").textContent = green;

  const resultText = document.getElementById("resultText");
  resultText.textContent =
    "White " +
    white +
    ", Black " +
    black +
    ", Red " +
    red +
    ", Green " +
    green +
    ".";
}

function updateCardDisplay(white, black) {
  const key = white + "-" + black;
  const imgPath = cardImages[key];
  const cardContainer = document.getElementById("cardContainer");
  const img = document.getElementById("resultCardImage");
  const noCardMessage = document.getElementById("noCardMessage");

  if (imgPath) {
    img.src = imgPath;
    img.alt = "Result card for white " + white + " and black " + black;
    cardContainer.classList.remove("hidden");
    noCardMessage.textContent = "";
  } else {
    img.src = "";
    cardContainer.classList.add("hidden");
    noCardMessage.textContent =
      "No card for White " + white + " and Black " + black + " yet.";
  }
}

function rollAllDice() {
  const white = rollDie(6);
  const black = rollDie(6);
  const red = rollDie(6);
  const green = rollDie(20);

  updateDiceDisplay(white, black, red, green);
  updateCardDisplay(white, black);
}

document.addEventListener("DOMContentLoaded", function () {
  const rollButton = document.getElementById("rollButton");
  rollButton.addEventListener("click", rollAllDice);
});
