const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 30;
const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = 50;
const OBSTACLE_SPEED = 1;

let playerX = canvas.width / 2 - PLAYER_WIDTH / 2;
let playerY = canvas.height - PLAYER_HEIGHT - 10;
let obstacleX = 0;
let obstacleY = -OBSTACLE_HEIGHT;
let score = 0;

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawObstacle() {
    ctx.beginPath();
    ctx.rect(obstacleX, obstacleY, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function moveObstacle() {
    obstacleY += OBSTACLE_SPEED;
    if (obstacleY > canvas.height) {
        obstacleX = Math.random() * (canvas.width - OBSTACLE_WIDTH);
        obstacleY = -OBSTACLE_HEIGHT;
        score++;
    }
}

function detectCollision() {
    if (
        playerX < obstacleX + OBSTACLE_WIDTH &&
        playerX + PLAYER_WIDTH > obstacleX &&
        playerY < obstacleY + OBSTACLE_HEIGHT &&
        playerY + PLAYER_HEIGHT > obstacleY
    ) {
        alert("Game over!");
        document.location.reload();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacle();
    drawScore();
    moveObstacle();
    detectCollision();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        playerX -= 10;
        if (playerX < 0) {
            playerX = 0;
        }
    } else if (event.key === "ArrowRight") {
        playerX += 10;
        if (playerX + PLAYER_WIDTH > canvas.width) {
            playerX = canvas.width - PLAYER_WIDTH;
        }
    }
});

setInterval(draw, 10);
