

let curNumber = ["0"];
let curNumberPositive = true;
let numDisplay = "";
let numFirst = null;
let numSecond = null;
let numSolution = null;

const display = document.getElementById('display');

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
    updateCurNumber(e.target.dataset.key);
    // console.log("after updateCurNumber()");
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
  curNumberPositive = (curNumberPositive) ? false : true;
}

function curNumberAppendDecimal() {
  if (!curNumber.includes(".")) {
    curNumber.push(".");
  }
}

function curNumberAppendString(newString) {
  if ((curNumber.length == 1) && (curNumber[0] == "0")) {
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

// formats curNumber with commas for improved display
function setNumDisplay() {
  console.log("---------------------------------------");
  console.log("Inside setNumDisplay");
  let alteredNumber = curNumber.slice(0);
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
  if (!curNumberPositive) {
    alteredNumber.unshift("-");
  }
  console.log("final alteredNumber:");
  console.log(alteredNumber);
  console.log("---------------------------------------");
  numDisplay = alteredNumber.join("");
}


function resetCalculator() {
  curNumber = ["0"];
  curNumberPositive = true;
  numDisplay = "";
  numFirst = null;
  numSecond = null;
  numSolution = null;
  setNumDisplay();
  updateDisplay(numDisplay);
}

function clearDisplay() {
  curNumber = ["0"];
  setNumDisplay();
  updateDisplay(numDisplay);
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
