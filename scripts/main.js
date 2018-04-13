


let curNumber = ["0"];
let curNumberNonNegative = true;
let numDisplay = "0";
let numFirst = null;
let numSecond = null;
let numSolution = [];
let numSolutionNonNegative = true;
let nextOperation = null;
let useSolutionNextOperation = false;
let updateOperationOnly = false;
let showIconOperation = false;
let showIconEqual = false;

const displayMain = document.getElementById('displayMain');
const displayIconOperation = document.getElementById('displayIconOperation');
const displayIconEqual = document.getElementById('displayIconEqual');

const keyReset = document.getElementById('keyReset');
keyReset.addEventListener('click', resetCalculator, false);

const keyClear = document.getElementById('keyClear');
keyClear.addEventListener('click', clearDisplay, false);

const keyDelete = document.getElementById('keyDelete');
keyDelete.addEventListener('click', removeLastDigit, false);

const keyDivide = document.getElementById('keyDivide');
keyDivide.addEventListener('click', setNextOperation, false);

const keyMultiply = document.getElementById('keyMultiply');
keyMultiply.addEventListener('click', setNextOperation, false);

const keySubtract = document.getElementById('keySubtract');
keySubtract.addEventListener('click', setNextOperation, false);

const keyAdd = document.getElementById('keyAdd');
keyAdd.addEventListener('click', setNextOperation, false);

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
    console.log("after updateCurNumber()");
    updateDisplayAll(numDisplay);
    console.log("after updateDisplayAll()");
    e.stopPropagation();
    console.log("end of addCharacter()");
  }
}

// clicking (.) or (0-9) resets the curNumber to ["0"] to exit the situation
// where you are continuing operations from a previous solution.  "changeSign"
// is allowed on a previous solution, when continuing on with it, but using
// "changeSign" on a solution, followed by either (.) or (0-9) will still
// reset curNumber.
function updateCurNumber(newContent) {
  console.log("entered updateCurNumber():")
  console.log(curNumber);
  showIconEqual = false;
  switch (newContent) {
    case "SIGN":
      curNumberChangeSign();
      break;
    case ".":
      updateOperationOnly = false; // enable solve() block in setNextOperation()
      resetCurNumberIfNotUsingSolution();
      curNumberAppendDecimal();
      break;
    default: // keys 0-9
      updateOperationOnly = false; // enable solve() block in setNextOperation()
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

function setNextOperation(e) {
  let operation = e.target.dataset.key;
  console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
  console.log("entered setNextOperation");
  // allow changing of operation type before solving.
  showIconEqual = false;
  if (!updateOperationOnly) {
    if (nextOperation != null) {
      // If use operation key before pressing (=)
      console.log("nextOperation NOT null");
      solve();
      showIconEqual = true;
    }
    numFirst = curNumberToNumber();
    curNumber = ["0"];
    curNumberNonNegative = true;
    console.log("numFirst = " + numFirst);
    updateOperationOnly = true;
    // updateOperationOnly resets: end of solve(), and begin of updateCurNumber()
  }
  nextOperation = operation;
  console.log("nextOperation = " + nextOperation);
  showIconOperation = true;
  console.log("showIconOperation = " + showIconOperation);
  console.log("showIconEqual = " + showIconEqual);

  updateDisplayIcons();
  console.log("end of setNextOperation");
  console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
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
      // do nothing if (=) clicked before clicking (=-*/)
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
    updateDisplayAll("ERROR - DIVIDE BY 0");
  } else if (solutionFound == true) {
    numSolution = solution.toString().split("");
    setNumDisplay(numSolution, numSolutionNonNegative);
    showIconOperation = false;
    showIconEqual = true;
    updateDisplayAll(numDisplay);
    curNumber = numSolution;
    curNumberNonNegative = numSolutionNonNegative;
    numFirst = null;
    numSecond = null;
    nextOperation = null;
    // set useSolution.. to "true" - resets to "false" if user clicks (=) or (0-9)
    useSolutionNextOperation = true;
    updateOperationOnly = false;
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

function updateDisplayAll(content) {
  displayMain.textContent = content;
  updateDisplayIcons();
}

function updateDisplayIcons() {
  // set status of Operation Icon
  if (showIconOperation) {
    switch (nextOperation) {
      case "ADD":
        displayIconOperation.textContent = "+";
        break;
      case "SUBTRACT":
        displayIconOperation.textContent = "-";
        break;
      case "MULTIPLY":
        displayIconOperation.textContent = "*";
        break;
      case "DIVIDE":
        displayIconOperation.textContent = "/";
        break;
      default:
        displayIconOperation.textContent = "E";
    }
  } else {
    displayIconOperation.textContent = "";
  }
  // Set status of Equal Icon
  displayIconEqual.textContent = (showIconEqual) ? "=" : "";
}

// returns true if under the maxLength. Does not count (.) toward length
function curNumberUnderMaxLength() {
  let maxLength = 25;
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

// removes last digit from the number currently being entered.
// Does not affect display after clicking an operator (+-*/) or (=)
function removeLastDigit() {
  console.log("useSolution = " + useSolutionNextOperation);
  if ((!curNumber.length == 1) || (!curNumber[0] == "0")) {
    // function in all cases except when curNumber is ["0"]
    if (useSolutionNextOperation == false) {
      // prevent functioning after an operator: (+-*/) or (=)
      console.log("remove: curNubmer before pop:");
      console.log(curNumber);
      curNumber.pop();
      console.log("remove: curNubmer after pop:");
      console.log(curNumber);
      console.log("curNumber length = " + curNumber.length);
      if (curNumber.length == 0) {
        console.log("reset curNumber in IF block");
        curNumber = ["0"];
        curNumberNonNegative = true;
      } else if ((curNumber.length == 1) && (curNumber[0] == "0")) {
        // if curNumber reduced to ["0"], ensure no negative
        curNumberNonNegative = true;
      }
      setNumDisplay(curNumber, curNumberNonNegative);
      updateDisplayAll(numDisplay);
    }
  }
}

function resetCalculator() {
  resetGlobalVariables();
  setNumDisplay(curNumber, curNumberNonNegative);
  updateDisplayAll(numDisplay);
}

function clearDisplay() {
  curNumber = ["0"];
  curNumberNonNegative = true;
  setNumDisplay(curNumber, curNumberNonNegative);
  updateDisplayAll(numDisplay);
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
  updateOperationOnly = false;
  showIconOperation = false;
  showIconEqual = false;
}
