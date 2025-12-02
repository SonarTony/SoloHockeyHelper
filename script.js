// Simple random dice roll
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// Even-strength image map
// Assumes files named images/even_1_1.png ... images/even_6_6.png
const evenImages = {};
for (let w = 1; w <= 6; w++) {
  for (let b = 1; b <= 6; b++) {
    const key = `${w}-${b}`;
    evenImages[key] = `images/even_${w}_${b}.png`;
  }
}

// Power play image map
// For now only 1-1 and 1-2 use the same combined image
const ppImages = {
  '1-1': 'images/pp_1_1_2.png',
  '1-2': 'images/pp_1_1_2.png',
  '1-3': 'images/pp_1_3_4.png',
  '1-4': 'images/pp_1_3_4.png',
  '1-5': 'images/pp_1_5_6.png',
  '1-6': 'images/pp_1_5_6.png',

  '2-1': 'images/pp_2_1_2.png',
  '2-2': 'images/pp_2_1_2.png',
  '2-3': 'images/pp_2_3_4.png',
  '2-4': 'images/pp_2_3_4.png',
  '2-5': 'images/pp_2_5_6.png',
  '2-6': 'images/pp_2_5_6.png',

    '3-1': 'images/pp_3_1_2.png',
    '3-2': 'images/pp_3_1_2.png',
    '3-3': 'images/pp_3_3_4.png',
    '3-4': 'images/pp_3_3_4.png',
    '3-5': 'images/pp_3_5_6.png',
    '3-6': 'images/pp_3_5_6.png',

    '4-1': 'images/pp_4_1_2.png',
    '4-2': 'images/pp_4_1_2.png',
    '4-3': 'images/pp_4_3_4.png',
    '4-4': 'images/pp_4_3_4.png',
    '4-5': 'images/pp_4_5_6.png',
    '4-6': 'images/pp_4_5_6.png',

    '5-1': 'images/pp_5_1_2.png',
    '5-2': 'images/pp_5_1_2.png',
    '5-3': 'images/pp_5_3_4.png',
    '5-4': 'images/pp_5_3_4.png',
    '5-5': 'images/pp_5_5_6.png',
    '5-6': 'images/pp_5_5_6.png',

    '6-1': 'images/pp_6_1_2.png',
    '6-2': 'images/pp_6_1_2.png',
    '6-3': 'images/pp_6_3_4.png',
    '6-4': 'images/pp_6_3_4.png',
    '6-5': 'images/pp_6_5_6.png',
    '6-6': 'images/pp_6_5_6.png',
  // add more pp mappings later as you create them
};

// DOM elements
const whiteDieEl = document.getElementById('whiteDie');
const blackDieEl = document.getElementById('blackDie');
const redDieEl = document.getElementById('redDie');
const greenDieEl = document.getElementById('greenDie');

const rollButton = document.getElementById('rollButton');
const resultTextEl = document.getElementById('resultText');

const cardContainerEl = document.getElementById('cardContainer');
const cardImageEl = document.getElementById('resultCardImage');
const noCardMessageEl = document.getElementById('noCardMessage');

const modeRadios = document.querySelectorAll('input[name="mode"]');

let currentMode = 'even';
let lastRoll = {
  white: null,
  black: null,
  red: null,
  green: null
};

// Mode change handler
modeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    currentMode = radio.value;
    updateResultText();
    updateCard();
  });
});

// Roll handler
rollButton.addEventListener('click', () => {
  lastRoll.white = rollDie(6);
  lastRoll.black = rollDie(6);
  lastRoll.red = rollDie(6);
  lastRoll.green = rollDie(20);

  whiteDieEl.textContent = lastRoll.white;
  blackDieEl.textContent = lastRoll.black;
  redDieEl.textContent = lastRoll.red;
  greenDieEl.textContent = lastRoll.green;

  updateResultText();
  updateCard();
});

function updateResultText() {
  const modeLabel = currentMode === 'even' ? 'Even Strength' : 'Power Play';

  const w = lastRoll.white ?? '-';
  const b = lastRoll.black ?? '-';
  const r = lastRoll.red ?? '-';
  const g = lastRoll.green ?? '-';

  resultTextEl.textContent =
    `Mode: ${modeLabel} | White ${w}, Black ${b}, Red ${r}, Green ${g}.`;
}

function updateCard() {
  if (lastRoll.white == null || lastRoll.black == null) {
    cardContainerEl.classList.add('hidden');
    noCardMessageEl.classList.remove('hidden');
    return;
  }

  const key = `${lastRoll.white}-${lastRoll.black}`;
  const imgMap = currentMode === 'even' ? evenImages : ppImages;
  const imgPath = imgMap[key];

  if (imgPath) {
    cardImageEl.src = imgPath;
    cardContainerEl.classList.remove('hidden');
    noCardMessageEl.classList.add('hidden');
  } else {
    cardContainerEl.classList.add('hidden');
    noCardMessageEl.classList.remove('hidden');
  }
}

// Initial text
updateResultText();





