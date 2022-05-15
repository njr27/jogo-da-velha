const $boardList = document.querySelectorAll(".square")
const $score1 = document.querySelector(".score-p1")
const $score2 = document.querySelector(".score-p2")

let currentMove = "X"
let scorePlayer1 = 0
let scorePlayer2 = 0

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 5],
  [0, 4, 8],
  [2, 4, 6],
]

function toggleMove() {
  currentMove = currentMove == "X" ? "O" : "X"
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

  for (const $field of $boardList){
    if($field.innerHTML != 0) filledFields++
  }

  if (filledFields == 9) return 'draw'

}

function resetBattlefield() {
  for (const $boardItem of $boardList) {
    $boardItem.innerHTML = ""
  }
}

function move(boardIndex) {
  const $boardItem = $boardList[boardIndex]

  if ($boardItem.innerHTML != "") {
    return
  }
  $boardItem.innerHTML = currentMove
  const gameResult = verifyWinner()
  if (gameResult == "X" || gameResult == "O") {
    // alert(currentMove)
    addPoint(gameResult)
    printScore()
    setTimeout(resetBattlefield, 1000)
  }
  if (gameResult == "draw") {
    // alert("Empate")
    setTimeout(resetBattlefield, 1000)
  }
  toggleMove()
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
      move(index)
    })
  }
}
addBoardListeners()
