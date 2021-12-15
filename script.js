const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const levelSelect = document.getElementById('level');

// List of words for game
const words = [
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
  'computer',
  'generation',
  'accuracy',
  'office',
  'coding',
  'programming',
  'typing',
  'electronic',
  'cambridge',
  'it',
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'interfaces',
  'port',
  'graphics',
  'start',
  'icons',
  'windows',
  'linux',
  'select',
  'sheet',
  'fundamental',
  'google',
  'chart',
  'amazon',
  'warlike',
  'bad',
  'north',
  'dependent',
  'college',
  'boolean',
  'loop',
  'digital',
  'random',
  'system',
  'parallel',
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set level to value in ls or medium
let level =
  localStorage.getItem('level') !== null
    ? localStorage.getItem('level')
    : 'medium';

// Set level select value
levelSelect.value =
  localStorage.getItem('level') !== null
    ? localStorage.getItem('level')
    : 'medium';

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if (level === 'hard') {
      time += 2;
    } else if (level === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
  level = e.target.value;
  localStorage.setItem('level', level);
});
