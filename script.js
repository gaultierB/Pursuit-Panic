import {Obstacle} from "./obstacle.js";

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
let limitObstacle = 4;
const obstacleList= [];


class Obstacle{
    constructor(x,y,reverse){
        this.x=x;
        this.y=y;
        this.reverse = reverse;
    }

    draw(color){
        ctx.beginPath();
        ctx.rect(this.x, this.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    move(speed){
        if(!this.reverse){
            this.x += speed;
            if (this.x > canvas.width) {
                let valid;
                let i = 0;
                do{
                    console.log("generate number:",i);
                    i++;
                    this.y = Math.floor(Math.random() * (canvas.height - OBSTACLE_HEIGHT));
                    console.log("y=",this.y);
                    valid = this.verifyObstacleCollision();
                }while(!valid)
                this.x = -OBSTACLE_WIDTH;
                score++;
            }
        }
        else{
            this.x -= speed;
            if (this.x <= 0) {
                this.y = Math.random() * (canvas.height - OBSTACLE_HEIGHT);
                this.x = canvas.width;
                score++;
            }
        }
    }

    detectCollision(pPlayerX,pPlayerY,pPLAYER_HEIGHT,pPLAYER_WIDTH){
        if(pPlayerX < this.x + OBSTACLE_WIDTH &&
            pPlayerX + pPLAYER_WIDTH > this.x &&
            pPlayerY < this.y + OBSTACLE_HEIGHT &&
            pPlayerY + pPLAYER_HEIGHT > this.y)
            {
                return true;
            }
        else{
            return false;
        }
    }

    verifyObstacleCollision(){
            for(let i in obstacleList){
                if(obstacleList[i].y != this.y && obstacleList[i].x != this.x){
                    if(obstacleList[i].y < this.y + OBSTACLE_HEIGHT+50 &&
                        obstacleList[i].y + OBSTACLE_HEIGHT+50 > this.y&&
                        obstacleList[i].x < this.x + OBSTACLE_WIDTH &&
                        obstacleList[i].x + OBSTACLE_WIDTH > this.x)
                    {
                        console.warn("collision detected");
                        return false;
                    }
                }
                else{
                    console.log("it's me");
                }
            }
            return true;
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawObstacles(obstacle) {
    obstacle.draw("#FF0000");
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

function moveObstacle(obstacle) {
    obstacle.move(obstacleSpeed);
}

function detectCollision(obstacle) {
    if (
        obstacle.detectCollision(playerX,playerY,PLAYER_HEIGHT,PLAYER_WIDTH)
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
    drawScore();
    drawLevel();    
    obstacleList.forEach(moveObstacle);
    obstacleList.forEach(drawObstacles);
    obstacleList.forEach(detectCollision)

}

function createObstacle(){
    let reverse = false
    for(let i = 0 ; i<limitObstacle; i++){
        if(reverse){
            obstacleList.push(new Obstacle(0,-OBSTACLE_HEIGHT,reverse));
            reverse = false;
        }
        else{
            obstacleList.push(new Obstacle(canvas.width,-OBSTACLE_HEIGHT,reverse));
            reverse = true;
        }
    }
}

document.addEventListener("keydown", (event) => {
     if (event.key === "ArrowUp") {
         playerY -= playerSpeed; // mise à jour de la position du joueur
         if (playerY + PLAYER_HEIGHT < 0) { // si le joueur atteint la fin de la map
             nextLevel(); // passer au niveau suivant
         }
    }
});

createObstacle();
setInterval(draw, 10);
