

initGame();

////////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById("tetrisCanvas");
var canvW = canvas.width;
var canvH = canvas.height;
var ctx = canvas.getContext("2d");

var tetrisBoard = new TetrisBoard({cols: 12, rows: 18, canvW: canvW, canvH: canvH});

function initGame() {
  gameLoop();
}


var fps = 1/10;
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
  //requestAnimationFrame(gameLoop);
}


function updateGame() {

}

function renderGame() {
}


function TetrisBoard(boardConf) {
  this.cols = boardConf.cols;
  this.rows = boardConf.rows;
  this.canvW = boardConf.canvW;
  this.canvH = boardConf.canvH;

  this.cells = [];

  //create cells
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

}

function BoardCell(pos, width, height) {
  this.pos = pos;
  this.width = width;
  this.heigth = height;

  console.log("Cell: " + pos.x + " " + pos.y);
}
