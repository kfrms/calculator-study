const btnValues = [
  "AC",
  "+/-",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];
const redSymbols = ["÷", "×", "-", "+", "="];
const coralSymbols = ["AC", "+/-", "%"];
const screen = document.getElementById("screen");

let A = 0;
let operator = null;
let B = null;

function cleanAll() {
  A = 0;
  operator = null;
  B = null;
}

for (let i = 0; i < btnValues.length; i++) {
  //add numbers + symbols to buttons
  let value = btnValues[i];
  let button = document.createElement("button");
  button.innerText = value;

  //button style
  if (value == "0") {
    button.style.width = "225px";
    button.style.gridColumn = "span 2";
  }

  if (redSymbols.includes(value)) {
    button.style.backgroundColor = "#E7625F";
  } else if (coralSymbols.includes(value)) {
    button.style.backgroundColor = "#F8AFA6";
    button.style.color = "#1C1C1C";
  }

  //operations
  button.addEventListener("click", function () {
    if (redSymbols.includes(value)) {
      if (value == "=") {
        if (A != null) {
          B = screen.value;
          let numA = Number(A);
          let numB = Number(B);

          if (operator == "÷") {
            screen.value = numA / numB;
          } else if (operator == "×") {
            screen.value = numA * numB;
          } else if (operator == "-") {
            screen.value = numA - numB;
          } else if (operator == "+") {
            screen.value = numA + numB;
          }
          cleanAll();
        }
      } else {
        operator = value;
        A = screen.value;
        screen.value = "";
      }
    } else if (coralSymbols.includes(value)) {
      if (value == "AC") {
        //clear all and go back to null
        cleanAll();
        screen.value = "";
      } else if (value == "+/-") {
        //change from positive to negative or negative to positive
        if (screen.value != "" && screen.value != "0") {
          if (screen.value[0] == "-") {
            screen.value = screen.value.slice(1);
          } else {
            screen.value = "-" + screen.value;
          }
        }
      } else if (value == "%") {
        //divide value by 100
        screen.value = Number(screen.value) / 100;
      }
    } else {
      if (value == ".") {
        //show dots only if no dots was input before
        if (screen.value != "" && !screen.value.includes(value)) {
          screen.value += value;
        }
      } else if (screen.value == "0") {
        //only show multiple zeros after another number was input before
        screen.value == value;
      } else {
        //show number
        screen.value += value;
      }
    }
  });

  //add buttons to calculator
  document.getElementById("digits").appendChild(button);
}
