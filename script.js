// Simple random dice roll
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// Even-strength image map
const evenImages = {};
for (let w = 1; w <= 6; w++) {
  for (let b = 1; b <= 6; b++) {
    const key = `${w}-${b}`;
    evenImages[key] = `images/even_${w}_${b}.png`;
  }
}

// Power play image map
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

// Scoreboard elements
const homeScoreEl = document.getElementById('homeScore');
const visitorScoreEl = document.getElementById('visitorScore');
const homeMinusBtn = document.getElementById('homeMinus');
const homePlusBtn = document.getElementById('homePlus');
const visitorMinusBtn = document.getElementById('visitorMinus');
const visitorPlusBtn = document.getElementById('visitorPlus');

// Period elements
const periodDisplayEl = document.getElementById('periodDisplay');
const periodMinusBtn = document.getElementById('periodMinus');
const periodPlusBtn = document.getElementById('periodPlus');

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

// Counter overlay elements
const counterButton = document.getElementById('counterButton');
const counterOverlayEl = document.getElementById('counterOverlay');
const closeCounterOverlayBtn = document.getElementById('closeCounterOverlay');

// Assist overlay elements
const assistButton = document.getElementById('assistButton');
const assistOverlayEl = document.getElementById('assistOverlay');
const closeAssistOverlayBtn = document.getElementById('closeAssistOverlay');

// Gameday overlay elements
const gamedayButton = document.getElementById('gamedayButton');
const gamedayOverlayEl = document.getElementById('gamedayOverlay');
const closeGamedayOverlayBtn = document.getElementById('closeGamedayOverlay');

let currentMode = 'even';
let lastRoll = {
  white: null,
  black: null,
  red: null,
  green: null
};

// GAME CLOCK STATE (20:00 in seconds)
let clockSeconds = 20 * 60;

// SCOREBOARD STATE
let homeScore = 0;
let visitorScore = 0;

// PERIOD STATE
const periodStates = ['1', '2', '3', 'OT', 'SO'];
let periodIndex = 0;

// Make sure overlays start hidden
if (goalieOverlayEl) goalieOverlayEl.style.display = 'none';
if (reboundOverlayEl) reboundOverlayEl.style.display = 'none';
if (deflectionOverlayEl) deflectionOverlayEl.style.display = 'none';
if (chaosOverlayEl) chaosOverlayEl.style.display = 'none';
if (goalEffectOverlayEl) goalEffectOverlayEl.style.display = 'none';
if (shotCOverlayEl) shotCOverlayEl.style.display = 'none';
if (penaltyOverlayEl) penaltyOverlayEl.style.display = 'none';
if (brutalOverlayEl) brutalOverlayEl.style.display = 'none';
if (counterOverlayEl) counterOverlayEl.style.display = 'none';
if (assistOverlayEl) assistOverlayEl.style.display = 'none';
if (gamedayOverlayEl) gamedayOverlayEl.style.display = 'none';

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

if (clockMinusBtn) {
  clockMinusBtn.addEventListener('click', () => {
    clockSeconds = Math.max(0, clockSeconds - 20);
    updateClockDisplay();
  });
}

if (clockPlusBtn) {
  clockPlusBtn.addEventListener('click', () => {
    clockSeconds = Math.min(20 * 60, clockSeconds + 20);
    updateClockDisplay();
  });
}

/* ---------- Scoreboard logic ---------- */

function updateScoreDisplay() {
  if (homeScoreEl) homeScoreEl.textContent = homeScore.toString();
  if (visitorScoreEl) visitorScoreEl.textContent = visitorScore.toString();
}

if (homeMinusBtn) {
  homeMinusBtn.addEventListener('click', () => {
    homeScore = Math.max(0, homeScore - 1);
    updateScoreDisplay();
  });
}
if (homePlusBtn) {
  homePlusBtn.addEventListener('click', () => {
    homeScore = Math.min(99, homeScore + 1);
    updateScoreDisplay();
  });
}

if (visitorMinusBtn) {
  visitorMinusBtn.addEventListener('click', () => {
    visitorScore = Math.max(0, visitorScore - 1);
    updateScoreDisplay();
  });
}
if (visitorPlusBtn) {
  visitorPlusBtn.addEventListener('click', () => {
    visitorScore = Math.min(99, visitorScore + 1);
    updateScoreDisplay();
  });
}

/* ---------- Period logic ---------- */

function updatePeriodDisplay() {
  if (periodDisplayEl) {
    periodDisplayEl.textContent = periodStates[periodIndex];
  }
}

if (periodMinusBtn) {
  periodMinusBtn.addEventListener('click', () => {
    if (periodIndex > 0) {
      periodIndex--;
      updatePeriodDisplay();
    }
  });
}

if (periodPlusBtn) {
  periodPlusBtn.addEventListener('click', () => {
    if (periodIndex < periodStates.length - 1) {
      periodIndex++;
      updatePeriodDisplay();
    }
  });
}

/* ---------- Overlay helpers ---------- */

function wireOverlay(openBtn, overlay, closeBtn) {
  if (!overlay) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      overlay.style.display = 'flex';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.style.display = 'none';
    });
  }

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
wireOverlay(counterButton, counterOverlayEl, closeCounterOverlayBtn);
wireOverlay(assistButton, assistOverlayEl, closeAssistOverlayBtn);
wireOverlay(gamedayButton, gamedayOverlayEl, closeGamedayOverlayBtn);

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

// Initial text, clock, scores, and period
updateResultText();
updateClockDisplay();
updateScoreDisplay();
updatePeriodDisplay();






















