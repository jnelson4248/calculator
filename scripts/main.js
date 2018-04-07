

const operation = {
                    firstNumber: null,
                    secondNumber: null,
                    operator: null,
                    curNumber: 0,
                    curNumString: "",
                    curNumPositive: true,
                    decimalPosition: null
                  }

const display = document.getElementById('display');

const keyReset = document.getElementById('keyReset');
keyReset.addEventListener('click', resetCalculator, false);

const keyClear = document.getElementById('keyClear');
keyClear.addEventListener('click', clearDisplay, false);

const keyDivide = document.getElementById('keyDivide');
keyDivide.addEventListener('click', nextOperation("DIVIDE"), false);

const keyMultiply = document.getElementById('keyMultiply');
keyMultiply.addEventListener('click', nextOperation("MULTIPLY"), false);

const keySubtract = document.getElementById('keySubtract');
keySubtract.addEventListener('click', nextOperation("SUBTRACT"), false);

const keyAdd = document.getElementById('keyAdd');
keyAdd.addEventListener('click', nextOperation("ADD"), false);

const keyEqual = document.getElementById('keyEqual');
keyEqual.addEventListener('click', solveEquation, false);

const containerKeys = document.getElementById('numberKeys');
containerKeys.addEventListener('click', addCharacter, false);

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

// initialize calculator at screen load
resetCalculator();

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
