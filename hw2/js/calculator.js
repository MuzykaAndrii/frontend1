"use strict";

let focusedField = null;

window.onload = function () {
    const number1 = document.getElementById("firstNum");
    const number2 = document.getElementById("secondNum");
    const operation = document.getElementById("operation");
    const calcBtn = document.getElementById("calcBtn");
    const fields = document.querySelectorAll(".field");
    const calculatorButtons = document.querySelectorAll(".calc-btn");

    listenFields(fields);
    listenCalculatorButtons(calculatorButtons);


    calcBtn.addEventListener("click", function (e) {
        const num1 = Number.parseFloat(number1.value);
        const num2 = Number.parseFloat(number2.value);

        try {
            validateNumbers(num1, num2);
        } catch (e) {
            alert(e);
            return;
        }


        try {
            let result = calc(num1, num2, operation.value);
            alert(`Result is: ${result}`)
        } catch (e) {
            alert(e);
        }
    });
};

// keyboard logic
function listenFields(fields) {
    fields.forEach((field) => {
        field.addEventListener("focus", function () {
            focusedField = field;
        });
    });
}

function listenCalculatorButtons(btns) {
    btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            if (!focusedField) {
                return;
            }

            focusedField.value += btn.innerText;
        });
    });
}


// calc logic
function validateNumbers(...numbers) {
    numbers.forEach(function (number) {
        if (number === undefined || number === null || isNaN(number)) {
            throw "Invalid number";
        }
    });
}


function calc(num1, num2, operation) {
    switch (operation) {
        case "+":
            return num1 + num2;

        case "-":
            return num1 - num2;

        case "*":
            return num1 * num2;

        case "/":
            if (num2 === 0) {
                throw "Division by zero not allowed";
            }
            return num1 / num2;

        default:
            throw "Invalid operation";
    };
}