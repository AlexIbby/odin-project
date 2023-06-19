const fibonacci = function(num) {

    if (num < 1){
        return "OOPS"
    }

    num = parseInt(num)

    let newArray = [1, 1]
  
  
    for (let i = 0; newArray.length < num; i++){
      
      let newNumber = newArray[i] + newArray[i+1]
      
      newArray.push(newNumber)
      
      }
    
    let lastElement = newArray.slice(newArray.length - 1)[0]
    
    return lastElement
    

};


fibonacci(4)

// Do not edit below this line
module.exports = fibonacci;
