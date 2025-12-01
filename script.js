// Simple random die roll
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// All even strength cards: white 1 to 6, black 1 to 6
const cardImagesEven = {
  // white 1
  "1-1": "images/even_1_1.png",
  "1-2": "images/even_1_2.png",
  "1-3": "images/even_1_3.png",
  "1-4": "images/even_1_4.png",
  "1-5": "images/even_1_5.png",
  "1-6": "images/even_1_6.png",

  // white 2
  "2-1": "images/even_2_1.png",
  "2-2": "images/even_2_2.png",
  "2-3": "images/even_2_3.png",
  "2-4": "images/even_2_4.png",
  "2-5": "images/even_2_5.png",
  "2-6": "images/even_2_6.png",

  // white 3
  "3-1": "images/even_3_1.png",
  "3-2": "images/even_3_2.png",
  "3-3": "images/even_3_3.png",
  "3-4": "images/even_3_4.png",
  "3-5": "images/even_3_5.png",
  "3-6": "images/even_3_6.png",

  // white 4
  "4-1": "images/even_4_1.png",
  "4-2": "images/even_4_2.png",
  "4-3": "images/even_4_3.png",
  "4-4": "images/even_4_4.png",
  "4-5": "images/even_4_5.png",
  "4-6": "images/even_4_6.png",

  // white 5
  "5-1": "images/even_5_1.png",
  "5-2": "images/even_5_2.png",
  "5-3": "images/even_5_3.png",
  "5-4": "images/even_5_4.png",
  "5-5": "images/even_5_5.png",
  "5-6": "images/even_5_6.png",

  // white 6
  "6-1": "images/even_6_1.png",
  "6-2": "images/even_6_2.png",
  "6-3": "images/even_6_3.png",
  "6-4": "images/even_6_4.png",
  "6-5": "images/even_6_5.png",
  "6-6": "images/even_6_6.png"
};

// Power play map placeholder
// Add entries here as you create power play images
const cardImagesPP = {
  // example entries
  "1-1": "images/pp_1_1.png",
  "1-2": "images/pp_1_2.png"
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

  const modeRadios = document.querySelectorAll('input[name="mode"]');
  modeRadios.forEach(function (radio) {
    radio.addEventListener("change", function (e) {
      currentMode = e.target.value;

      // If dice already rolled, refresh card and text
      const whiteText = document.getElementById("whiteDie").textContent;
      const blackText = document.getElementById("blackDie").textContent;
      const white = parseInt(whiteText, 10);
      const black = parseInt(blackText, 10);

      if (!isNaN(white) && !isNaN(black)) {
        updateCardDisplay(white, black);

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




