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

// Power play image map (all combos wired to your combined images)
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
  '6-6': 'images/pp_6_5_6.png'
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

// Goalie overlay elements
const goalieButton = document.getElementById('goalieButton');
const goalieOverlayEl = document.getElementById('goalieOverlay');
const closeGoalieOverlayBtn = document.getElementById('closeGoalieOverlay');

// Rebound overlay elements
const reboundButton = document.getElementById('reboundButton');
const reboundOverlayEl = document.getElementById('reboundOverlay');
const closeReboundOverlayBtn = document.getElementById('closeReboundOverlay');

// Deflection overlay elements
const deflectionButton = document.getElementById('deflectionButton');
const deflectionOverlayEl = document.getElementById('deflectionOverlay');
const closeDeflectionOverlayBtn = document.getElementById('closeDeflectionOverlay');

// Chaos overlay elements
const chaosButton = document.getElementById('chaosButton');
const chaosOverlayEl = document.getElementById('chaosOverlay');
const closeChaosOverlayBtn = document.getElementById('closeChaosOverlay');

let currentMode = 'even';
let lastRoll = {
  white: null,
  black: null,
  red: null,
  green: null
};

// Make sure overlays start hidden
if (goalieOverlayEl) goalieOverlayEl.style.display = 'none';
if (reboundOverlayEl) reboundOverlayEl.style.display = 'none';
if (deflectionOverlayEl) deflectionOverlayEl.style.display = 'none';
if (chaosOverlayEl) chaosOverlayEl.style.display = 'none';

// Mode change handler
modeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      currentMode = radio.value;
      updateResultText();
      updateCard();
    }
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

/* ---------- Goalie overlay ---------- */

if (goalieButton && goalieOverlayEl) {
  goalieButton.addEventListener('click', () => {
    goalieOverlayEl.style.display = 'flex';
  });
}

if (closeGoalieOverlayBtn && goalieOverlayEl) {
  closeGoalieOverlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goalieOverlayEl.style.display = 'none';
  });
}

if (goalieOverlayEl) {
  goalieOverlayEl.addEventListener('click', (e) => {
    if (e.target === goalieOverlayEl) {
      goalieOverlayEl.style.display = 'none';
    }
  });
}

/* ---------- Rebound overlay ---------- */

if (reboundButton && reboundOverlayEl) {
  reboundButton.addEventListener('click', () => {
    reboundOverlayEl.style.display = 'flex';
  });
}

if (closeReboundOverlayBtn && reboundOverlayEl) {
  closeReboundOverlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    reboundOverlayEl.style.display = 'none';
  });
}

if (reboundOverlayEl) {
  reboundOverlayEl.addEventListener('click', (e) => {
    if (e.target === reboundOverlayEl) {
      reboundOverlayEl.style.display = 'none';
    }
  });
}

/* ---------- Deflection overlay ---------- */

if (deflectionButton && deflectionOverlayEl) {
  deflectionButton.addEventListener('click', () => {
    deflectionOverlayEl.style.display = 'flex';
  });
}

if (closeDeflectionOverlayBtn && deflectionOverlayEl) {
  closeDeflectionOverlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deflectionOverlayEl.style.display = 'none';
  });
}

if (deflectionOverlayEl) {
  deflectionOverlayEl.addEventListener('click', (e) => {
    if (e.target === deflectionOverlayEl) {
      deflectionOverlayEl.style.display = 'none';
    }
  });
}

/* ---------- Chaos overlay ---------- */

if (chaosButton && chaosOverlayEl) {
  chaosButton.addEventListener('click', () => {
    chaosOverlayEl.style.display = 'flex';
  });
}

if (closeChaosOverlayBtn && chaosOverlayEl) {
  closeChaosOverlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chaosOverlayEl.style.display = 'none';
  });
}

if (chaosOverlayEl) {
  chaosOverlayEl.addEventListener('click', (e) => {
    if (e.target === chaosOverlayEl) {
      chaosOverlayEl.style.display = 'none';
    }
  });
}

/* ---------- Card + text updates ---------- */

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















