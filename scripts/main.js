

let curNumber = ["0"];
let curNumberPositive = true;
let numDisplay = "";
let numFirst = null;
let numSecond = null;
let numSolution = [];
let numSolutionPositive = true;
let nextOperation = null;

const display = document.getElementById('display');

const keyReset = document.getElementById('keyReset');
keyReset.addEventListener('click', resetCalculator, false);

const keyClear = document.getElementById('keyClear');
keyClear.addEventListener('click', clearDisplay, false);

const keyDivide = document.getElementById('keyDivide');
keyDivide.addEventListener('click', function() { setNextOperation("DIVIDE") }, false);

const keyMultiply = document.getElementById('keyMultiply');
keyMultiply.addEventListener('click', function() { setNextOperation("MULTIPLY") }, false);

const keySubtract = document.getElementById('keySubtract');
keySubtract.addEventListener('click', function() { setNextOperation("SUBTRACT") }, false);

const keyAdd = document.getElementById('keyAdd');
keyAdd.addEventListener('click', function() { setNextOperation("ADD") }, false);

const keyEqual = document.getElementById('keyEqual');
keyEqual.addEventListener('click', solve, false);

const containerKeys = document.getElementById('numberKeys');
containerKeys.addEventListener('click', addCharacter, false);


function addCharacter(e) {
  if (e.target !== e.currentTarget) {
    console.log("inside addCharacter");
    console.log("character clicked = " + e.target.dataset.key);
    //  avoid case in setNextOperation(): using previous solution as numFirst
    numSecond = null;
    updateCurNumber(e.target.dataset.key);
    // console.log("after updateCurNumber()");
    setNumDisplay(curNumber, curNumberPositive);
    updateDisplay(numDisplay);
    // console.log("after updateDisplay()");
    e.stopPropagation();
    // console.log("end of addCharacter()");
  }
}

function solve() {
  let solution = 0;
  numSecond = curNumberToNumber();
  switch (nextOperation) {
    case "ADD":
      solution = numFirst + numSecond;
      break;
    case "SUBTRACT":
      solution = numFirst - numSecond;
      break;
    case "MULTIPLY":
      solution = numFirst * numSecond;
      break;
    case "DIVIDE":
      solution = numFirst / numSecond;
      break;
    default:
    alert("No correct operation type was passed");
  }
  // cover both cases to ensure previous solutions are completely reset
  if (solution > 0) {
    numSolutionPositive = true;
  } else {
  numSolutionPositive = false;
  solution *= -1;    //numSolution is stored as a positive number
  }
  numSolution = solution.toString().split("");
  setNumDisplay(numSolution, numSolutionPositive);
  updateDisplay(numDisplay);

  curNumber = ["0"];
  curNumberPositive = true;
  numFirst = null;
  nextOperation = null;

}

function setNextOperation(operation) {
  console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
  console.log("entered setNextOperation");
  if (nextOperation != null) {
    // If use operation key before pressing =
    console.log("nextOperation NOT null");
    solve();
  }
  if ((numSecond != null) || (nextOperation != null)) {
  // If press operator directly after =, use solution as first number
    curNumber = numSolution;
    curNumberPositive = numSolutionPositive;
  }
  nextOperation = operation;
  console.log("nextOperation = " + nextOperation);
  numFirst = curNumberToNumber();
  console.log("numFirst = " + numFirst);
  curNumber = ["0"];
  curNumberPositive = true;
  console.log("end of setNextOperation");
  console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
}


// changes array curNumber into its numeric equivalent.
// Removes trailing zeros, if after a decimal
function curNumberToNumber() {
  let curNumberString = curNumber.join("");
  let number = parseFloat(curNumberString);
  if (!curNumberPositive) {
      number *= -1;
  }
  return number;
}


function updateCurNumber(newContent) {
  console.log("entered updateCurNumber:")
  console.log(curNumber);
  switch (newContent) {
    case "SIGN":
      curNumberChangeSign();
      break;
    case ".":
      curNumberAppendDecimal();
      break;
    default: // keys 0-9
    if (curNumberUnderMaxLength()) {
      curNumberAppendString(newContent);
    }
  }
  console.log("end of updateCurNumber - curNumber:");
  console.log(curNumber);
}

function curNumberChangeSign() {
  if (curNumberToNumber() != 0) {
    curNumberPositive = (curNumberPositive) ? false : true;
  }
}

function curNumberAppendDecimal() {
  if (!curNumber.includes(".")) {
    curNumber.push(".");
  }
}

function curNumberAppendString(newString) {
  if ((curNumber.length == 1) && (curNumber[0] == "0")) {
    console.log("______________________________________");
    console.log("curNumberAppendString:");
    console.log("curNumber: " + curNumber);

    curNumber.pop();
    console.log("ater pop: " + curNumber);
    curNumber.push(newString);
    console.log("after push: " + curNumber);
  } else {
    curNumber.push(newString);
    console.log("else: after push: " + curNumber);
    console.log("end appendstring");
  }
  console.log("______________________________________");
}

// returns true if under the maxLength. Does not count "." toward length
function curNumberUnderMaxLength() {
  let maxLength = 10;
  let strippedCurNumber = curNumber.filter(item => item !== ".");
  if (strippedCurNumber.length < maxLength) {
    return true;
  } else {
    alert("Input length reached. I can't add any more digits :( ");
    return false;
  }
}

function updateDisplay(content) {
  display.textContent = content;
}

// formats a number array (eg: curNumber) with commas for improved display
function setNumDisplay(numberArray, numberPositive) {
  console.log("---------------------------------------");
  console.log("Inside setNumDisplay");
  let alteredNumber = numberArray.slice(0);
  console.log("strippedCurNumber:");
  console.log(alteredNumber);
  let index = alteredNumber.indexOf(".");
  if (index < 0) {
    index = alteredNumber.length;
    console.log("decimal: none");
  }
  console.log("index = " + index);
  let count = 1;
  while (index > 3) {
    console.log("Inside While loop - loop " + count);
    index -= 3;
    alteredNumber.splice(index, 0, ",");
    count ++;
  }
  if (!numberPositive) {
    alteredNumber.unshift("-");
  }
  console.log("final alteredNumber:");
  console.log(alteredNumber);
  console.log("---------------------------------------");
  numDisplay = alteredNumber.join("");
}


function resetCalculator() {
  resetGlobalVariables();
  setNumDisplay(curNumber, curNumberPositive);
  updateDisplay(numDisplay);
}

function clearDisplay() {
  curNumber = ["0"];
  curNumberPositive = true;
  setNumDisplay(curNumber, curNumberPositive);
  updateDisplay(numDisplay);
}

function resetGlobalVariables() {
  let curNumber = ["0"];
  let curNumberPositive = true;
  let numDisplay = "";
  let numFirst = null;
  let numSecond = null;
  let numSolution = [];
  let numSolutionPositive = true;
  let nextOperation = null;
}




// FUNCTIONS NOT YET BEING USED

function removeLastDigit() {
  curNumber.pop();
}

function insertStringAtPos(subString, existingString, index) {
  let partOne = existingString.slice(0, index) + subString;
  let partTwo = existingString.slice(index);
  return partOne + partTwo;
}

// removes all occurences of a substring and returns resulting string
function removeSubStringAll(myString, subString) {
  while (myString.includes(subString)){
    let index = myString.indexOf(subString);
    let partOne = myString.slice(0, index);
    let partTwo = myString.slice(index + subString.length);
    myString = partOne + partTwo;
  }
  return myString
}
