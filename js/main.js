

function TBoard() {
  this.boardNumColumns = 10;
  this.boardNumRows = 16;
  this.board = [];

  this.activeTetro = null;

  //-- Construction
  for (var i = 0; i < this.boardNumRows; i++) {
    var row = [];
    for (var j = 0; j < this.boardNumColumns; j++) {
      row.push(0);
    }
    this.board.push(row);
  }
  //--

  this.pushTetro = function(tetroMatrix) {
    this.activeTetro = {};
    this.activeTetro.offset = {y:0, x:3} // y for row offset, x for column offset
    this.activeTetro.matrix = tetroMatrix;
  }

  this.moveTetroLeft = function() {
    if (this.activeTetro != null) {
      this.activeTetro.offset.x--;
    }
  }

  this.moveTetroUp = function() {
    if (this.activeTetro != null) {
      this.activeTetro.offset.y--;
    }
  }

  this.moveTetroRight = function() {
    if (this.activeTetro != null) {
      this.activeTetro.offset.x++;
    }
  }

  this.moveTetroDown = function() {
    if (this.activeTetro != null) {
      this.activeTetro.offset.y++;
    }
  }

  this.textPrintGState = function() {
    var text = "";
    for (var i = 0; i < this.board.length; i++) { // i is row
      for (var j = 0; j < this.board[0].length; j++) { // j is column
        var yLength = this.activeTetro.matrix.length;
        var yInit = this.activeTetro.offset.y;
        var yEnd = (yInit + yLength) - 1;
        var xLength = this.activeTetro.matrix[0].length;
        var xInit = this.activeTetro.offset.x;
        var xEnd = (xInit + xLength) - 1;
        if ((i >= yInit && i <= yEnd) && (j >= xInit && j <= xEnd)) {
          // text += "9" + "  ";
          if (this.activeTetro.matrix[i-this.activeTetro.offset.y][j-this.activeTetro.offset.x] != 0) {
            text += "X" + "  ";
          } else {
            text += "O" + "  ";
          }
        } else {
          text += this.board[i][j] + "  ";
        }
      }
      text += "\n";
    }
    return text;
  }

}

var tTetro = [
  [1, 1, 1],
  [0, 1, 0],
  [0, 0, 0]
];



//-- Util functions
function textPrint2DMatrix(matrix) {
  var text = "";
  for (var i = 0; i < matrix.length; i++) { // iterate rows
    for (var j = 0; j < matrix[0].length; j++) { // iterate columns
      text += matrix[i][j] + "  ";
    }
    text += "\n";
  }
  return text;
}



//-- Events
document.addEventListener("keydown", doKeyDown);

function doKeyDown(event) {
  switch (event.keyCode) {
    case 37: // ArrowLeft
      tBoard.moveTetroLeft();
      break;
    case 38: //ArowUp
      tBoard.moveTetroUp();
      break;
    case 39: //ArowRight
      tBoard.moveTetroRight();
      break;
    case 40: // ArrowDown
      tBoard.moveTetroDown();
      break;
    default:
      console.log(event.keyCode);
  }

}


////////////////////////////////////////////////////////////////////////////////
var tBoard = new TBoard();

var canvas = document.getElementById("canvas");
var canvW = canvas.width;
var canvH = canvas.height;
var ctx = canvas.getContext("2d");
initGame();


function initGame() {
  tBoard.pushTetro(tTetro);
  gameLoop();
}

var fps = 60/1000;
var last = new Date().getTime();
function gameLoop() {
  var now = new Date().getTime();
  var delta = (now - last)/1000;
  if (delta >= fps) {
    console.log(delta);
    updateGame();
    renderGame();
    last = new Date().getTime();
  }
  requestAnimationFrame(gameLoop);
}

function updateGame(){
}

function renderGame() {
  printToCanvas();
  // console.log(tBoard.textPrintGState());
}

function printToCanvas() {
  var cWidth = canvW / tBoard.boardNumColumns;
  var cHeight = canvH / tBoard.boardNumRows;
  // firstly we paint the board
  for (var i = 0; i < tBoard.boardNumRows; i++ ) { // i for rows
    for (var j = 0; j < tBoard.boardNumColumns; j++) { // j for columns
      var x = j * cWidth;
      var y = i * cHeight;
      if (tBoard.board[i][j] == 0) {
        ctx.fillStyle = '#000000';
      } else {
        ctx.fillStyle = '#b8ad27';
      }
      ctx.fillRect(x, y, cWidth, cHeight);
    }
  }
  // then we paint the tetromino
  for (var i = 0; i < tBoard.activeTetro.matrix.length; i++) {
    for (var j = 0; j < tBoard.activeTetro.matrix[i].length; j++) {
      var x = (tBoard.activeTetro.offset.x + j) * cWidth;
      var y = (tBoard.activeTetro.offset.y + i) * cHeight;
      if (tBoard.activeTetro.matrix[i][j] != 0) {
        ctx.fillStyle = '#4971d5';
        ctx.fillRect(x, y, cWidth, cHeight);
      }
    }
  }
}
