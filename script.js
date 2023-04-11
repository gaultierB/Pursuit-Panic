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
let obstacleX = 0;
let obstacleY = -OBSTACLE_HEIGHT;
let score = 0;
let obstacleSpeed = 5;
let playerSpeed = 5; // vitesse du joueur
let level = 1;
let limitObstacle = 3;


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

//TODO multiple spawn obstacle
//TODO spawn obstacle not same case

//TODO funtion draw road
//TODO limit spawn obstacle on road

//TODO Object ?


//TODO Interface Start
function startGame() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const pseudo = document.getElementById("pseudo").value;
        localStorage.setItem("pseudo", pseudo);
        window.location.href = "hello.html";
    });

}

//TODO Interface Game Over Restart Best Score
function showGameOverMenu() {
    let menuContainer = document.createElement("div");
    menuContainer.style.position = "absolute";
    menuContainer.style.top = "50%";
    menuContainer.style.left = "50%";
    menuContainer.style.transform = "translate(-50%, -50%)";
    menuContainer.style.backgroundColor = "#FFFFFF";
    menuContainer.style.padding = "20px";
    menuContainer.style.border = "2px solid #000000";
    menuContainer.style.textAlign = "center";

    // Ajouter le texte "Game Over" au conteneur
    let gameOverText = document.createElement("h1");
    gameOverText.innerText = "Game Over";
    menuContainer.appendChild(gameOverText);

    // Ajouter le champ meilleur score au conteneur
    let bestScoreLabel = document.createElement("label");
    bestScoreLabel.innerText = "Dernier Score : ";
    let bestScoreInput = document.createElement("input");
    bestScoreInput.type = "text";
    bestScoreInput.value = localStorage.getItem("bestScore") || 0;
    bestScoreInput.disabled = true;
    menuContainer.appendChild(bestScoreLabel);
    menuContainer.appendChild(bestScoreInput);

    // Ajouter le bouton restart au conteneur
    let restartButton = document.createElement("button");
    restartButton.innerText = "Rejouer";
    restartButton.onclick = () => {
        localStorage.setItem("bestScore", score);
        document.location.reload();
    };

    //récupérer les 5 meilleurs scores et les afficher lorsque le jeu est terminé
    let bestScore = localStorage.getItem("bestScore") || 0;
    if (score > bestScore) {
        localStorage.setItem("bestScore", score);
    }
    let bestScoreList = document.createElement("ul");
    let bestScoreListTitle = document.createElement("h2");
    bestScoreListTitle.innerText = "Meilleurs scores";
    menuContainer.appendChild(bestScoreListTitle);
    menuContainer.appendChild(bestScoreList);
    let bestScores = JSON.parse(localStorage.getItem("bestScores")) || [];
    bestScores.push(score);
    bestScores.sort((a, b) => b - a);
    bestScores = bestScores.slice(0, 5);
    localStorage.setItem("bestScores", JSON.stringify(bestScores));
    bestScores.forEach((score) => {
        let bestScoreItem = document.createElement("li");
        bestScoreItem.innerText = score;
        bestScoreList.appendChild(bestScoreItem);
    }
    );

    menuContainer.appendChild(restartButton);

    // Ajouter le conteneur au corps de la page
    document.body.appendChild(menuContainer);
    gameOver = true;

}

//TODO Interface Game Over Restart Best Score


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

setInterval(draw, 10);

