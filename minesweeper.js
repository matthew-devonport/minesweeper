document.addEventListener('DOMContentLoaded', startGame)

var board = {
}

function createBoard(size) {
  board.cells= []
  let a = size

  for (let row = 0; row < a; row++) {
    for (let column = 0; column < a; column++){
      var newCell = {};
      newCell.hidden = true;
      newCell.isMine = Math.random() < 0.25;
      newCell.isMarked = false;
      newCell.row = row;
      newCell.col = column;
      board.cells.push(newCell);
    }
  }
}

function startGame () {
 createBoard(4)
document.addEventListener("click", checkForWin);
document.addEventListener("contextmenu", checkForWin);
for (let i = 0; i < board.cells.length; i++) { 
  board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
}
  lib.initBoard()
}
function noMines () {
  for (let i = 0; i < board.cells.length; i++) {
    var hasUnmarkedMines = board.cells[i].isMine && !board.cells[i].isMarked;
    var hasUnrevealedNonMines = !board.cells[i].isMine && board.cells[i].hidden;

    if (hasUnmarkedMines || hasUnrevealedNonMines){
      return false;
    }
  }
  return true;
}

function checkForWin () {
  if (noMines()) {
    lib.displayMessage('You win!')  
  }
}


window.onload=function(){
  var boardResetButton = document.getElementById("reset")
  boardResetButton.addEventListener("click", resetBoard)
}

function resetBoard () {
  document.querySelector(".board").innerHTML= ''
  var board = {}
  startGame()
  };


    
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell['row'], cell['col']);
  var mined = 0;
  for(var i=0; i<surrounding.length; i++){
    if(surrounding[i].isMine){
      mined++
    }
  }
      
  return mined;
}

function playSound(sound) {
  var audio = document.getElementById(sound);
  audio.play();
}
