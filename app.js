"use strict";

let firstNum = "";
let secondNum = "";
let operator = "";
const allOperators = "+-*/%";
let isEval = false; //Handling result when "=" is pressed

//Getting elements from HTML using value/parameters
//Display elements
const currentScreen = document.querySelector(".current");
const previousScreen = document.querySelector(".previous");

//Getting calculator keys
const calcNumbers = document.querySelectorAll(".numbers");
const calcOperators = document.querySelectorAll(".operations");

//Displaying calc-keys on calc-screen/console
calcNumbers.forEach((number) =>
  number.addEventListener("click", function (e) {
    const keyNum = e.target.textContent;
    displayNum(keyNum);
  })
);

calcOperators.forEach((op) =>
  op.addEventListener("click", function (e) {
    let keyOp = e.target.textContent;
    if (
      keyOp === "+" ||
      keyOp === "-" ||
      keyOp === "*" ||
      keyOp === "/" ||
      keyOp === "%"
    ) {
      displayOperator(keyOp);
    } else if (keyOp === "=") {
      if (!firstNum || !secondNum) return;
      currentScreen.textContent = operate(firstNum, secondNum, operator);
      isEval = true;
      previousScreen.textContent = "";
      secondNum = operator = "";
      firstNum = currentScreen.textContent;
    } else if (keyOp === "AC") {
      firstNum = "";
      secondNum = "";
      currentScreen.textContent = "";
      previousScreen.textContent = "";
      operator = "";
    } else {
      currentScreen.textContent = currentScreen.textContent
        .toString()
        .slice(0, -1);
    }
  })
);

function displayNum(num) {
  if (operator === "") {
    if (!isEval) {
      if (firstNum.includes(".") && num === ".") return;
      firstNum += num;
      currentScreen.textContent = firstNum;
    } else {
      firstNum = num;
      currentScreen.textContent = firstNum;
      isEval = false;
    }
  } else {
    if (secondNum.includes(".") && num === ".") return;
    secondNum += num;
    currentScreen.textContent = secondNum;
  }
}

function displayOperator(op) {
  const lastEntry = currentScreen.textContent.slice(-1);
  if (operator) {
    if (allOperators.includes(lastEntry)) {
      return;
    } else {
      firstNum = operate(firstNum, secondNum, operator);
      operator = op;
      secondNum = "";
      previousScreen.textContent = firstNum + operator;
      currentScreen.textContent = "";
    }
  } else if (!operator) {
    operator = op;
    previousScreen.textContent = firstNum + operator;
    currentScreen.textContent = "";
  }
}

function addDecimal(dot) {
  if (!firstNum.includes(dot)) {
    firstNum += dot;
  }
}

//Basic math operations functions
function add(firstNum, secondNum) {
  return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
  return firstNum * secondNum;
}

function modulo(firstNum, secondNum) {
  return firstNum % secondNum;
}

function divide(firstNum, secondNum) {
  if (secondNum === 0) {
    return "Infinity!";
  } else {
    return firstNum / secondNum;
  }
}

//Operate function
function operate(firstNum, secondNum, operator) {
  firstNum = parseFloat(firstNum);
  secondNum = parseFloat(secondNum);

  switch (operator) {
    case "+":
      return add(firstNum, secondNum);

    case "-":
      return subtract(firstNum, secondNum);

    case "*":
      return multiply(firstNum, secondNum);

    case "%":
      return modulo(firstNum, secondNum);

    case "/":
      return divide(firstNum, secondNum);

    default:
      return "Invalid Operation!";
  }
}
