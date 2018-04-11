

let numString = "0";
let numDisplay = "";
let numFirst = null;
let numSecond = null;
let numSolution = null;

const display = document.getElementById('display');
updateDisplay(numString);

const keyReset = document.getElementById('keyReset');
keyReset.addEventListener('click', resetCalculator, false);

const keyClear = document.getElementById('keyClear');
keyClear.addEventListener('click', clearDisplay, false);

const keyDivide = document.getElementById('keyDivide');
keyDivide.addEventListener('click', operation("DIVIDE"), false);

const keyMultiply = document.getElementById('keyMultiply');
keyMultiply.addEventListener('click', operation("MULTIPLY"), false);

const keySubtract = document.getElementById('keySubtract');
keySubtract.addEventListener('click', operation("SUBTRACT"), false);

const keyAdd = document.getElementById('keyAdd');
keyAdd.addEventListener('click', operation("ADD"), false);

const keyEqual = document.getElementById('keyEqual');
keyEqual.addEventListener('click', solve, false);

const containerKeys = document.getElementById('numberKeys');
containerKeys.addEventListener('click', addCharacter, false);


function addCharacter(e) {
  if (e.target !== e.currentTarget) {
    console.log("inside addCharacter");
    console.log("character clicked = " + e.target.dataset.key);
    updateNumString(e.target.dataset.key);
    // console.log("after updateNumString()");
    setNumDisplay();
    updateDisplay(numDisplay);
    // console.log("after updateDisplay()");
    e.stopPropagation();
    // console.log("end of addCharacter()");
  }
}

function numToString(number) {

}

function stringToNumber(string) {

}

function solve() {

}

function operation(operation) {
  // console.log("entered function operation");
  // console.log("operation received: " + testString);
  // console.log("end of operation");
  switch (operation) {
      case "ADD":

        break;
      case "SUBTRACT":

        break;
      case "MULTIPLY":

        break;
      case "DIVIDE":

        break;
      default:
        alert("No correct operation type was passed");
  }



}

function add() {

}

function subtract() {

}

function multiply() {

}

function divide() {

}


function updateNumString(newContent) {
  console.log("entered updateNumString - numString =        " + numString);
  console.log("entered updateNumString - numString length = " + numString.length);
  switch (newContent) {
    case "SIGN":
      numStringChangeSign();
      break;
    case ".":
      numStringAppendDecimal();
      break;
    default: // keys 0-9
    if (numStringUnderMaxLength()) {
      numStringAppendString(newContent);
    }
  }
  console.log("end of updateNumString - numString =        " + numString);
  console.log("end of updateNumString - numString length = " + numString.length);
}

function numStringChangeSign() {
  console.log("entered ChangeSign: parseFloat(numString) = " + parseFloat(numString))
  if (numString[0] == "-") {
    numString = numString.slice(1);
  } else if (parseFloat(numString) != 0) {
    numString = "-" + numString;
  }
}

function numStringAppendDecimal() {
  if (!numString.includes(".")) {
    numString += ".";
  }
}

function numStringAppendString(newString) {
  if (numString === "0") {
    numString = newString;
  } else {
    numString += newString;
  }
}

// returns true if under the maxLength. Does not count "." or "-" toward length
function numStringUnderMaxLength() {
  let maxLength = 10;
  let strippedString = numString;
  if (strippedString.includes(".")) {
    strippedString = removeSubStringAll(strippedString, ".");
  }
  if (strippedString.includes("-")) {
    strippedString = removeSubStringAll(strippedString, "-");
  }
  if (strippedString.length < maxLength) {
    return true;
  } else {
    alert("Input length reached. I can't add any more digits :( ");
    return false;
  }
}


function updateDisplay(content) {
  display.textContent = content;
}

// formats numString with commas for improved display
function setNumDisplay() {
  console.log("---------------------------------------");
  console.log("Inside setNumDisplay");
  let alteredNumber = numString;
  console.log("Altered Number = " + alteredNumber);
  let index = 0;
  if (isNumStringNegative()) {
    console.log("numString negative ");
    alteredNumber = numString.slice(1);
  }
  console.log("after check negative, altered = " + alteredNumber);
  if (alteredNumber.includes(".")) {
    index = alteredNumber.indexOf(".");
    console.log("decimal exists")
  } else {
    index = alteredNumber.length;
    console.log("decimal: none");
  }
  console.log("index = " + index);
  let count = 1;
  while (index > 3) {
    console.log("Inside While loop - loop " + count);
    index -= 3;
    alteredNumber = insertStringAtPos(",", alteredNumber, index);
    count ++;
  }
  if (isNumStringNegative()) {
    alteredNumber = "-" + alteredNumber;
  }
  console.log("final alteredNumber = " + alteredNumber);
  console.log("---------------------------------------");
  numDisplay = alteredNumber;
}

function isNumStringNegative() {
  return (numString[0] === "-") ? true : false;
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

function resetCalculator() {

}

function clearDisplay() {
  numString = "0";
  setNumDisplay();
  updateDisplay(numDisplay);
}














//  OLD VERSION OF CODE

/*

function resetCalculator() {
  operation.firstNumber = null;
  operation.secondNumber = null;
  operation.curNumber = 0;
  operation.curNumString = "0";
  operation.decimalPosition = null;
  operation.operator = null;
  setDisplayContent(operation.curNumString);
}

function clearDisplay() {
  operation.curNumber = 0;
  operation.curNumString = "0";
  operation.decimalPosition = null;
  setDisplayContent(operation.curNumString);
}

function nextOperation(operation) {

}

function solveEquation() {

}

function addCharacter(e) {
  if (e.target !== e.currentTarget) {
    console.log("inside addCharacter");
    console.log("character clicked = " + e.target.dataset.key);
    console.log("Object before functions = ");
    console.table(operation);
    updateCurNumString(e.target.dataset.key);
    console.log("after updateCurNumString()");
    console.table(operation);
    updateCurNumber();
    console.log("after updateCurNumber()");
    console.table(operation);
    updateDisplay(operation.curNumber);
    console.log("after updateDisplay()");
    console.table(operation);
    e.stopPropagation();
    console.log("end of addCharacter()");
  }
}


// content and newContent must be strings
function updateCurNumString(newContent) {
  switch (newContent) {
    case "SIGN":
      // if current number is not zero, change the sign
      if (isNonZeroString(operation.curNumString)) {
        operation.curNumPositive = (operation.curNumPositive) ? false : true;
      }
      break;
    case ".":
      if (operation.decimalPosition == null) {
        operation.decimalPosition = operation.curNumString.length;
        console.log("trying to change decimalPosition to " + operation.curNumString.length);
      }
      break;
    case "0":
      if (operation.decimalPosition == null && operation.curNumString == "0") {
        // do nothing
      } else {
        operation.curNumString += newContent;
      }
      break;
    default: // keys 1-9
      if (operation.decimalPosition == null && operation.curNumString == "0") {
        operation.curNumString = newContent;
      } else {
        operation.curNumString += newContent;
      }
  }
}

// content must be a string with only numbers and at most one decimal
function updateCurNumber() {
  let newNumber = parseInt(operation.curNumString, 10);
  if (operation.decimalPosition != null) {
    newNumber *= (10 * operation.decimalPosition)
  }
  if (!operation.curNumPositive) {
    newNumber *= -1;
  }
  operation.curNumber = newNumber;
}

// formats a number with commas (if necessary) and replaces on display element
function updateDisplay(number) {
  number = Math.abs(number);
  numberString = number.toString();
  let index = numberString.indexOf(".");
  if (index == -1) {
    index = numberString.length -1;
  }
  while (index > 2) {
    index -= 3;
    partOne = numberString.slice(0, index);
    partTwo = numberString.slice(index);
    numberString = partOne + "," + partTwo;
  }
  if (operation.curNumPositive == false) {
    numberString = "-" + numberString;
  }
  setDisplayContent(numberString);
}


function getDisplayContent() {
  return display.textContent;
}

function setDisplayContent(content) {
  display.textContent = content;
}

// content must be a string with only numbers and at most one decimal
// returns true if string represents a non-zero number (eg: "0.02")
// note: returns false if string contains letters (eg: "f012" or "0.30fg")
function isNonZeroString(content){
    return (parseFloat(content) != 0) ? true : false;
}

*/

///////////  TEMPORARY CODE AREA   ////////////////////////
/*
const testButton = document.getElementById('testButton');
testButton.addEventListener('click', showElement(display), false);

function showElement(element) {
  console.log("Displaying element:");
  console.log(element);
function isNonZeroString(content){

}

  console.log("text content =");
  console.log(element.textContent);
  console.log("Done displaying element");
}
*/

///////////////////String///////////////////////////////////////////

/*
const container = document.getElementById('numberKeys');
container.addEventListener('click', numberClick, false);
    if (decimalPosition != null) {
    decimalPosition = curNumString
function numberClick(e) {
  console.log("clicked a number - target Info:");
  console.log(e.target);
  let x = e.target.dataset.key;
  console.log(typeof x);
  console.log(x);
  console.log("data-value as string = " + x);
  let xNum = 1000;
  console.log(Number.isNaN(x));
  if (!Number.isNaN(x)) {
    xNum = parseInt(x);
  }
  console.log("multiply by 3 = " + (xNum*3));
}
*/
