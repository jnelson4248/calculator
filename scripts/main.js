
let curNumber = ["0"];
let curNumberNonNegative = true;
let numDisplay = "0";
let numFirst = null;
let numSecond = null;
let numSolution = [];
let numSolutionNonNegative = true;
let nextOperation = null;
let useSolutionNextOperation = false;

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
    updateDisplay(numDisplay);
    // console.log("after updateDisplay()");
    e.stopPropagation();
    // console.log("end of addCharacter()");
  }
}

// clicking "." or "0-9" resets the curNumber to ["0"] to exit the situation
// where you are continuing operations from a previous solution.  "changeSign"
// is allowed on a previous solution, when continuing on with it, but using
// "changeSign" on a solution, followed by either "." or "0-9" will still
// reset curNumber.
function updateCurNumber(newContent) {
  console.log("entered updateCurNumber():")
  console.log(curNumber);
  switch (newContent) {
    case "SIGN":
      curNumberChangeSign();
      break;
    case ".":
      resetCurNumberIfNotUsingSolution();
      curNumberAppendDecimal();
      break;
    default: // keys 0-9
      resetCurNumberIfNotUsingSolution();
      if (curNumberUnderMaxLength()) {
      curNumberAppendString(newContent);
    }
  }
  console.log("end of updateCurNumber() - curNumber:");
  console.log(curNumber);
}

function curNumberChangeSign() {
  if (curNumberToNumber() != 0) {
    curNumberNonNegative = (curNumberNonNegative) ? false : true;
    setNumDisplay(curNumber, curNumberNonNegative);
  }
}

function curNumberAppendDecimal() {
  if (!curNumber.includes(".")) {
    curNumber.push(".");
    setNumDisplay(curNumber, curNumberNonNegative);
  }
}

function curNumberAppendString(newString) {
  if ((curNumber.length == 1) && (curNumber[0] == "0")) {
    console.log("______________________________________");
    console.log("curNumberAppendString():");
    console.log("curNumber: ");
    console.log(curNumber);


    curNumber.pop();
    console.log("curNumber after pop: ");
    console.log(curNumber);
    curNumber.push(newString);
    console.log("curNumber after push: ");
    console.log(curNumber);
  } else {
    curNumber.push(newString);
    console.log("else branch - curNumber after push: ");
    console.log(curNumber);
    console.log("end appendstring()");
  }
  setNumDisplay(curNumber, curNumberNonNegative);
  console.log("______________________________________");
}

function setNextOperation(operation) {
  // console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
  // console.log("entered setNextOperation");
  
  if (nextOperation != null) {
    // If use operation key before pressing =
    // console.log("nextOperation NOT null");
    solve();
  }
  nextOperation = operation;
  // console.log("nextOperation = " + nextOperation);
  numFirst = curNumberToNumber();
  curNumber = ["0"];
  curNumberNonNegative = true;
  // console.log("numFirst = " + numFirst);
  // console.log("end of setNextOperation");
  // console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
}

function solve() {
  let solution = 0;
  let divisionError = false;
  let solutionFound = true;
  numSecond = curNumberToNumber();
  switch (nextOperation) {
    case "ADD":
      solution = numFirst + numSecond;
      break;
    case "SUBTRACT":
      solution = numFirst - numSecond;
      break;
    case "MULTIPLY":
      console.log("Mutliply: 1st = " + numFirst);
      console.log("Mutliply: 2nd = " + numSecond);
      solution = numFirst * numSecond;
      break;
    case "DIVIDE":
      if (numSecond == 0) {
        divisionError = true;
      } else {
        solution = numFirst / numSecond;
      }
      break;
    default:
      // do nothing if "=" clicked before clicking "=-*\"
      solutionFound = false;
  }
  // cover both cases to ensure previous solutions are completely reset
  if (solution >= 0) {
    numSolutionNonNegative = true;
  } else {
    numSolutionNonNegative = false;
    solution *= -1;    //numSolution is stored as a positive number
  }
  // Catch "Divide by 0" error
  if (divisionError == true) {
    resetGlobalVariables();
    updateDisplay("ERROR - DIVIDE BY 0");
  } else if (solutionFound == true) {
    numSolution = solution.toString().split("");
    setNumDisplay(numSolution, numSolutionNonNegative);
    updateDisplay(numDisplay);
    curNumber = numSolution;
    curNumberNonNegative = numSolutionNonNegative;
    numFirst = null;
    numSecond = null;
    nextOperation = null;
    // set useSolution.. to "true" - resets to "false" if user clicks "." or "1-9"
    useSolutionNextOperation = true;
  }
}

// formats a number array (eg: curNumber) with commas for improved display
function setNumDisplay(numberArray, numberNonNegative) {
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
    console.log("Inside While loop: on loop " + count);
    index -= 3;
    alteredNumber.splice(index, 0, ",");
    count ++;
  }
  if (!numberNonNegative) {
    alteredNumber.unshift("-");
  }
  console.log("final alteredNumber:");
  console.log(alteredNumber);
  console.log("---------------------------------------");
  numDisplay = alteredNumber.join("");
}

function updateDisplay(content) {
  display.textContent = content;
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

function resetCurNumberIfNotUsingSolution() {
  if (useSolutionNextOperation == true){
    curNumber = ["0"];
    curNumberNonNegative = true;
    useSolutionNextOperation = false;
  }
}

// changes array curNumber into its numeric equivalent.
// Removes trailing zeros, if after a decimal
function curNumberToNumber() {
  let curNumberString = curNumber.join("");
  let number = parseFloat(curNumberString);
  if (!curNumberNonNegative) {
      number *= -1;
  }
  return number;
}

function resetCalculator() {
  resetGlobalVariables();
  setNumDisplay(curNumber, curNumberNonNegative);
  updateDisplay(numDisplay);
}

function clearDisplay() {
  curNumber = ["0"];
  curNumberNonNegative = true;
  setNumDisplay(curNumber, curNumberNonNegative);
  updateDisplay(numDisplay);
}

function resetGlobalVariables() {
  curNumber = ["0"];
  curNumberNonNegative = true;
  numDisplay = "0";
  numFirst = null;
  numSecond = null;
  numSolution = [];
  numSolutionNonNegative = true;
  nextOperation = null;
  useSolutionNextOperation = false;
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
