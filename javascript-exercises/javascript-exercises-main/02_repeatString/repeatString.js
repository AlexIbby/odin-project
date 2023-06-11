const repeatString = function(word, number) {

    if (number < 0){
        return 'ERROR'
    }


    let newString = ""
    for (let i = 0; i < number; i++){
        newString += word 
    }

    return newString

};

// Do not edit below this line
module.exports = repeatString;
