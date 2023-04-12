import {Road} from "./Road.js"

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 30;

const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = 50;

const ROAD_HEIGHT = OBSTACLE_HEIGHT;
const ROAD_WIDTH = canvas.width;
const roadX = 0;

let playerX = canvas.width / 2 - PLAYER_WIDTH / 2;
let playerY = canvas.height - PLAYER_HEIGHT - 10;

let obstacleX = 0;
let obstacleY = -OBSTACLE_HEIGHT;
let score = 0;
let obstacleSpeed = 5;
let playerSpeed = 5; // vitesse du joueur
let level = 1;
let limitObstacle = 3;
let limitRoad = 3;
let listRoads = [];


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

function drawLevel() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Level: " + level, 8, 50);
}

function moveObstacle() {
    obstacleX += obstacleSpeed;
    if (obstacleX > canvas.width) {
        obstacleY = Math.random() * (canvas.height - OBSTACLE_HEIGHT);
        obstacleX = -OBSTACLE_WIDTH;
        score++;
    }
}
function detectCollision2(rect1X, rect1Y, rect1Width, rect1Height, rect2X, rect2Y, rect2Width, rect2Height) {
    let rect1Left = rect1X;
    let rect1Right = rect1X + rect1Width;
    let rect1Top = rect1Y;
    let rect1Bottom = rect1Y + rect1Height;
    let rect2Left = rect2X;
    let rect2Right = rect2X + rect2Width;
    let rect2Top = rect2Y;
    let rect2Bottom = rect2Y + rect2Height;

    if (rect1Left < rect2Right &&
        rect1Right > rect2Left &&
        rect1Top < rect2Bottom &&
        rect1Bottom > rect2Top) {
        return true;
    } else {
        return false;
    }
}
function checkRoad(newRoadY){
    if(detectCollision2(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT + 50, roadX, newRoadY, ROAD_WIDTH, ROAD_HEIGHT)){
        return true;
    }
    for (let lastRoadY in listRoads){
        if(detectCollision2(roadX, lastRoadY, ROAD_WIDTH, ROAD_HEIGHT, roadX, newRoadY, ROAD_WIDTH, ROAD_HEIGHT)){
            return true;
        }

    }
    return false;
}

function genRoad() {
    // On génère la première route
    let lastRoadY = Math.random() * (canvas.height - ROAD_HEIGHT);
    listRoads.push(lastRoadY);

    // On génère les routes suivantes
    for (let i = 1; i < limitRoad; i++) {
        let newRoadY = Math.random() * (canvas.height - ROAD_HEIGHT);

        while (checkRoad(newRoadY)) {
            newRoadY = Math.random() * (canvas.height - ROAD_HEIGHT);
        }
        listRoads.push(newRoadY);
    }
    console.log("----");
    console.log(listRoads);
    console.log("" + playerX + playerY);
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

function drawRoad(roadY){
    ctx.beginPath();
    ctx.rect(roadX, roadY, ROAD_WIDTH, ROAD_HEIGHT);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(roadX, roadY, ROAD_WIDTH , ROAD_HEIGHT - 150);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function drawAllRoad(){
    listRoads.forEach(roadY => drawRoad(roadY))
}

function nextLevel() {
    level++; // augmenter le niveau
    playerY = canvas.height - PLAYER_HEIGHT; // réinitialiser la position du joueur
    obstacleX = -OBSTACLE_WIDTH; // réinitialiser la position de l'obstacle
    obstacleY = Math.random() * (canvas.height - OBSTACLE_HEIGHT); // réinitialiser la position de l'obstacle
    limitRoad += 1;
    obstacleSpeed += 1; // augmenter la vitesse de l'obstacle
    playerSpeed += 1; // augmenter la vitesse du joueur
    genRoad();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.rect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT - 150);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

    drawAllRoad();
    drawPlayer();
    drawObstacle();
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

genRoad();
let road = new Road(canvas, playerX, playerY);
road.draw(ctx);
setInterval(draw, 10);

