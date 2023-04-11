const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 30;
const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = 50;


let playerX = canvas.width / 2 - PLAYER_WIDTH / 2;
let playerY = canvas.height - PLAYER_HEIGHT - 10;
let score = 0;
let obstacleSpeed = 5;
let playerSpeed = 5; // vitesse du joueur
let level = 1;
let limitObstacle = 3;

class Obstacle{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    draw(color){
        ctx.beginPath();
        ctx.rect(this.x, this.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}

let obstacle = new Obstacle(0,-OBSTACLE_HEIGHT);
let obstacle2 = new Obstacle(0,-OBSTACLE_HEIGHT);
let obstacle3 = new Obstacle(0,-OBSTACLE_HEIGHT);

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawObstacles() {

    obstacle.draw("#FF0000");
    obstacle2.draw("#FFFF00");
    obstacle3.draw("#FF00FF");
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLevel() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Level: " + level, 8, 50);
}

function moveObstacle() {
    obstacle.x += obstacleSpeed;
    obstacle2.x += obstacleSpeed;
    obstacle3.x += obstacleSpeed;
    if (obstacle.x > canvas.width) {
        obstacle.y = Math.random() * (canvas.height - OBSTACLE_HEIGHT);
        obstacle.x = -OBSTACLE_WIDTH;
        score++;
    }
    if (obstacle2.x > canvas.width) {
        obstacle2.y = Math.random() * (canvas.height - OBSTACLE_HEIGHT);
        obstacle2.x = -OBSTACLE_WIDTH;
        score++;
    }
    
    if (obstacle3.x > canvas.width) {
        obstacle3.y = Math.random() * (canvas.height - OBSTACLE_HEIGHT);
        obstacle3.x = -OBSTACLE_WIDTH;
        score++;
    }
}

//TODO multiple spawn obstacle
    //TODO spawn obstacle not same case

//TODO funtion draw road
    //TODO limit spawn obstacle on road

//TODO Object ?

//TODO Interface Game Over Restart Best Score

function detectCollision() {
    if (
        playerX < obstacle.x + OBSTACLE_WIDTH &&
        playerX + PLAYER_WIDTH > obstacle.x &&
        playerY < obstacle.y + OBSTACLE_HEIGHT &&
        playerY + PLAYER_HEIGHT > obstacle.y||
        playerX < obstacle2.x + OBSTACLE_WIDTH &&
        playerX + PLAYER_WIDTH > obstacle2.y &&
        playerY < obstacle2.y + OBSTACLE_HEIGHT &&
        playerY + PLAYER_HEIGHT > obstacle2.y||
        playerX < obstacle3.x + OBSTACLE_WIDTH &&
        playerX + PLAYER_WIDTH > obstacle3.x &&
        playerY < obstacle3.y + OBSTACLE_HEIGHT &&
        playerY + PLAYER_HEIGHT > obstacle3.y
    ) {
        alert("Game over!");
        document.location.reload();
    }
}

function nextLevel() {
    level++; // augmenter le niveau
    playerY = canvas.height - PLAYER_HEIGHT; // réinitialiser la position du joueur
    obstacleX = -OBSTACLE_WIDTH; // réinitialiser la position de l'obstacle
    obstacleY = Math.random() * (canvas.height - OBSTACLE_HEIGHT); // réinitialiser la position de l'obstacle
    obstacleSpeed += 1; // augmenter la vitesse de l'obstacle
    playerSpeed += 1; // augmenter la vitesse du joueur
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    drawScore();
    drawLevel();
    moveObstacle();
    detectCollision();

}

document.addEventListener("keydown", (event) => {
     if (event.key === "ArrowUp") {
         playerY -= playerSpeed; // mise à jour de la position du joueur
         if (playerY + PLAYER_HEIGHT < 0) { // si le joueur atteint la fin de la map
             nextLevel(); // passer au niveau suivant
         }
    }
});

setInterval(draw, 10);
