let grid;

let width = screen.width;
let height = screen.height * 0.9;

let cols, rows;

var path = [];

var speed;
var spacing;

// Current Spot
let spot;

let done = false;

function makeArray(cols, rows) {
  let arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function isValid(newX, newY) {
  if (newX < 0 || newY < 0 || newX >= cols || newY >= rows) return false;
  return !grid[newX][newY].visited;
}

function setup() {
  createCanvas(width, height);

  var pause = createButton("PAUSE");
  pause.position(width / 2 - 100, height - screen.height / 20);
  pause.mousePressed(pauseSketch);

  var play = createButton("PLAY");
  play.position(width / 2 - 30, height - screen.height / 20);
  play.mousePressed(playSketch);

  var reset = createButton("RESET");
  reset.position(width / 2 + 30, height - screen.height / 20);
  reset.mousePressed(resetSketch);

  resetSketch();
}

function pauseSketch() {
  noLoop();
}

function playSketch() {
  loop();
}

function resetSketch() {
  done = false;
  loop();
  path = [];
  spacing = parseInt(prompt("Please enter spacing value", "50"));
  speed = parseInt(prompt("Please enter speed value", "1"));

  cols = floor(width / spacing);
  rows = floor(height / spacing);

  background(51);

  grid = makeArray(cols, rows);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  spot = grid[0][0];
  path.push(spot);
  spot.visited = true;

  draw();
}

function draw() {
  background(0);
  translate(spacing / 2, spacing / 2);

  for (let i = 0; i < speed; i++) {
    spot = spot.nextSpot();

    if (!spot) {
      let stuck = path.pop();
      stuck.clear();
      spot = path[path.length - 1];
    } else {
      path.push(spot);
      spot.visited = true;
    }

    if (path.length === cols * rows) {
      done = true;
      noLoop();
      break;
    }
  }

  if (done) {
    stroke(124, 252, 0);
    strokeWeight(spacing / 4);
    noFill();
    beginShape();
    for (let spot of path) {
      vertex(spot.x, spot.y);
    }
    endShape();
    stroke(124, 252, 0);
    strokeWeight(spacing / 2);
    point(spot.x, spot.y);
  } else {
    stroke(255);
    strokeWeight(spacing / 4);
    noFill();
    beginShape();
    for (let spot of path) {
      vertex(spot.x, spot.y);
    }
    endShape();
    stroke(255);
    strokeWeight(spacing / 2);
    point(spot.x, spot.y);
  }
}
