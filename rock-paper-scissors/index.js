let playerSelection = ""
let computerSelection = getComputerChoice()


let playerScore = 0
let computerScore = 0
let drawRounds = 0



//
let computerSelectionEl = document.getElementById("computer-selection")
let winnerBoxEl = document.getElementById("winner-box")

let rockEl = document.getElementById("rock")
let paperEl = document.getElementById("paper")
let scissorsEl = document.getElementById("scissors")
let pickAppears = document.getElementById("pic-appears")
let scores = document.getElementById("scores")



rockEl.addEventListener("dblclick", function(){

    computerSelection = getComputerChoice()

    let titleCaseSelectionPC = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)

    computerSelectionEl.innerText = `Computer Selected: ${titleCaseSelectionPC}`
    pickAppears.setAttribute("src", `images/${computerSelection}.jpg`);
    



    let result = playRound("rock", computerSelection)
    let titleCaseSelectionHuman = result.charAt(0).toUpperCase() + result.slice(1)
    winnerBoxEl.innerText = `The winner is: ${titleCaseSelectionHuman}!`
    updateScores()

});

paperEl.addEventListener("dblclick", function(){

    computerSelection = getComputerChoice()

    let titleCaseSelectionPC = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)

    computerSelectionEl.innerText = `Computer Selected:${titleCaseSelectionPC}`
    pickAppears.setAttribute("src", `images/${computerSelection}.jpg`);

    let result = playRound("paper", computerSelection)
    let titleCaseSelectionHuman = result.charAt(0).toUpperCase() + result.slice(1)
    winnerBoxEl.innerText = `The winner is: ${titleCaseSelectionHuman}!`
    updateScores()

});


scissorsEl.addEventListener("dblclick", function(){

    computerSelection = getComputerChoice()

    let titleCaseSelectionPC = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)

    computerSelectionEl.innerText = `Computer Selected:${titleCaseSelectionPC}`
    pickAppears.setAttribute("src", `images/${computerSelection}.jpg`);

    let result = playRound("scissors", computerSelection)
    let titleCaseSelectionHuman = result.charAt(0).toUpperCase() + result.slice(1)
    winnerBoxEl.innerText = `The winner is: ${titleCaseSelectionHuman}!`
    updateScores()

});




// Game Functions

// Get Computer Choice
function getComputerChoice(){

    let choices = ["rock", "paper", "scissors"]
    let randomIndex = Math.floor(Math.random() * 3);
    
    return choices[randomIndex]
}

//Play a Round
function playRound(playerSelection, computerSelection){

    let winner = undefined 

    //player rock
    if (playerSelection === "rock" && computerSelection === "rock"){
        winner = "draw"
        drawRounds +=1 
        return winner 

    }else if (playerSelection === "rock" && computerSelection === "paper"){

        winner = "computer"
        computerScore += 1
        return winner 

    }else if (playerSelection === "rock" && computerSelection === "scissors" ){

        winner = "player"
        playerScore += 1
        return winner 
    }


    //player paper
    if (playerSelection === "paper" && computerSelection === "rock"){
        winner = "player"
        playerScore +=1 
        return winner 

    }else if (playerSelection === "paper" && computerSelection === "paper"){

        winner = "draw"
        drawRounds += 1
        return winner 

    }else if (playerSelection === "paper" && computerSelection === "scissors" ){

        winner = "computer"
        computerScore += 1
        return winner 
    }



    //player scissors
    if (playerSelection === "scissors" && computerSelection === "rock"){
        winner = "computer"
        computerScore += 1
        return winner 

    }else if (playerSelection === "scissors" && computerSelection === "paper"){

        winner = "player"
        playerScore += 1 
        return winner 

    }else if (playerSelection === "scissors" && computerSelection === "scissors" ){

        winner = "draw"
        drawRounds += 1
        return winner 
    }

    //Computer Hands 


    //computer
    if (computerSelection === "rock" && playerSelection === "rock"){
        winner = "draw"
        drawRounds += 1
        return winner 

    }else if (computerSelection === "rock" && playerSelection === "paper"){

        winner = "player"
        playerScore += 1
        return winner 

    }else if (computerSelection === "rock" && playerSelection === "scissors" ){

        winner = "computer"
        computerScore += 1
        return winner 
    }

    //computer paper
    if (computerSelection === "paper" && playerSelection === "rock"){
        winner = "computer"
        computerScore += 1
        return winner 

    }else if (computerSelection === "paper" && playerSelection === "paper"){

        winner = "draw"
        drawRounds += 1
        return winner 

    }else if (computerSelection === "paper" && playerSelection === "scissors" ){

        winner = "player"
        playerScore += 1
        return winner 
    }

    //computer scissors
    if (computerSelection === "scissors" && playerSelection === "rock"){
        winner = "player"
        playerScore += 1
        return winner 

    }else if (computerSelection=== "scissors" && playerSelection === "paper"){

        winner = "computer"
        computerScore += 1
        return winner 

    }else if (computerSelection === "scissors" && playerSelection=== "scissors" ){

        winner = "draw"
        drawRounds += 1
        return winner 
    }

}
function updateScores(){

    scores.innerText = `Player Score: ${playerScore} Computer Score: ${computerScore} Draws: ${drawRounds}`

}
