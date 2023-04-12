export class Obstacle{
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