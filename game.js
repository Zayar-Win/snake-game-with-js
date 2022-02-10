const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const speed = 5;
let score = 0;

class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const sound = new Audio("./gulp.mp3");

canvas.width = 400;
canvas.height = 400;
const count = 20;
const tailsize = canvas.width / 20 - 2;
let headX = 10;
let headY = 10;
let foodX = 5;
let foodY = 10;
let snakeBody = [];
let tailLength = 0;

let velocityX = 0;
let velocityY = 0;

function main() {
  changeSnakePosition();
  if (isGameover()) {
    return;
  }
  clearScreen();

  whenEatFood();
  drawFood();
  drawSnake();
  drawScore();
  setTimeout(main, 1000 / speed);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeBody.length; i++) {
    //2
    let part = snakeBody[i];
    ctx.fillRect(
      part.x * count,
      part.y * count,
      tailsize,
      tailsize
    );
  }
  snakeBody.push(new Snake(headX, headY)); //snake(x,y)
  if (snakeBody.length > tailLength) {
    //2 > 1
    snakeBody.shift();
  }
  ctx.fillStyle = "orange";
  ctx.fillRect(
    headX * count,
    headY * count,
    tailsize,
    tailsize
  );
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText(
    "score - " + score,
    canvas.width - 50,
    15
  );
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(
    foodX * count,
    foodY * count,
    tailsize,
    tailsize
  );
}

function isGameover() {
  let gameOver = false;
  if (velocityX === 0 && velocityY === 0) {
    return false;
  }
  if (
    headX > count ||
    headY > count ||
    headX < 0 ||
    headY < 0
  ) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    ctx.fillText(
      "Game over",
      canvas.width / 6.5,
      canvas.height / 2
    );
  }

  return gameOver;
}

function whenEatFood() {
  if (headX === foodX && headY === foodY) {
    randomFoodPosition();
    tailLength++;
    score++;
    sound.play();
  }
}

function randomFoodPosition() {
  foodX = Math.floor(Math.random() * 20);
  foodY = Math.floor(Math.random() * 20);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function changeSnakePosition() {
  headX = headX + velocityX;
  headY = headY + velocityY;
}

document.addEventListener("keydown", keydown);

function keydown(e) {
  if (e.keyCode === 38) {
    if (velocityY === 1) return;
    velocityY = -1;
    velocityX = 0;
  }
  if (e.keyCode === 40) {
    if (velocityY === -1) return;
    velocityY = 1;
    velocityX = 0;
  }
  if (e.keyCode === 37) {
    if (velocityX === 1) return;
    velocityY = 0;
    velocityX = -1;
  }
  if (e.keyCode === 39) {
    if (velocityX === -1) return;
    velocityY = 0;
    velocityX = 1;
  }
}

main();
