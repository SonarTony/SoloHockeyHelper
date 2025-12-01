// Simple random die roll
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// Card maps for each mode.
// Extend these as you add more cards.

const cardImagesEven = {
  // row 1 (white 1)
  "1-1": "images/even_1_1.png",
  "1-2": "images/even_1_2.png",
  "1-3": "images/even_1_3.png",
  "1-4": "images/even_1_4.png",
  "1-5": "images/even_1_5.png",
  "1-6": "images/even_1_6.png",

  // row 2 (white 2)
  "2-1": "images/even_2_1.png",
  "2-2": "images/even_2_2.png",
  "2-3": "images/even_2_3.png",
  "2-4": "images/even_2_4.png",
   "2-5": "images/even_2_5.png",
  "2-6": "images/even_2_6.png",
  // you can add "2-3" etc later
};

const cardImagesPP = {
  // Power play cards as you add them
  "1-1": "images/pp_1_1.png",
  "1-2": "images/pp_1_2.png"
  // later:
  // "1-3": "images/pp_1_3.png",
  // "1-4": "images/pp_1_4.png",
  // "1-5": "images/pp_1_5.png",
  // "1-6": "images/pp_1_6.png",
  // "2-1": "images/pp_2_1.png",
  // "2-2": "images/pp_2_2.png", etc.
};

let currentMode = "even";

function getCurrentCardMap() {
  return currentMode === "pp" ? cardImagesPP : cardImagesEven;
}

function updateDiceDisplay(white, black, red, green) {
  document.getElementById("whiteDie").textContent = white;
  document.getElementById("blackDie").textContent = black;
  document.getElementById("redDie").textContent = red;
  document.getElementById("greenDie").textContent = green;

  const modeLabel = currentMode === "pp" ? "Power Play" : "Even Strength";

  const resultText = document.getElementById("resultText");
  resultText.textContent =
    "Mode: " +
    modeLabel +
    " | White " +
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
  const cardMap = getCurrentCardMap();
  const imgPath = cardMap[key];

  const cardContainer = document.getElementById("cardContainer");
  const img = document.getElementById("resultCardImage");
  const noCardMessage = document.getElementById("noCardMessage");

  if (imgPath) {
    img.src = imgPath;
    img.alt =
      "Result card for mode " +
      (currentMode === "pp" ? "Power Play" : "Even Strength") +
      ", white " +
      white +
      " and black " +
      black;
    cardContainer.classList.remove("hidden");
    noCardMessage.textContent = "";
  } else {
    img.src = "";
    cardContainer.classList.add("hidden");
    noCardMessage.textContent =
      "No card for this white and black combo in this mode yet.";
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

  // Mode radio buttons
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  modeRadios.forEach(function (radio) {
    radio.addEventListener("change", function (e) {
      currentMode = e.target.value;
      // After changing mode, if we already have dice rolled, refresh card
      const whiteText = document.getElementById("whiteDie").textContent;
      const blackText = document.getElementById("blackDie").textContent;
      const white = parseInt(whiteText, 10);
      const black = parseInt(blackText, 10);

      if (!isNaN(white) && !isNaN(black)) {
        updateCardDisplay(white, black);
        // Also refresh text so mode name matches
        const red = parseInt(
          document.getElementById("redDie").textContent,
          10
        );
        const green = parseInt(
          document.getElementById("greenDie").textContent,
          10
        );
        if (!isNaN(red) && !isNaN(green)) {
          updateDiceDisplay(white, black, red, green);
        }
      }
    });
  });
});



