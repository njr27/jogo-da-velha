const $boardList = document.querySelectorAll(".square")
const $score1 = document.querySelector(".score-p1")
const $score2 = document.querySelector(".score-p2")
const $winnerName = document.querySelector(".player")
const $playerField1 = document.querySelector(".input-player-1")
const $playerField2 = document.querySelector(".name-player-2")
const $historyMoveList = document.querySelector(".box-history-list")
const $matchHistoty = document.querySelector('.match-history')
const $switcherBot = document.querySelector('.checkbox-bot')
const $switcherMD = document.querySelector('.checkbox-md')


let currentMove = "X"
let scorePlayer1 = 0
let scorePlayer2 = 0
let gameStart = true
let botActive = false
let bestOf = 3 

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const dictionaryIndexBoard = ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Sexto', 'Sétimo', 'Oitavo', 'Nono']

function printMoveHistory(move, playerName, boardIndex) {


  $historyMoveList.innerHTML += `
  <div class="box-history">
    <span class="player-name">${move}</span>
    <div class="history-player">
        <span class="history-player-name">${playerName}</span>
        <span class="history-player-place">${dictionaryIndexBoard[boardIndex]} campo</span>
    </div>
  </div> 
  `
}

function toggleMove() {
  currentMove = currentMove == "X" ? "O" : "X"
}

function printWinnerName(winnerName) {
  $winnerName.textContent = winnerName
}

function getScenery(){
  const scenery = []

  for(const $board of $boardList){
    scenery.push($board.textContent)

  }
  return scenery

}

function verifryBestOf(){
  if(scorePlayer1 === 2 && bestOf === 3){
    return 'X'
  }
  if(scorePlayer1 === 3 && bestOf === 5){
    return 'X'
  }

  if(scorePlayer2 === 2 && bestOf === 3){
    return 'X'
  }
  if(scorePlayer2 === 3 && bestOf === 5){
    return 'X'
  }

}


function printMatchHistory(winner, scenery){
let miniBoardScenery = ''
for (const move of scenery){
  miniBoardScenery += ` <span class="mini-board-item">${move}</span> `

}



  $matchHistoty.innerHTML += `
  <div class="match-history-wrapper">
    <div class="winner-area">
      <span class="winner-name">Vencedor</span>
      <span class="suqare-name">${winner}</span>
    </div>
   <span class="scene">Cenário</span>
  
    <div class="mini-board">
      ${miniBoardScenery}
    </div>
  </div>
  
  `

}


function verifyWinner() {
  let filledFields = 0

  for (const condition of winConditions) {
    const $field0 = $boardList[condition[0]]
    const $field1 = $boardList[condition[1]]
    const $field2 = $boardList[condition[2]]

    if (
      $field0.innerHTML != "" &&
      $field0.innerHTML == $field1.innerHTML &&
      $field1.innerHTML == $field2.innerHTML
    ) {
      return currentMove
    }
  }

  for (const $field of $boardList) {
    if ($field.innerHTML != 0) filledFields++
  }

  if (filledFields == 9) return "draw"
}

function resetHistoryList(){
  $historyMoveList.innerHTML = ""

}

function resetScoreboard(){
  $score1.textContent = '00'
  $score2.textContent = '00'
}

function resetVariablesScore(){
  let scorePlayer1 = 0
  let scorePlayer2 = 0
}

function resetBattlefield() {
  for (const $boardItem of $boardList) {
    $boardItem.innerHTML = ""
  }
}

function toggleBestOf(){
  bestOf = bestOf === 3 ? 5 : 3
}


function bot(){
  const randomNumber = Math.random() * 9
  const index = Math.floor(randomNumber)
  const $boardItem = $boardList[index]

  const game = verifyWinner()

  if ($boardItem.textContent != '' && game != 'draw') return bot()

  move(index, 'bot')
}


function move(boardIndex, type) {
  const $boardItem = $boardList[boardIndex]
  
  

  if (!gameStart) return

  if ($boardItem.innerHTML != "") return
  
  $boardItem.innerHTML = currentMove
  const gameResult = verifyWinner()

  const scenery = getScenery()

  const playerName = currentMove === "X" ? $playerField1.value : $playerField2.value
  
  if (gameResult === "X" || gameResult === "O") {
    gameStart = false
    addPoint(gameResult)
    printScore()
    printWinnerName(playerName)
    setTimeout(resetBattlefield, 1000)
    setTimeout(resetHistoryList, 1000)
    printMatchHistory(playerName, scenery)
    setTimeout(function(){
      gameStart = true
    }, 1000)
  }
  if (gameResult == "draw") {
    gameStart = false
    setTimeout(resetBattlefield, 1000)
    setTimeout(resetHistoryList, 1000) 
    printMatchHistory('Empate', scenery)
    setTimeout(function(){
      gameStart = true
    }, 1000)
  }

  const bestOfResult = verifryBestOf()

  printMoveHistory(currentMove, playerName, boardIndex)
  toggleMove()
  if (type === 'user' && botActive)  bot()
  if (bestOfResult !== undefined){
    resetScoreboard()
    resetVariablesScore()
  } 

}

function addPoint(winner) {
  if (winner == "X") scorePlayer1++
  if (winner == "O") scorePlayer2++
}

function printScore() {
  $score1.innerHTML = scorePlayer1 < 10 ? "0" + scorePlayer1 : scorePlayer1
  $score2.innerHTML = scorePlayer2 < 10 ? "0" + scorePlayer2 : scorePlayer2
}

function addBoardListeners() {
  for (let index = 0; index < $boardList.length; index++) {
    const $boardItem = $boardList[index].addEventListener("click", function () {
      move(index, 'user')
    })
  }
}
addBoardListeners()

$switcherBot.addEventListener('click', function(){
  botActive = !botActive
  $playerField2.value = botActive ? 'BOT' : ''
  $playerField2.disabled = !$playerField2.disabled
})


$switcherMD.addEventListener('click', function(){
  toggleBestOf()
})