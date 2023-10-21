'use strict';

const spellIcon = document.getElementById('spellIcon');
const timer = document.querySelector('.timer');

const answerButtons = document.querySelectorAll('.btn--answer');

const currentScoreText = document.querySelector('.score--currentScore');
const currentComboText = document.querySelector('.score--currentCombo');

let timeInSeconds = 10;
let timeLimit = 10;

let currentScore = 0;
let minCombo = 1;
let currentCombo = 1;

const scorePerCorrectAnswer = 10;

//measured in px
let blurMax = 15;
let currentBlur = 15;
let blurDelta = 3.5;

const spells = [
  {
    iconCode: 'spell_nature_chainlightning',
    answers: [
      'Chain Lightning',
      'Lightning bolt',
      'Healing Wave',
      'Thunderclap',
    ],
    correctAnswer: 'Chain Lightning',
  },

  {
    iconCode: 'spell_holy_purify',
    answers: ['Inner Fire', 'Flash heal', 'Power Word: Shield', 'Holy Light'],
    correctAnswer: 'Power Word: Shield',
  },

  {
    iconCode: 'ability_criticalstrike',
    answers: ['Rend', 'Defensive stance', 'Shield Wall', 'Recklessness'],
    correctAnswer: 'Recklessness',
  },

  {
    iconCode: 'spell_holy_powerwordshield',
    answers: [
      'Chain Lightning',
      'Lightning bolt',
      'Power word: Shield',
      'Thunderclap',
    ],
    correctAnswer: 'Power word: Shield',
  },

  {
    iconCode: 'spell_frost_freezingbreath',
    answers: ['Frost bolt', 'Frost Armour', 'Frost Nova', 'Ice Shield'],
    correctAnswer: 'Frost Nova',
  },

  {
    iconCode: 'spell_nature_lightning',
    answers: [
      'Chain Lightning',
      'Lightning bolt',
      'Healing Wave',
      'Thunderclap',
    ],
    correctAnswer: 'Lightning bolt',
  },

  {
    iconCode: 'spell_fire_fireball02',
    answers: ['Fireball', 'Incinerate', 'Hellfire', 'Fireblast'],
    correctAnswer: 'Fireball',
  },

  {
    iconCode: 'ability_shockwave',
    answers: ['Heroic strike', 'Rend', 'Deep wounds', 'Hamstring'],
    correctAnswer: 'Hamstring',
  },

  {
    iconCode: 'spell_shadow_possession',
    answers: ['Mind Flay', 'Fear', 'Shadowbolt', 'Life Leech'],
    correctAnswer: 'Fear',
  },

  {
    iconCode: 'spell_fire_incinerate',
    answers: ['Fireball', 'Incinerate', 'Hellfire', 'Fireblast'],
    correctAnswer: 'Incinerate',
  },
];

let selectedSpell = spells[0];

const selectSpell = function (spellIndex) {
  selectedSpell = spells[spellIndex];
};

const getWoWImage = function (iconCode) {
  return `https://wow.zamimg.com/images/wow/icons/large/${iconCode}.jpg`;
};

const calculateScore = function () {
  return Math.trunc(scorePerCorrectAnswer * currentBlur * currentCombo);
};

const setScoreText = function (score) {
  currentScoreText.textContent = `Score: ${score}`;
};

const setCurrentCombo = function (combo) {
  currentCombo = combo;
  currentComboText.textContent = `Combo:    ${currentCombo}`;
};

const updateScore = function (scoringFunction) {
  currentScore += scoringFunction();
  setCurrentCombo(currentCombo + 1);
  setScoreText(currentScore);
};

const setUpAnswerButtons = function () {
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener('click', function checkAnswer() {
      //we get a correct answer we update the score and combo
      if (answerButtons[i].textContent === selectedSpell.correctAnswer) {
        updateScore(calculateScore);
        resetImageAndTimer();
      }
    });
  }
};

const init = function () {
  selectSpell(Math.trunc(Math.random() * spells.length));
  spellIcon.src = getWoWImage(selectedSpell.iconCode);
  setUpAnswerButtons();
  populateAnswerButtons(selectedSpell.answers);
};

const populateAnswerButtons = function (answers) {
  for (let i = 0; i < answers.length; i++) {
    answerButtons[i].textContent = answers[i];
  }
};

const setCurrentBlurValue = function (blurValue) {
  currentBlur = blurValue;
  spellIcon.style.filter = `blur(${currentBlur}px)`;
};

const setcurrentTimerValue = function (currentTime) {
  timeInSeconds = currentTime;
  timer.textContent = `0:0${timeInSeconds}`;
};

const resetImageAndTimer = function () {
  selectSpell(Math.trunc(Math.random() * spells.length));
  spellIcon.src = getWoWImage(selectedSpell.iconCode);
  setCurrentBlurValue(blurMax);
  setcurrentTimerValue(timeLimit);
  populateAnswerButtons(selectedSpell.answers);
};

//each second the interval is called and adjusts the timer and image blur based on the time. called every second and resets when the timer hits 0 choosing a new image
const chooseNewIcon = setInterval(function () {
  if (timeInSeconds <= 0) {
    resetImageAndTimer();
    setCurrentCombo(minCombo);
  }
  setcurrentTimerValue(timeInSeconds - 1);
  setCurrentBlurValue(currentBlur - blurMax / (timeInSeconds * blurDelta));
}, 1000);

init();

//Commenting game logic here to make into problem breakdown
//and flow chart later

//vertical slice:

//---- DONE ----
//Loads a default spell from the database to guess (start with 10 spells)
//Timer is visible above the bar and ticking down
//Spell Icon becomes less blurry and larger as timer decreases

//---- TO DO----
//if correct guess is submitted, score is incremented by a value based on timer (100 x timer for now)
//if not timer expires no score given
//in both cases new image is generated size & bluriness reset
//ensure image can't be chosen twice/repeat indexes

//remember to add button click events the nomenclature is
// btnVariabel.addEventListener('clicl', function() {});
// The function can be a literal or be an expression as well as inline

//need to know how to do an animated timer bar or basic countdown
//spell names etc. found here https://docs.google.com/spreadsheets/d/1qBMJrm5sK-VjUSZ0tqXp_LS8OXgWGUJLoPeFcDPTgLs/edit#gid=827207887 for now

//Full game
//start menu and score tracking for user
//getting a combo is displayed and adds a bonus to score

//Bonus points
//allow users to choose spell eras (classic only, classic <-> wrath etc.)
//leaderboards?
//actually have it hosted rather than local hosted app
//animations for scoring etc.
