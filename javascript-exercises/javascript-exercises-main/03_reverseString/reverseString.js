const reverseString = function(str) {


    // reverse string by splitting into array
    //then reverse() method and then; 
    //joining again into string
    
    return str.split("").reverse().join("");

};

// Do not edit below this line
module.exports = reverseString;
