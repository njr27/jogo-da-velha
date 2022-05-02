const $square0 = document.querySelector('.square-0')
const $square1 = document.querySelector('.square-1')
const $square2 = document.querySelector('.square-2')
const $square3 = document.querySelector('.square-3')
const $square4 = document.querySelector('.square-4')
const $square5 = document.querySelector('.square-5')
const $square6 = document.querySelector('.square-6')
const $square7 = document.querySelector('.square-7')
const $square8 = document.querySelector('.square-8')

let currentMove = 'X'



function toggleMove(){
    if (currentMove == 'X'){
        currentMove = 'O'
    } else{
        currentMove = 'X'
    }

}


function verifyWinner(){
    if($square0.innerHTML != '' && $square0.innerHTML == $square1.innerHTML && $square0.innerHTML == $square2.innerHTML){
        return currentMove
    }else if ($square3.innerHTML != '' && $square3.innerHTML == $square4.innerHTML && $square3.innerHTML == $square5.innerHTML){
        return currentMove
    }else if ($square6.innerHTML != '' && $square6.innerHTML == $square7.innerHTML && $square6.innerHTML == $square8.innerHTML){
        return currentMove
    }else if ($square0.innerHTML != '' && $square0.innerHTML == $square3.innerHTML && $square0.innerHTML && $square6.innerHTML){
        return currentMove
    }else if ($square1.innerHTML != '' && $square1.innerHTML == $square4.innerHTML && $square1.innerHTML == $square7.innerHTML){
        return currentMove
    }else if ($square2.innerHTML != '' && $square2.innerHTML == $square5.innerHTML && $square2.innerHTML == $square8.innerHTML){
        return currentMove
    }else if ($square0.innerHTML != '' && $square0.innerHTML == $square4.innerHTML && $square0.innerHTML == $square8.innerHTML){
        return currentMove
    }else if ($square2.innerHTML != '' && $square2.innerHTML == $square4.innerHTML && $square2.innerHTML == $square6.innerHTML){
        return currentMove
    }
}


$square0.addEventListener('click', function(){
    if ($square0.innerHTML != ''){
        return
    }
    $square0.innerHTML = currentMove 
    const gameResult = verifyWinner()
    console.log(gameResult)
    toggleMove()
})

$square1.addEventListener('click', function(){
    if ($square1.innerHTML != ''){
        return
    }
    $square1.innerHTML = currentMove
    const gameResult = verifyWinner()
    console.log(gameResult)  
    toggleMove()
})

$square2.addEventListener('click', function(){
    if ($square2.innerHTML != ''){
        return
    }
    $square2.innerHTML = currentMove
    const gameResult = verifyWinner()
    console.log(gameResult) 
    toggleMove()
})

$square3.addEventListener('click', function(){
    if ($square3.innerHTML != ''){
        return
    }
    $square3.innerHTML = currentMove
    const gameResult = verifyWinner()
    console.log(gameResult) 
    toggleMove()
})

$square4.addEventListener('click', function(){
    if ($square4.innerHTML != ''){
        return
    }
    $square4.innerHTML = currentMove
    const gameResult = verifyWinner()
    console.log(gameResult) 
    toggleMove()
})

$square5.addEventListener('click', function(){
    if ($square5.innerHTML != ''){
        return
    }
    $square5.innerHTML = currentMove
    const gameResult = verifyWinner()
    console.log(gameResult) 
    toggleMove()
})

$square6.addEventListener('click', function(){
    if ($square6.innerHTML != ''){
        return
    }
    $square6.innerHTML = currentMove
    const gameResult = verifyWinner()
    console.log(gameResult) 
    toggleMove()
})

$square7.addEventListener('click', function(){
    if ($square7.innerHTML != ''){
        return
    }
    $square7.innerHTML = currentMove
    const gameResult = verifyWinner()
    console.log(gameResult) 
    toggleMove()
})

$square8.addEventListener('click', function(){
    if ($square8.innerHTML != ''){
        return
    }
    $square8.innerHTML = currentMove
    const gameResult = verifyWinner()
    console.log(gameResult) 
    toggleMove()
})










