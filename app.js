// == game state (globals)
let currentRound = 1
let playerX = 'X'
let playerO = 'O'
let currentPlayer = playerO
let endGame = false
let xMoves = [];
let oMoves = [];
let winner = ''

// == caching DOM element references
const squares = document.querySelectorAll('.square');
const gameBtn = document.querySelector('.game-btn');
const xScore = document.querySelector('.x-score');
const oScore = document.querySelector('.o-score');
const tieScore = document.querySelector('.tie-score');
const messageElement = document.querySelector('.message');
const xElement = document.querySelector('.player-x');
const oElement = document.querySelector('.player-o');


// == setup event listeners
for (const square of squares) {
    square.addEventListener('click', handleClick);
}

gameBtn.addEventListener('click', handleGameBtn)

// == event hadlers
    //handleClick
function handleClick(event){
    const square = event.target
    const squareIndex = square.dataset.index

    if(endGame === false && square.textContent === ''){
        square.textContent = currentPlayer
        if (currentPlayer === 'X') {
            xMoves.push(Number(squareIndex))
        } else {
            oMoves.push(Number(squareIndex))
        }
        checkWinner(currentPlayer)
        switchPlayer()
        currentRound++
    }
}

    //handlerGameBtn
function handleGameBtn(event){
    //reset game
    for (const square of squares) {
        square.textContent = ''
    }

    xMoves = []
    oMoves = []
    endGame = false
    winner = ''
    currentRound = 1
    messageElement.textContent = ''
}
    

// == other fucntions
function checkWinner(){
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ]

    let moves = []
    if (currentPlayer === playerX){
        moves = xMoves
    }else{
        moves = oMoves
    }

    for (let win of wins){
        let matchCount = 0

        for (let i of win){
            if (moves.includes(i)){
                matchCount++
            }
        }
        if (matchCount === 3){
            winner = currentPlayer
            endCurrentRound(winner)
            return
        }
    
    }



    if(!winner && currentRound === 9){
        winner = 'tie'
        endCurrentRound(winner)
    }
}

function switchPlayer(){
    xScore.style.color = 'gray'
    oScore.style.color = 'gray'
    xElement.style.color = 'gray'
    oElement.style.color = 'gray'

    if(currentPlayer === playerX){
        currentPlayer = playerO
        oScore.style.color = 'white'
        oElement.style.color = 'white'
    }else{
        currentPlayer = playerX
        xScore.style.color = 'white'
        xElement.style.color = 'white'
    }
}

function endCurrentRound(winner){
    endGame = true;
    updateScore(winner)
    if(winner === 'tie'){
        messageElement.textContent = `It's a tie!`
    }else{
        messageElement.textContent = `Player ${winner} wins!`
    }
    // highlight result

    // message winner

    // updateScore
}

function updateScore(winner){
    if (winner === playerX) {
        xScore.textContent = Number(xScore.textContent) + 1
    } else if (winner === playerO){
        oScore.textContent = Number(oScore.textContent) + 1
    } else{
        tieScore.textContent = Number(tieScore.textContent) + 1
    }
}
