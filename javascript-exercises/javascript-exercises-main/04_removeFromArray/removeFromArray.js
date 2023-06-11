const removeFromArray = function(array, ...args ) {

    let newArray = array.filter(checkIncludes);
    
    function checkIncludes(element){
      
       //for each array element, it checks if it is NOT in args array, meaning it can stay
       return !args.includes(element)
      }
      
     return newArray
 
 };
 


// Do not edit below this line
module.exports = removeFromArray;
