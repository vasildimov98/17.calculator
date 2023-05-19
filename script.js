const calcButtonsContainer = document.querySelector(".calculator-buttons");
const calcDisplay = document.querySelector(".calculator-display h1");

// global variables
let hasDecimal = false;
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// Calculate depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "=": (_, secondNumber) => secondNumber,
};

// When user clicks on a button, display the value of the button on the display
function displayUserDecision(event) {
  const button = event.target;
  // If the user clicks on a button that is not a button,
  // or a clear button, or a decimal point, return
  if (!button.matches("button")) {
    return;
  }

  if (button.classList.contains("clear")) {
    resetAll();
    return;
  }

  if (button.value === ".") {
    displayDecimalSign();
    return;
  }

  if (button.classList.contains("operator")) {
    useOperator(button.value);
    return;
  }

  displayNumber(button.value);
}

// Show operator and save it for later
function useOperator(operator) {
  const currentValue = Number(calcDisplay.textContent);

  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    console.log(
      `Calculation: ${firstValue} ${operatorValue} ${currentValue} = ${calculation}`
    );
    calcDisplay.textContent = calculation;
    firstValue = calculation;
  }

  // Ready for the next value
  awaitingNextValue = true;

  operatorValue = operator;

  console.log(`First value: ${firstValue}`);
  console.log(`Operator: ${operator}`);
}

// Show number on the calc
function displayNumber(number) {
  //  Check if we are awaiting next value
  if (awaitingNextValue) {
    calcDisplay.textContent = number;
    awaitingNextValue = false;
    hasDecimal = false;
    return;
  }

  // Check if zero, than display number or display curr number + number
  calcDisplay.textContent =
    calcDisplay.textContent === "0"
      ? number
      : (calcDisplay.textContent += number);
}

// Add a decimal point to the display
function displayDecimalSign() {
  if (hasDecimal || awaitingNextValue) {
    return;
  }

  calcDisplay.textContent = calcDisplay.textContent + ".";
  hasDecimal = true;
}

// Reset all when user clicks on reset btn
function resetAll() {
  calcDisplay.textContent = "0";
  hasDecimal = false;
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
}

// Event listener
calcButtonsContainer.addEventListener("click", displayUserDecision);
