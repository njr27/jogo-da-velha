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

const moveScenery = []

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



const addMoveScenery = () =>{
  const scenery = getScenery()
  moveScenery.push(scenery)

}



const printBoardByScenery = (scenery) => {
  for (let index = 0; index < scenery.length; index++){
    $boardList[index].textContent = scenery[index]
  }

}


const dictionaryIndexBoard = ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Sexto', 'Sétimo', 'Oitavo', 'Nono']

const printMoveHistory = (move, playerName, boardIndex) => {


  $historyMoveList.innerHTML += `
  <div class="box-history">
    <span class="player-name">${move}</span>
    <div class="history-player">
        <span class="history-player-name">${playerName}</span>
        <span class="history-player-place">${dictionaryIndexBoard[boardIndex]} campo</span>
    </div>
  </div> 
  `

  const $historyMoveItems = document.querySelectorAll('.box-history')

  for(let index = 0; index < $historyMoveItems.length; index++){
    const $moveItem = $historyMoveItems[index]
    
    $moveItem.addEventListener('click', () =>{
      const currentScenry = moveScenery[index]

      printBoardByScenery(currentScenry)

    })
  }

}

const toggleMove = () => {
  currentMove = currentMove == "X" ? "O" : "X"
}

const printWinnerName = (winnerName) => {
  $winnerName.textContent = winnerName
}

const getScenery = () => {
  const scenery = Array.from($boardList).map(($board) => {
    const move = $board.textContent

    return move
  })

  return scenery

}

const verifryBestOf = () => {
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


const printMatchHistory = (winner, scenery) => {
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


const verifyWinner = () => {
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

  
  $boardList.forEach(($field) =>{
    if ($field.innerHTML != 0) filledFields++
  })

  if (filledFields == 9) return "draw"
}

const resetHistoryList = () => {
  $historyMoveList.innerHTML = ""

}

const resetScoreboard = () => {
  $score1.innerHTML = '00'
  $score2.innerHTML = '00'
}

const resetVariablesScore = () => {
  scorePlayer1 = 0
  scorePlayer2 = 0
}

const resetBattlefield = () => {
  for (const $boardItem of $boardList) {
    $boardItem.innerHTML = ""
  }
}

const toggleBestOf = () => {
  bestOf = bestOf === 3 ? 5 : 3
}


const bot = () => {
  const randomNumber = Math.random() * 9
  const index = Math.floor(randomNumber)
  const $boardItem = $boardList[index]

  const game = verifyWinner()

  if ($boardItem.textContent != '' && game != 'draw') return bot()

  move(index, 'bot')
}


const move = (boardIndex, type) => {
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
    setTimeout( () => {
      gameStart = true
      if (botActive) currentMove = 'X'
    }, 1000)
  }
  if (gameResult == "draw") {
    gameStart = false
    setTimeout(resetBattlefield, 1000)
    setTimeout(resetHistoryList, 1000) 
    printMatchHistory('Empate', scenery)
    setTimeout( () => {
      gameStart = true
      if (botActive) currentMove = 'X'
    }, 1000)
  }

  const bestOfResult = verifryBestOf()

  printMoveHistory(currentMove, playerName, boardIndex)
  toggleMove()
  addMoveScenery()
  if (type === 'user' && botActive)  bot()
  if (bestOfResult !== undefined){
    resetScoreboard()
    resetVariablesScore()
  } 

}

const addPoint = (winner) => {
  if (winner == "X") scorePlayer1++
  if (winner == "O") scorePlayer2++
}

const printScore = () => {
  $score1.innerHTML = scorePlayer1 < 10 ? "0" + scorePlayer1 : scorePlayer1
  $score2.innerHTML = scorePlayer2 < 10 ? "0" + scorePlayer2 : scorePlayer2
}

const addBoardListeners = () => {
  for (let index = 0; index < $boardList.length; index++) {
    const $boardItem = $boardList[index].addEventListener("click", () => {
      move(index, 'user')
    })
  }
}
addBoardListeners()

$switcherBot.addEventListener('click', () => {
  botActive = !botActive
  $playerField2.value = botActive ? 'BOT' : ''
  $playerField2.disabled = !$playerField2.disabled
})


$switcherMD.addEventListener('click', () => {
  toggleBestOf()
})