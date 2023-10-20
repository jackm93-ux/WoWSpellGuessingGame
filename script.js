'use strict';

const spellIcon = document.getElementById('spellIcon');
const timer = document.querySelector('.timer');

let timeInSeconds = 10;
let timeLimit = 10;

//measured in px
let blurMax = 15;
let currentBlur = 15;
let blurDelta = 3.5;

const iconCodes = [
  'spell_nature_chainlightning',
  'spell_holy_purify',
  'ability_criticalstrike',
  'spell_holy_powerwordshield',
  'spell_frost_freezingbreath',
  'spell_nature_lightning',
  'ability_shockwave',
  'spell_fire_fireball02',
  'spell_shadow_possession',
  'spell_fire_incinerate',
];

const getWoWImage = function (iconCode) {
  return `https://wow.zamimg.com/images/wow/icons/large/${iconCode}.jpg`;
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
  spellIcon.src = getWoWImage(
    iconCodes[Math.trunc(Math.random() * iconCodes.length)]
  );
  setCurrentBlurValue(1);
  setcurrentTimerValue(timeLimit);
};

spellIcon.src = getWoWImage(iconCodes[0]);

//each second the interval is called and adjusts the timer and image blur based on the time. called every second and resets when the timer hits 0 choosing a new image
const chooseNewIcon = setInterval(function () {
  if (timeInSeconds <= 0) {
    resetImageAndTimer();
  }
  setcurrentTimerValue(timeInSeconds - 1);
  setCurrentBlurValue(currentBlur - blurMax / (timeInSeconds * blurDelta));
}, 1000);

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
