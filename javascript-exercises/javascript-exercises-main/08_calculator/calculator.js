const add = function(num1,num2) {

  return num1 + num2
	
};

const subtract = function(num1,num2) {

  return num1 - num2
	
};

const sum = function(numArray) {
  let sum = 0

  for (let i = 0; i < numArray.length; i++){

    sum += numArray[i]

  }

  return sum 
	
};

const multiply = function(...args) {

  let product = 1

  for (let i = 0; i < args.length; i++){

    product *= args[i]


  }
  
  
  return product



};

const power = function(num1, num2) {

  return num1**num2
	
};

const factorial = function(num) {

  let factorial = 1

  for (let i = 1; i <= num; i++){

    factorial *= i
  }
  
  return factorial

    
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
