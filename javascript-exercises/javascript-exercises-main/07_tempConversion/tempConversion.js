const convertToCelsius = function(temp) {

  temp = (temp - 32) * 5
  temp = temp/9
  temp = parseFloat(temp.toFixed(1))

  if (temp % 1 === 0){


    return Math.floor(temp)
  }

  return temp

};

const convertToFahrenheit = function(temp) {

    temp = (temp * 9/5) + 32
    temp = parseFloat(temp.toFixed(1))

    if (temp % 1 === 0){


      return Math.floor(temp)
    }
   
    return temp


};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
