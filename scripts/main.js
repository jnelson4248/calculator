
/**
  *   Global Variables and Event Listeners
  */

let curNumber = ["0"];
let curNumberNonNegative = true;
let numDisplay = "0";
let numFirst = null;
let numSecond = null;
let numSolution = [];
let numSolutionNonNegative = true;
let nextOperation = null;
// Indicates solution value is being used as first number of next operation
let useSolutionNextOperation = false;
// Idicates that user changed operation type before solving
let updateOperationOnly = false;
let showIconOperation = false;
let showIconEqual = false;
let powerOn = false;

const displayMain = document.getElementById('displayMain');
const displayIconOperation = document.getElementById('displayIconOperation');
const displayIconEqual = document.getElementById('displayIconEqual');

const keyPower = document.getElementById('keyPower');
keyPower.addEventListener('click', togglePower, false);

const keyReset = document.getElementById('keyReset');
keyReset.addEventListener('click', resetCalculator, false);

const keyClear = document.getElementById('keyClear');
keyClear.addEventListener('click', clearDisplay, false);

const keyDelete = document.getElementById('keyDelete');
keyDelete.addEventListener('click', removeLastDigit, false);

const keyDivide = document.getElementById('keyDivide');
keyDivide.addEventListener('click', () => {
  setNextOperation(keyDivide.dataset.keyName);
}, false);

const keyMultiply = document.getElementById('keyMultiply');
keyMultiply.addEventListener('click', () => {
  setNextOperation(keyMultiply.dataset.keyName);
}, false);

const keySubtract = document.getElementById('keySubtract');
keySubtract.addEventListener('click', () => {
  setNextOperation(keySubtract.dataset.keyName);
}, false);

const keyAdd = document.getElementById('keyAdd');
keyAdd.addEventListener('click', () => {
  setNextOperation(keyAdd.dataset.keyName);
}, false);

const keyEqual = document.getElementById('keyEqual');
keyEqual.addEventListener('click', () => {
  solve(keyEqual.dataset.keyName);
}, false);

const numPadKeyList = document.querySelectorAll('.key-numpad');
for (let i = 0; i < numPadKeyList.length; i++) {
  let key = numPadKeyList[i];
  key.addEventListener('click', (event) => {
    addCharacter(key.dataset.keyName);
  }, false);
}

window.addEventListener('keydown', runKeyCodeAction);




/**
  *   Functions
  */

// Handles keydown events for keyboard shortcuts.
// All keys have a code "a", but only some keys have codes "b" or "c"
// Codes "a" and "b" are all unique, but "c" are "shift" variations of "a" codes
function runKeyCodeAction(event) {
  const elementA = document.querySelector(`.key[data-key-code-a="${event.keyCode}"]`);
  const elementB = document.querySelector(`.key[data-key-code-b="${event.keyCode}"]`);
  const elementC = document.querySelector(`.key[data-key-code-c="${event.keyCode}"]`);
  let element = null;
  // must check C+shift first. Some code-c keys are same as code-b keys with shift
  if (elementC && event.shiftKey) {
    element = elementC;
  } else if (elementA || elementB) {
    element = (elementA) ? elementA : elementB;
  }
  // only run if the key pressed matches a "shortcut"
  if (element !== null) {
    let operatorKeyNames = ["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"]
    let elementKeyName = element.dataset.keyName;
    classes = element.classList;
    if (classes.contains('key-numpad')) {
      addCharacter(elementKeyName);
    } else if (operatorKeyNames.includes(elementKeyName)) {
      setNextOperation(elementKeyName);
    } else {
      switch (elementKeyName) {
        case "POWER":
          togglePower();
          break;
        case "RESET":
          resetCalculator();
          break;
        case "CLEAR":
          clearDisplay();
          break;
        case "DELETE":
          removeLastDigit();
          break;
        case "EQUAL":
          solve();
          break;
      }
    }
  }
}

// Updates the number currently being built, and adds it to the display
function addCharacter(keyName) {
    updateCurNumber(keyName);
    updateDisplayAll(numDisplay);
}

// Update the number currently being built by the user.
function updateCurNumber(newContent) {
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
}

// Changes sign of number currently being built by the user
function curNumberChangeSign() {
  if (curNumberToNumber() !== 0) {
    curNumberNonNegative = (curNumberNonNegative) ? false : true;
    setNumDisplay(curNumber, curNumberNonNegative);
  }
}

// Adds a decimal to the number currently being built by the user
function curNumberAppendDecimal() {
  if (!curNumber.includes(".")) {
    curNumber.push(".");
    setNumDisplay(curNumber, curNumberNonNegative);
  }
}

// Adds next string (character) to the number currently being built by the user
function curNumberAppendString(newString) {
  if ((curNumber.length === 1) && (curNumber[0] === "0")) {
    curNumber.pop();
    curNumber.push(newString);
  } else {
    curNumber.push(newString);
  }
  setNumDisplay(curNumber, curNumberNonNegative);
}

// sets the next operation to be performed (+ - * /)
function setNextOperation(operation) {
  // allow changing of operation type before solving.
  showIconEqual = false;
  if (!updateOperationOnly) {
    if (nextOperation !== null) {
      // If use operation key before pressing (=)
      solve();
      showIconEqual = true;
    }
    numFirst = curNumberToNumber();
    curNumber = ["0"];
    curNumberNonNegative = true;
    updateOperationOnly = true;
    // updateOperationOnly resets: end of solve(), and begin of updateCurNumber()
  }
  nextOperation = operation;
  showIconOperation = true;
  if (powerOn) {
    updateDisplayIcons();
  }
}

// solve and display the current equation.
// Posts error to screen for division by Zero.
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
      solution = numFirst * numSecond;
      break;
    case "DIVIDE":
      if (numSecond === 0) {
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
  if (divisionError === true) {
    resetGlobalVariables();
    updateDisplayAll("ERROR - DIVIDE BY 0");
  } else if (solutionFound === true) {
    numSolution = solution.toString().split("");
    setNumDisplay(numSolution, numSolutionNonNegative);
    showIconOperation = false;
    showIconEqual = true;
    updateDisplayAll(numDisplay);
    // store solution in case user wants to chain operations
    curNumber = numSolution;
    curNumberNonNegative = numSolutionNonNegative;
    numFirst = null;
    numSecond = null;
    nextOperation = null;
    // Assume user wants to use solution to chain operations (useSolutionNextOperation).
    // resets to "false" in updateCurNumber(), via resetCurNumberIfNotUsingSolution()
    useSolutionNextOperation = true;
    updateOperationOnly = false;
  }
}

// formats a number array (eg: curNumber) with commas for improved display
// The array must be string representations of numbers and decimals: eg: ["2", ".", "4"]
function setNumDisplay(numberArray, numberNonNegative) {
  let alteredNumber = numberArray.slice(0);
  let index = alteredNumber.indexOf(".");
  if (index < 0) {
    index = alteredNumber.length;
  }
  let count = 1;
  while (index > 3) {
    index -= 3;
    alteredNumber.splice(index, 0, ",");
    count ++;
  }
  if (!numberNonNegative) {
    alteredNumber.unshift("-");
  }
  numDisplay = alteredNumber.join("");
}

// Updates all displays (number and all icons)
function updateDisplayAll(content) {
  if (powerOn) {
    displayMain.textContent = content;
    updateDisplayIcons();
  }
}

// Update the Icons displayed for "equal" and the operations (+ - * /)
function updateDisplayIcons() {
  // set status of Operation Icon
  if (showIconOperation) {
    removeOperationKeyHighlightAll();
    highlightKey(nextOperation);
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
    removeOperationKeyHighlightAll();
    displayIconOperation.textContent = "";
  }
  // Set status of Equal Icon
  displayIconEqual.textContent = (showIconEqual) ? "=" : "";
}

// changes array curNumber into its numeric float equivalent.
// Removes trailing zeros, if after a decimal
function curNumberToNumber() {
  let curNumberString = curNumber.join("");
  let number = parseFloat(curNumberString);
  if (!curNumberNonNegative) {
    number *= -1;
  }
  return number;
}

// returns true if under the maxLength. Does not count (.) toward length
function curNumberUnderMaxLength() {
  let maxLength = 22;
  let strippedCurNumber = curNumber.filter(item => item !== ".");
  if (strippedCurNumber.length < maxLength) {
    return true;
  } else {
    alert("Maximum characters reached. No more digits can be added");
    return false;
  }
}

// removes last digit from the number currently being built by the user.
// Does not affect display after clicking an operator (+-*/) or (=)
function removeLastDigit() {
  if ((curNumber.length !== 1) || (curNumber[0] !== "0")) {
    // function in all cases except when curNumber is ["0"]
    if (!useSolutionNextOperation) {
      // prevent functioning after an operator: (+-*/) or (=)
      curNumber.pop();
      if (curNumber.length === 0) {
        curNumber = ["0"];
        curNumberNonNegative = true;
      } else if ((curNumber.length === 1) && (curNumber[0] === "0")) {
        // if curNumber reduced to ["0"], ensure does not show negative
        curNumberNonNegative = true;
      }
      setNumDisplay(curNumber, curNumberNonNegative);
      updateDisplayAll(numDisplay);
    }
  }
}

function resetCurNumberIfNotUsingSolution() {
  if (useSolutionNextOperation === true){
    curNumber = ["0"];
    curNumberNonNegative = true;
    useSolutionNextOperation = false;
  }
}

// Adds "hightlighted" class to keys
function highlightKey(dataKeyName) {
  if (powerOn) {
    let selectedKey = document.querySelector("[data-key-name=" +
        CSS.escape(dataKeyName) + "]");
    selectedKey.classList.add('highlighted');
  }
}

// clears "highlighted" class from all operation keys (+ - * / =)
function removeOperationKeyHighlightAll() {
  let highlightedKeys = document.querySelectorAll(".highlighted");
  [...highlightedKeys].forEach( item => {
    if (item.classList.contains('key-operator')) {
      item.classList.remove('highlighted');
    }
  });

}

// turns caluculator on and off
function togglePower() {
  if (powerOn) {
     numDisplay = "";
     showIconOperation = false;
     showIconEqual = false;
     updateDisplayAll(numDisplay);  // requires powerOn = true
     powerOn = false;
   } else {
     powerOn = true;
     resetCalculator();  // requires powerOn = true for updateDisplayAll()
   }
   displays = document.querySelectorAll('.display');
   [...displays].forEach( item => item.classList.toggle('display-off'));
}

// resets display to zero, but only affects numbers being currently built by user.
// does not clear any numbers or operations in memory (eg: numFirst, nextOperation)
function clearDisplay() {
  // Only clear screen if number was manually entered
  if (!useSolutionNextOperation) {
    curNumber = ["0"];
    curNumberNonNegative = true;
    setNumDisplay(curNumber, curNumberNonNegative);
    updateDisplayAll(numDisplay);
  }
}

// completely resets calculator to initial condition, but does not affect power
function resetCalculator() {
  resetGlobalVariables();
  setNumDisplay(curNumber, curNumberNonNegative);
  updateDisplayAll(numDisplay);
}

// does not reset powerOn
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
