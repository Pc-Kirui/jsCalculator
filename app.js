"use strict";

// Variables for each of the calculator operation
let firstNum = "";
let secondNum = "";
let operator = "";
// let equalOp = "";
// const operators = "+-*%/";

// Getting elements using value/parameters from HTML
//Display elements
const currentScreen = document.querySelector(".current");
const previousScreen = document.querySelector(".previous");

// Numbers and operations("+","-","*","/","%")
const numbers = document.querySelectorAll(".numbers");
const operations = document.querySelectorAll(".operations");
const equal = document.querySelector(".equal");
const decimalPoint = document.querySelector(".dec-point");
// console.log(equal);

//Printing the numbers on the console
numbers.forEach((number) =>
  number.addEventListener("click", function (e) {
    displayNumber(e.target.textContent);
    currentScreen.textContent = firstNum;
  })
);

//Printing the operator on the console
operations.forEach((op) => {
  op.addEventListener("click", function (e) {
    const operation = e.target.textContent;
    handleOperand(operation);
    if (operation === "AC") {
      firstNum = "";
      secondNum = "";
      currentScreen.textContent = secondNum;
      previousScreen.textContent = firstNum;
    } else if (operation === "DEL") {
      currentScreen.textContent = currentScreen.textContent
        .toString()
        .slice(0, -1);
    } else if (operation === "=") {
      //Handling the equal operator
      op.addEventListener("click", function (eq) {
        if (firstNum && operator && secondNum) {
          let ans = operate(firstNum, secondNum, operator);
          ans = roundNum(ans);
          previousScreen.textContent = "";
          currentScreen.textContent = ans;
        }
      });
    } else {
      previousScreen.textContent = secondNum + "" + operator;
      currentScreen.textContent = firstNum;
    }
  });
});

//Handling the decimal point
decimalPoint.addEventListener("click", function (e) {
  addDecimal(e.target.textContent);
});

function displayNumber(num) {
  if (firstNum.length <= 9) {
    firstNum += num;
  }
}

function handleOperand(operand) {
  operator = operand;
  secondNum = firstNum;
  firstNum = "";
}

function addDecimal(dec) {
  if (!firstNum.includes(dec)) {
    firstNum += dec;
    currentScreen.textContent = firstNum;
  }
}

function roundNum(num) {
  return Math.round(num * 1000000) / 1000000;
}

//Displaying operations

// operations.forEach((operation) =>
//   operation.addEventListener("click", function (e) {
//     const op = e.target.textContent;
//     if (op === "AC") {
//       currentScreen.textContent = "";
//       operator = firstNum = secondNum = equalOp = "";
//     } else if (op === "DEL") {
//       currentScreen.textContent = currentScreen.textContent.substring(
//         0,
//         currentScreen.textContent.length - 1
//       );
//     } else {
//       displayOperation(op);
//       operator += op;
//     }
//   })
// );

// equal.addEventListener("click", function (e) {
//   displayEqual(e.target.textContent);
// });

// function displayNumber(num) {
//   if (operator.length === 0) {
//     if (firstNum.includes(".") && num === ".") return;
//     firstNum += num;
//     currentScreen.textContent += num;
//   } else {
//     if (secondNum.includes(".") && num === ".") return;
//     secondNum += num;
//     currentScreen.textContent += num;
//   }
// }

// function displayOperation(op) {
//   if (operator.length === 0) {
//     currentScreen.textContent += ` ${op} `;
//   } else {
//     if (!operators.includes(currentScreen.textContent[-1])) {
//       const ans = operate(
//         Number(firstNum),
//         Number(secondNum),
//         operator.slice(-1)
//       );
//       currentScreen.textContent = ans;
//       firstNum = ans;
//       secondNum = "";
//       currentScreen.textContent += ` ${op} `;

//       //   operator = operator[-1];
//     }
//   }
// }

// function displayEqual(eq) {
//   if (equalOp.length === 0) {
//     if (secondNum === "") {
//       currentScreen.textContent = firstNum;
//       equalOp = "";
//       return;
//     }
//     if (firstNum !== "") {
//       equalOp += eq;
//       currentScreen.textContent += equalOp;

//       const ans = operate(
//         Number(firstNum),
//         Number(secondNum),
//         operator.slice(-1)
//       );
//       currentScreen.textContent = ans;
//       equalOp = "";
//     }
//   }
// }

//Calculator functions for the basic math operations
function add(firstNum, secondNum) {
  return (secondNum += firstNum);
}

function subtract(firstNum, secondNum) {
  return (secondNum -= firstNum);
}

function multiply(firstNum, secondNum) {
  return (secondNum *= firstNum);
}

function modulo(firstNum, secondNum) {
  return (secondNum %= firstNum);
}

function divide(firstNum, secondNum) {
  if (firstNum === 0) {
    return "Invalid Operation!";
  }
  return (secondNum /= firstNum);
}

// Function operate - call functions for the basic math operations
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

    case "/":
      return divide(firstNum, secondNum);

    case "%":
      return modulo(firstNum, secondNum);

    default:
      return "Enter valid numbers";
  }
}
