const sumAll = function(num1, num2){
  
    //check errors
    if (typeof(num1)!== "number"){

        return 'ERROR'
    }

    if (typeof(num2)!== "number"){

        return 'ERROR'
    }

    if (num1 < 0){

        return 'ERROR'
    }

    if (num2 < 0){

        return 'ERROR'
    }

    if (num2 < num1){
        
        let x = num1
        let y = num2

        num1 = y
        num2 = x
    }

    
    let helperArray = []
  
    let newNum = num1
    while (newNum < (num2-1)){
      
      newNum += 1
      helperArray.push(newNum)
      
      
      };
    
    
    let newArray = [num1, num2, ...helperArray]
    
    let total = 0
    
    
    for (let i = 0; i<newArray.length; i++){
      
      
        total += newArray[i]
      }
      
    
    
    return total
  
  }

// Do not edit below this line
module.exports = sumAll;
