

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
    if (this.isMovAllowed('thisPlace')) {
      return true;
    }

    return false;
  }

  this.moveTetroLeft = function() {
    if (this.activeTetro != null && this.isMovAllowed('left')) {
      this.activeTetro.offset.x--;
      return true;
    }
    return false;
  }

  this.moveTetroUp = function() {
    if (this.activeTetro != null && this.isMovAllowed('up')) {
      this.activeTetro.offset.y--;
      return true;
    }
    return false;
  }

  this.moveTetroRight = function() {
    if (this.activeTetro != null && this.isMovAllowed('right')) {
      this.activeTetro.offset.x++;
      return true;
    }
    return false;
  }

  this.moveTetroDown = function() {
    if (this.activeTetro != null && this.isMovAllowed('down')) {
      this.activeTetro.offset.y++;
      return true;
    } else {
      this.fuseTetro();
      return false;
    }
  }

  this.isMovAllowed = function(direction) {
    // copy activeTetro offset in new offset object to work with it without disturbin original object
    var newOffset = {};
    var newOffset = {y: this.activeTetro.offset.y, x: this.activeTetro.offset.x};
    switch(direction) {
      case 'thisPlace':
        break;
      case 'left':
        newOffset.x--;
        break;
      case 'up':
        newOffset.y--;
        break;
      case 'right':
        newOffset.x++;
        break;
      case 'down':
        newOffset.y++;
        break;
    }

    for (var i = 0; i < this.activeTetro.matrix.length; i++) {
      for(var j = 0; j < this.activeTetro.matrix[0].length; j++) {
        //console.log("y: " + (i+newOffset.y) + "  x: " + (j+newOffset.x));
        var tetroElement = this.activeTetro.matrix[i][j];
        var boardElement;
        if ( (i+newOffset.y < 0) || (i+newOffset.y >= this.boardNumRows)
              || (j+newOffset.x < 0) || (j+newOffset.x >= this.boardNumColumns) ) {  // off board limits
          boardElement = '9'
        } else {
          boardElement = this.board[i+newOffset.y][j+newOffset.x];
        }
        //console.log(boardElement);
        if (tetroElement != 0 && boardElement != 0) {
          return false;
        }
      }
    }

    return true;
  }

  this.rotateTetro = function() {
    console.log("rotating");
    if (this.activeTetro == null) {
      return;
    }
    var newMatrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    textPrint2DMatrix(newMatrix);
    var i2 = 0; var j2 = this.activeTetro.matrix[0].length-1;
    for (var i = 0; i < this.activeTetro.matrix.length; i++) {
      for (var j = 0; j < this.activeTetro.matrix[i].length; j++) {
        textPrint2DMatrix(newMatrix);
        console.log(i2 + " " + j2);
        newMatrix[i2][j2] = this.activeTetro.matrix[i][j];
        i2++;
      }
      console.log("new line");
      i2 = 0;
      j2--;
    }
    this.activeTetro.matrix = newMatrix;
  }

  this.fuseTetro = function() {
    for (var i = 0; i < this.activeTetro.matrix.length; i++) {
      for (var j = 0; j < this.activeTetro.matrix[0].length; j++) {
        if (this.activeTetro.matrix[i][j] != 0) {
          this.board[i+this.activeTetro.offset.y][j+this.activeTetro.offset.x] = this.activeTetro.matrix[i][j];
        }
      }
    }
    this.activeTetro = null;
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
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
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
      tBoard.rotateTetro();
      break;
    case 39: //ArowRight
      tBoard.moveTetroRight();
      break;
    case 40: // ArrowDown
      tBoard.moveTetroDown();
      break;
    default:
      break;
      //console.log(event.keyCode);
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
  //tBoard.pushTetro(tTetro);
  gameLoop();
}

var fps = 60;
var last = new Date().getTime();
function gameLoop() {
  var now = new Date().getTime();
  var delta = (now - last)/1000;
  if (delta >= (1/fps)) {
    //console.log(delta);
    updateGame(delta);
    renderGame();
    last = new Date().getTime();
  }
  requestAnimationFrame(gameLoop);
}

var auxTime = 0;
function updateGame(time){
  auxTime += time;
  if (tBoard.activeTetro == null || auxTime >= 1) {
    if (tBoard.activeTetro == null) {
      var added = tBoard.pushTetro(tTetro);
      if (!added) {
        console.log("Game Over!!");
      }
    } else {
      var moved = tBoard.moveTetroDown();
      /*if (!moved) {
        tBoard.fuseTetro();
      }*/
    }
    auxTime = 0;
  }
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
  if (tBoard.activeTetro != null) {
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
}
