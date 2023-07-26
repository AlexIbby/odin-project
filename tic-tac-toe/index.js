player1 = "X"
player2 = "O"

currentPlayer = player1;

let audioBtn = document.getElementById("audio-btn")
audioBtn.addEventListener("click", toggleAudioDisplay)


const TicTacToe = (function() {
    // Private variables
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];



// private functions


function resetGame(){
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let squares = document.querySelectorAll('.square');

    squares.forEach(function(square) {
        square.innerHTML = ""
    });

    let headerReset = document.getElementById("second-header")

    headerReset.innerText = "Player X's turn"

    displayController.init();


}



function checkWinner() {
    // Check if cell is not empty
    function notEmpty(cell) {
        return cell !== "";
    }

    // Check if board is full
    function isBoardFull() {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (!notEmpty(board[row][col])) {
                    return false; // Found an empty cell, board isn't full
                }
            }
        }
        return true;
    }

    //Row 1
    if (notEmpty(board[0][0]) && board[0][0] === board[0][1] && board[0][1] === board[0][2]){
        return `${board[0][0]} is the winner!`;
    }

    //Row 2
    if (notEmpty(board[1][0]) && board[1][0] === board[1][1] && board[1][1] === board[1][2]){
        return `${board[1][0]} is the winner!`;
    }

    //Row 3
    if (notEmpty(board[2][0]) && board[2][0] === board[2][1] && board[2][1] === board[2][2]){
        return `${board[2][0]} is the winner!`;
    }

    //Column 1
    if (notEmpty(board[0][0]) && board[0][0] === board[1][0] && board[1][0] === board[2][0]){
        return `${board[0][0]} is the winner!`;
    }

    //Column 2
    if (notEmpty(board[0][1]) && board[0][1] === board[1][1] && board[1][1] === board[2][1]){
        return `${board[0][1]} is the winner!`;
    }

    //Column 3
    if (notEmpty(board[0][2]) && board[0][2] === board[1][2] && board[1][2] === board[2][2]){
        return `${board[0][2]} is the winner!`;
    }

    //Diagonal - Start Left
    if (notEmpty(board[0][0]) && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
        return `${board[0][0]} is the winner!`;
    }

    //Diagonal - Start Right
    if (notEmpty(board[0][2]) && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
        return `${board[0][2]} is the winner!`;
    }

    if (isBoardFull()) {
        return "Draw"; // No winner and board is full
    }

    return ""; // No winner and the game is ongoing
}



    // public methods
    return {
        makeMove: function(x, y, player) {
            if (board[x][y] === '') {
                board[x][y] = player;
                console.log(board)
                
            }
        }, 
        checkWinner: checkWinner, 

        resetGame:resetGame, 

        getBoard: function() {
            return board;
        },

    
       
    };
})();



const displayController = (function() {
    let squares = document.querySelectorAll('.square');



    function handleSquareClick(event) {
        let secondHeader = document.getElementById("second-header");
        
        let currentBoard = TicTacToe.getBoard();
        // Only process the click if the square is empty
        if (currentBoard[this.id.split('-')[0]][this.id.split('-')[1]] === '') {
            // 1. Handle player's move
            this.innerHTML = `<p class="square-text">${currentPlayer}</p>`;
            let textElement = this.querySelector(".square-text");
            setTimeout(() => {
                textElement.classList.add("visible");
            }, 50);
    
            TicTacToe.makeMove(this.id.split('-')[0], this.id.split('-')[1], currentPlayer);
    
            // Check game outcome after player's move
            let gameWinner = TicTacToe.checkWinner();
            if (gameWinner) {
                handleGameOutcome(gameWinner);
                return;  // Game is over, exit early
            }
    
            // 2. Handle AI's move if AI mode is enabled
            let aiToggle = document.getElementById('aiToggle');
            if (aiToggle.checked && currentPlayer === player1) {
                aiMove();
                currentPlayer = player1; // Keep the current player as player1 after AI's move
            } else {
                // Toggle currentPlayer only if AI didn't make a move
                currentPlayer = (currentPlayer === player1) ? player2 : player1;
            }
                    
                        secondHeader.innerText = (currentPlayer === player1) ? "Player X's turn" : "Player O's turn";
                    }
                }
                
                
    
    

    function setupListeners() {
        squares.forEach(function(square) {
            square.addEventListener('click', handleSquareClick);
        });
    }

    function removeListeners() {
        squares.forEach(function(square) {
            square.removeEventListener('click', handleSquareClick);
        });
    }

    return {
        init: function() {
            setupListeners();
        },
        removeListeners: removeListeners
        // Other functions to update display, show winner, etc.
    };
})();

let resetButton = document.getElementById("reset")
resetButton.addEventListener("click", TicTacToe.resetGame)



//AI Code
function minimax(board, isMaximizing) {
    let winner = TicTacToe.checkWinner(); 
    if (winner === "X is the winner!") return -10;
    if (winner === "O is the winner!") return 10;
    if (winner === "Draw") return 0;

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    let eval = minimax(board, false);
                    board[i][j] = '';
                    maxEval = Math.max(maxEval, eval);
                }
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    let eval = minimax(board, true);
                    board[i][j] = '';
                    minEval = Math.min(minEval, eval);
                }
            }
        }
        return minEval;
    }
}

function aiMove() {
    let board = TicTacToe.getBoard();
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'O';
                let score = minimax(board, false);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { i, j };
                }
            }
        }
    }

    // Display AI's move on the board
    TicTacToe.makeMove(bestMove.i, bestMove.j, 'O');
    let aiSquareElement = document.getElementById(`${bestMove.i}-${bestMove.j}`);
    aiSquareElement.innerHTML = `<p class="square-text">O</p>`;
    let textElement = aiSquareElement.querySelector(".square-text");
    setTimeout(() => { 
        textElement.classList.add("visible"); 
    }, 300);

    // Check game outcome after AI's move
    handleGameOutcome(TicTacToe.checkWinner());
}

function handleGameOutcome(gameOutcome) {
    setTimeout(() => {
        if (gameOutcome !== "") {
            let headerMessage = document.getElementById("second-header");
            
            if(gameOutcome === "Draw") {
                headerMessage.innerText = "It's a Draw!";

                //Logic for audio ...draw
                if (audioBtn.src.endsWith('/images/volume-on.svg')) {

                    let audio = new Audio('draw-sound.mp3');
                    audio.play();
                }
     
            } else {
                headerMessage.innerText = gameOutcome;
                

                //Logic for audio
                if (audioBtn.src.endsWith('/images/volume-on.svg')) {

                    let audio = new Audio('win-sound.wav');
                    audio.play();
                }
            }

            displayController.removeListeners();
        }
    }, 300);  // 300ms delay
}


function toggleAudioDisplay() {
    let audioBtn = document.getElementById("audio-btn");
    
    if (audioBtn.src.endsWith('/images/volume-on.svg')) {
        audioBtn.src = '/images/volume-off.svg'; 
        
    } else {
        audioBtn.src = '/images/volume-on.svg';
        
    }
}

// Start the game
displayController.init();


