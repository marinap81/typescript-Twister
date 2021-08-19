// Import stylesheets
import './style.css';
import { Colours } from './models/colours.enum';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum';
import { SpinRecord } from './models/spin';

// used to make the spinner spin
let spinnerCounter = 0;

// container for the spinner
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 0;

// used to keep track of the results of the spin
let selectedColour: string;
let selectedBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];

const colourDiv = document.getElementById('colourResult');

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);
  }
}

const bodyPartP = document.getElementById('bodyPartText');

// TODO see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];

// TODO (DONE) add eventlistners to buttons
const spinBtn = <HTMLButtonElement>document.getElementById('spin-btn');
//spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100));
spinBtn.addEventListener('click', () => spinBtnHandler(500, 100)); // STOP SLOW SPINNER!

// Create Arrays for both Colour and BodyParts so that they are easily access in functions

let colourArray = [];

for (let c in Colours) {
  if (!isNaN(Number(c))) {
    colourArray.push(Colours[c]);
  }
}

let bodyPartArray = [];

for (let c in BodyParts) {
  if (!isNaN(Number(c))) {
    bodyPartArray.push(BodyParts[c]);
  }
}

const historyHTML: HTMLElement = document.getElementById('historyTableBody');

function showHistory() {
  // Content will be the innerHTM for the tbody
  let content: string = '';
  // Start the counter at 1 
  let count: number = 1;

  // Loop through the history, 

  for (let c in spinHistoryArray) {
    content +=
      '<tr><td>' +
      count++ +
      '</td><td>' +
      spinHistoryArray[c].colour +
      '</td><td>' +
      spinHistoryArray[c].bodyPart +
      '</td></tr>';
  }

  // Finally, set the history element to contain the content built above

  historyHTML.innerHTML = content;
}

function spinBtnHandler(time: number, interval: number) {
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);

  // TODO (DONE) randomly select colour from array
  // TODO (DONE) randomly select bodyPart from array

  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
  createSpinResult();

  // Display the history, added to this function
  showHistory();
}

function createSpinResult() {
  // Use the colourArray and bodyPartArray to pick random index position in array

  const randColour = Math.floor(Math.random() * colourArray.length);
  let myColour = colourArray[randColour];

  const randBodyPart = Math.floor(Math.random() * bodyPartArray.length);
  let myBodyPart = bodyPartArray[randBodyPart];

  // Create a SpinRecord
  let spin: SpinRecord = new SpinRecord(myColour, myBodyPart);
  // Store this SpinRecord in the main history array
  spinHistoryArray.push(spin); //adding to array

  spinBtn.disabled = true;
}

// rotates between the colours in Colours.enum.
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor =
    coloursArray[spinnerCounter % coloursArray.length];

  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter % bodyPartsArray.length];
}

// stops spinner after time parameter, time in ms
function stopSpinners() {
  clearInterval(spinnerCycle);
  // TODO set colourDiv and bodyPartP to the randomly spun results

  spinBtn.disabled = false;
  addToHistory();
}

// TODO add the newly spun result to the history table
function addToHistory() {}

const statsButton: HTMLElement = document.getElementById('statsBtn');
statsButton.addEventListener('click', statsBtnHandler);

const statsResults: HTMLElement = document.getElementById('statsResults');

function statsBtnHandler() {
  // TODO set the statsResults div innerHTML to the amount and last spun number that the user has chosen
  // eg. Red LeftHand spun 10 times
  //     Red LeftHand last spun at num 23

  // Lookup current selected values
  let selectedBodyPart = bodySelect.value;
  let selectedColour = colorSelect.value;

  // create blank counters
  let cntMatched = 0;
  let lastFound = 0;

  cntMatched = getAmount(selectedColour, selectedBodyPart);
  lastFound = getLastSpun(selectedColour, selectedBodyPart);

  // create a the output string to show the results

  let content: string =
    '<div>' +
    selectedColour +
    ' ' +
    selectedBodyPart +
    ' spun ' +
    cntMatched +
    '</div>' +
    '<div>' +
    'Last Found at Row: ' +
    lastFound +
    '</div>';

  // Displays the results, and if not found it will show no spins recorded
  if (cntMatched == 0) {
    statsResults.innerHTML = 'No spins recorded';
  } else {
    statsResults.innerHTML = content;
  }
}
// TODO(DONE)returns amount of times the combination of selected of colour and body part have been spun
//Get Stats button works
function getAmount(selectedColour: string, selectedBodyPart: string): number {
  let cntMatched = 0;

  for (let c in spinHistoryArray) {
    if (
      spinHistoryArray[c].bodyPart.toString() == selectedBodyPart.toString() &&
      spinHistoryArray[c].colour.toString() == selectedColour.toString()
    ) {
      ++cntMatched;
    }
  }

  return cntMatched;
}

// TODO return the last num which the combination of selected of colour and body part have been spun
function getLastSpun(selectedColour: string, selectedBodyPart: string): number {
  let lastFound = 0;
  let position = 1;

  for (let c in spinHistoryArray) {
    if (
      spinHistoryArray[c].bodyPart.toString() == selectedBodyPart.toString() &&
      spinHistoryArray[c].colour.toString() == selectedColour.toString()
    ) {
      lastFound = position;
    }

    ++position;
  }

  return lastFound;
}

const colorSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('colourSelect')
);

const bodySelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('bodyPartSelect')
);

function init() {
  setSelect();
}

function setSelect() {
  // When page open, init calls this function.
  // it looks through all COlour and bodypart enums. These are then stored as options within the select element

  let count = 0;

  for (let c in Colours) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = c;
      count++;
      colorSelect.add(newOption);
    }
  }

  count = 0;

  for (let c in BodyParts) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = c;
      count++;
      bodySelect.add(newOption);
    }
  }
}

init();
