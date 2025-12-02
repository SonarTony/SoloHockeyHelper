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

// Game clock elements
const gameClockEl = document.getElementById('gameClock');
const clockMinusBtn = document.getElementById('clockMinus');
const clockPlusBtn = document.getElementById('clockPlus');

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

// Goal Effect overlay elements
const goalEffectButton = document.getElementById('goalEffectButton');
const goalEffectOverlayEl = document.getElementById('goalEffectOverlay');
const closeGoalEffectOverlayBtn = document.getElementById('closeGoalEffectOverlay');

// Shot C overlay elements
const shotCButton = document.getElementById('shotCButton');
const shotCOverlayEl = document.getElementById('shotCOverlay');
const closeShotCOverlayBtn = document.getElementById('closeShotCOverlay');

// Penalty overlay elements
const penaltyButton = document.getElementById('penaltyButton');
const penaltyOverlayEl = document.getElementById('penaltyOverlay');
const closePenaltyOverlayBtn = document.getElementById('closePenaltyOverlay');

// Brutal Play overlay elements
const brutalButton = document.getElementById('brutalButton');
const brutalOverlayEl = document.getElementById('brutalOverlay');
const closeBrutalOverlayBtn = document.getElementById('closeBrutalOverlay');

let currentMode = 'even';
let lastRoll = {
  white: null,
  black: null,
  red: null,
  green: null
};

// GAME CLOCK STATE (20:00 in seconds)
let clockSeconds = 20 * 60; // 1200 seconds

// Make sure overlays start hidden
if (goalieOverlayEl) goalieOverlayEl.style.display = 'none';
if (reboundOverlayEl) reboundOverlayEl.style.display = 'none';
if (deflectionOverlayEl) deflectionOverlayEl.style.display = 'none';
if (chaosOverlayEl) chaosOverlayEl.style.display = 'none';
if (goalEffectOverlayEl) goalEffectOverlayEl.style.display = 'none';
if (shotCOverlayEl) shotCOverlayEl.style.display = 'none';
if (penaltyOverlayEl) penaltyOverlayEl.style.display = 'none';
if (brutalOverlayEl) brutalOverlayEl.style.display = 'none';

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

/* ---------- Game clock logic ---------- */

function formatClock(secs) {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateClockDisplay() {
  if (gameClockEl) {
    gameClockEl.textContent = formatClock(clockSeconds);
  }
}

// manual -0:20, clamped at 0
if (clockMinusBtn) {
  clockMinusBtn.addEventListener('click', () => {
    clockSeconds = Math.max(0, clockSeconds - 20);
    updateClockDisplay();
  });
}

// manual +0:20, clamped at 20:00 (period length)
if (clockPlusBtn) {
  clockPlusBtn.addEventListener('click', () => {
    clockSeconds = Math.min(20 * 60, clockSeconds + 20);
    updateClockDisplay();
  });
}

/* ---------- Overlay helpers ---------- */

function wireOverlay(openBtn, overlay, closeBtn) {
  if (!overlay) return;

  // open
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      overlay.style.display = 'flex';
    });
  }

  // close via X
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.style.display = 'none';
    });
  }

  // close via background click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
    }
  });
}

wireOverlay(goalieButton, goalieOverlayEl, closeGoalieOverlayBtn);
wireOverlay(reboundButton, reboundOverlayEl, closeReboundOverlayBtn);
wireOverlay(deflectionButton, deflectionOverlayEl, closeDeflectionOverlayBtn);
wireOverlay(chaosButton, chaosOverlayEl, closeChaosOverlayBtn);
wireOverlay(goalEffectButton, goalEffectOverlayEl, closeGoalEffectOverlayBtn);
wireOverlay(shotCButton, shotCOverlayEl, closeShotCOverlayBtn);
wireOverlay(penaltyButton, penaltyOverlayEl, closePenaltyOverlayBtn);
wireOverlay(brutalButton, brutalOverlayEl, closeBrutalOverlayBtn);

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

// Initial text and clock display
updateResultText();
updateClockDisplay();


















