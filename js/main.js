

initGame();

////////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById("tetrisCanvas");
var canvW = canvas.width;
var canvH = canvas.height;
var ctx = canvas.getContext("2d");

var tetrisBoard = new TetrisBoard({cols: 20, rows: 30, canvW: canvW, canvH: canvH});

function initGame() {
  gameLoop();
}


var fps = 20/10;
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


function updateGame() {
  if (tetrisBoard.activeTetromino != null) {
    tetrisBoard.dropTetromino();
  } else {
    var t = new Itetromino();
    tetrisBoard.pushTetromino(t);
  }
}

function renderGame() {
  tetrisBoard.render();
}


function TetrisBoard(boardConf) {
  this.cols = boardConf.cols;
  this.rows = boardConf.rows;
  this.canvW = boardConf.canvW;
  this.canvH = boardConf.canvH;

  this.activeTetromino = null;
  this.activeTetrominoInitPoint = {};
  this.cells = [];
  this.toBeRenderedCells = []; // board cells pending to be rerendered to match game state

  //-- Object construction
  var cWidth = this.canvW / this.cols;
  var cHeight = this.canvH / this.rows;
  for (var i = 0; i < this.cols; i++) {
    var col = [];
    for (var j = 0; j < this.rows; j++) {
      var cell = new BoardCell({x: i*cWidth, y: j*cHeight}, cWidth, cHeight);
      col[j] = cell;
    }
    this.cells[i] = col;
  }

  //-- Methods
  this.pushTetromino = function(t) {
    this.activeTetromino = t;
    this.activeTetrominoInitPoint.x = Math.round(this.cols/2) - Math.round(t.matrix.length/2);
    this.activeTetrominoInitPoint.y = 0;
    for (var i = 0; i < t.matrix.length ; i++) {
      var y = i + this.activeTetrominoInitPoint.x;
      for (var j = 0; j < t.matrix.length; j++) {
        //console.log(i + "," + j );
        if (t.matrix[i][j] == 1) { // a filled cell is represented by 1
          if (this.cells[y][j].filled) {
            console.log("GAME OVER!!!");
          } else {
            this.cells[y][j].filled = true;
            this.cells[y][j].colour = t.colour;
            console.log(this.cells[y][j]);
            this.toBeRenderedCells.push(this.cells[y][j]);
          }
        }
      }
    }
  }

  this.dropTetromino = function() {
    for (var i = 0; i < this.activeTetromino.matrix.length; i++) {
      var x = i + this.activeTetrominoInitPoint.x;
      for (var j = 0; j < this.activeTetromino.matrix.length; j++) {
        var y = j + this.activeTetrominoInitPoint.y;
        if (this.activeTetromino.matrix[i][j] == 1) {
          this.cells[x][y].filled = false;
          this.cells[x][y].colour = "#000000";
          this.toBeRenderedCells.push(this.cells[x][y]);
        }
      }
    }
    for (var i = 0; i < this.activeTetromino.matrix.length; i++) {
      var x = i + this.activeTetrominoInitPoint.x;
      for (var j = 0; j < this.activeTetromino.matrix.length; j++) {
        var y = j + this.activeTetrominoInitPoint.y + 1;
        if (this.activeTetromino.matrix[i][j] == 1) {
          this.cells[x][y].filled = true;
          this.cells[x][y].colour = this.activeTetromino.colour;
          this.toBeRenderedCells.push(this.cells[x][y]);
        }
      }
    }
    this.activeTetrominoInitPoint.y++;
  }

  this.render = function() {
    for (var i = 0; i < this.toBeRenderedCells.length; i++) {
      this.toBeRenderedCells[i].render();
    }
    this.toBeRenderedCells = [];
  }
}

function BoardCell(pos, width, height) {
  this.pos = pos;
  this.width = width;
  this.height = height;
  this.filled = false; // points out if cell is occupied by any piece
  this.colour;

  this.render = function() {
    ctx.fillStyle = this.colour;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}


function Itetromino() {
  this.colour = 'rgb(181, 11, 26)';
  this.matrix = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
}
