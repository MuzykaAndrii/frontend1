"use strict";

window.onload = function () {
    let number1 = document.getElementById("firstNum");
    let number2 = document.getElementById("secondNum");
    let operation = document.getElementById("operation");
    let calcBtn = document.getElementById("calcBtn");

    calcBtn.addEventListener("click", function (e) {
        let num1 = Number.parseFloat(number1.value);
        let num2 = Number.parseFloat(number2.value);

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