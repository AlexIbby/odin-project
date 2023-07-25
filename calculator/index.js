/**
 * -------------------------------------------------------------------
 *                             Declare variables 
 -------------------------------------------------------------------
 */

//Number Screen and Clearing
let numberScreen = document.getElementById("numbers-screen")
clearScreen()

//Calculator Number Buttons

let numberButtons = document.getElementsByClassName('calc-button');

let operatorButtons = document.getElementsByClassName('operator-button')


//AC Button
let acButton = document.getElementById("ac-button")

//PlusMinus Button
let plusMinus = document.getElementById("plus-minus")

//Percent Button
let percentButton = document.getElementById("percent-button")

//Decimal button
let decimalButton = document.getElementById("decimal-button")

//Number variables
let operatorUsed = null 

//Numbers
let number1 = null
let number2 = null 

//I made this boolean flag to help with the plus minus function between operators, maybe a good approach, maybe not? Functionality is working. 
let newNumber = true 

/**
 * -------------------------------------------------------------------
 *                           Add Event Listeners 
 -------------------------------------------------------------------
 */

// Loop through all numbers buttons and add event listener to each
for(let i = 0; i < numberButtons.length; i++){
    numberButtons[i].addEventListener('click', numberClicked)
}

// Loop through all operator buttons and add event listener to each
for(let i = 0; i <operatorButtons.length; i++){
    operatorButtons[i].addEventListener('click', operate)
}

//AC event listener
acButton.addEventListener('click', acFunction)

//PlusMinus event listener
plusMinus.addEventListener('click', plusMinusFunction)

//Percent event listener 
percentButton.addEventListener('click', percentFunction)


// Decimal button event listener
decimalButton.addEventListener('click', decimalFunction);



/** --------------------------------------------------------------------
 *                          General App Functions
-------------------------------------------------------------------------
 */



//Clear Screen
function clearScreen(){
    numberScreen.textContent = 0
}

function numberClicked() {
    if (["A/C", "+/-", "%"].includes(this.innerText)) {
        return;
    }

    let clickedNumber = this.innerText;

    // Prevent multiple decimal points in a number
    if (clickedNumber === ".") {
        if (operatorUsed === null && number1 && number1.includes(".")) {
            return;
        } else if (operatorUsed !== null && number2 && number2.includes(".")) {
            return;
        }
    }

    if (newNumber){
        if(operatorUsed === null){
            number1 = clickedNumber;
            numberScreen.innerText = number1;
        } else{
            number2 = clickedNumber;
            numberScreen.innerText = number2;
        }
        newNumber = false;
    } else{
        if (operatorUsed === null) {
            number1 += clickedNumber;
            numberScreen.innerText = number1;
        } else {
            number2 += clickedNumber;
            numberScreen.innerText = number2;
        }
    }
}


/** --------------------------------------------------------------------
 *                              Operations
 -------------------------------------------------------------------------
 */

function operate() {
    // If both numbers are available
    if (number1 != null && number2 != null) {
        number1 = cleanNumber(number1);
        number2 = cleanNumber(number2);
        let result;

        // Perform the operation based on the operator
        if (operatorUsed === "add"){
            result = addNums();
        } else if (operatorUsed === "subtract"){
            result = subtractNums();
        } else if (operatorUsed === "divide"){
            result = divideNums();
        } else if (operatorUsed === "multiply"){
            result = multiplyNums();
        }

        numberScreen.textContent = result;  // Display the result
        number1 = result;  // Save the result for the next operation
        number2 = null;  // Clear number2 for the next operation
    }

    // Once the operation is performed (if possible), update the operator
    operatorUsed = this.id;
    newNumber = true;

    // If only one number is clicked
    if (number1 != null && number2 === null){
        number1 = cleanNumber(number1);
        console.log(number1);
    }
}

//Addition 
function addNums(){
    return parseFloat(number1) + parseFloat(number2);
}

//Subtraction 
function subtractNums(){
    return parseFloat(number1) - parseFloat(number2);
}

//Multiply
function multiplyNums(){
    return parseFloat(number1) * parseFloat(number2);
}

//Divide
function divideNums(){

    //get rid of zero division error
    if (parseFloat(number2) === 0){
        return "ERROR" 
    }

    return parseFloat(number1) / parseFloat(number2);
}



function cleanNumber(value) {
    return value;  // Simply return the number as is
}

function acFunction(){
    numberScreen.textContent = 0;
    number1 = null;
    number2 = null;
    newNumber = true;
    operatorUsed = null;
}

function plusMinusFunction() {
    let currentNumber;
    // Update either number1 or number2
    if (operatorUsed === null || number2 === null) {
        // If an operator hasn't been clicked yet, or number2 hasn't been entered, we're changing number1
        number1 = (-1 * parseFloat(number1)).toString();
        currentNumber = number1;
    } else {
        // Otherwise, we're changing number2
        number2 = (-1 * parseFloat(number2)).toString();
        currentNumber = number2;
    }
    
    numberScreen.textContent = parseFloat(currentNumber).toFixed(2);  // update the screen with 2 decimal precision
}


function percentFunction() {
    let currentNumber = Number(numberScreen.textContent);
    let percentage = currentNumber / 100;
    numberScreen.textContent = percentage; // Update the screen

    // Update either number1 or number2
    if (operatorUsed === null) {
        // If an operator hasn't been clicked yet, we're changing number1
        number1 = percentage.toString();
    } else {
        // Otherwise, we're changing number2
        number2 = percentage.toString();
    }
}

function decimalFunction() {
    if (newNumber) {
        // If a new number is started, add "0." to the screen and set newNumber to false
        numberScreen.textContent = "0.";
        newNumber = false;
        if (operatorUsed === null) {
            number1 = "0.";
        } else {
            number2 = "0.";
        }
    } else {
        // If a number is already in progress, check if it already contains a decimal point
        if (operatorUsed === null) {
            // For number1
            if (!number1) {
                number1 = "0.";
                numberScreen.textContent = number1;
            } else if (!number1.includes('.')) {
                // If no decimal point present, append "." to the number
                number1 += ".";
                numberScreen.textContent = number1;
            }
        } else {
            // For number2
            if (!number2) {
                number2 = "0.";
                numberScreen.textContent = number2;
            } else if (!number2.includes('.')) {
                // If no decimal point present, append "." to the number
                number2 += ".";
                numberScreen.textContent = number2;
            }
        }
    }
}

//