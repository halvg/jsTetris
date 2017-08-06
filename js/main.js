

var tBoard = new TBoard();


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

  this.textPrintGState = function() {
    var text = "";
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[0].length; j++) { // iterate columns
        var yLength = this.activeTetro.matrix.length;
        var yInit = this.activeTetro.offset.y;
        var yEnd = (yInit + yLength) - 1;
        var xLength = this.activeTetro.matrix[0].length;
        var xInit = this.activeTetro.offset.x;
        var xEnd = (xInit + xLength) - 1;
        if ((i >= yInit && i <= yEnd) && (j >= xInit && j <= xEnd)) {
          text += "9" + "  ";
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



// util functions
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

document.addEventListener("keydown", doKeyDown);

function doKeyDown(event) {
  if (event.keyCode == 40) { //ArrowDown
    if (tBoard.activeTetro != null) {
      tBoard.activeTetro.offset.y++;
    }
  }

}
