const findTheOldest = function(people) {

    let oldest = undefined 
    let oldest_age = 0
    let currentOldestAge = 0

    for (let i = 0; i < people.length; i++){

        let person = people[i]

        //
        let birthYear = person.yearOfBirth


        //no death date
        if (person.yearOfDeath === undefined){
            let age = 2023 - birthYear

            if (age > oldest_age){
                oldest = person
                oldest_age = age 
            }

        }

        //with death date

        if (person.yearOfDeath){
            let age = person.yearOfDeath - birthYear

            if (age > oldest_age){
                oldest = person
                oldest_age = age 
            }
        }

    }

    return oldest 

};

// Do not edit below this line
module.exports = findTheOldest;
