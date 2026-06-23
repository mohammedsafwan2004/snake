const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const box = 20;

let snake = [
    {x: 10 * box, y: 10 * box}
];

let direction = "RIGHT";

let food = {
    x: Math.floor(Math.random()*25) * box,
    y: Math.floor(Math.random()*25) * box
};

let score = 0;

document.addEventListener("keydown", e => {

    if(e.key === "ArrowUp" && direction !== "DOWN")
        direction = "UP";

    if(e.key === "ArrowDown" && direction !== "UP")
        direction = "DOWN";

    if(e.key === "ArrowLeft" && direction !== "RIGHT")
        direction = "LEFT";

    if(e.key === "ArrowRight" && direction !== "LEFT")
        direction = "RIGHT";
});

function changeDirection(dir){

    if(dir === "up" && direction !== "DOWN")
        direction = "UP";

    if(dir === "down" && direction !== "UP")
        direction = "DOWN";

    if(dir === "left" && direction !== "RIGHT")
        direction = "LEFT";

    if(dir === "right" && direction !== "LEFT")
        direction = "RIGHT";
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    snake.forEach((segment,index)=>{

        ctx.fillStyle =
        index === 0 ? "#22c55e" : "#4ade80";

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#22c55e";

        ctx.fillRect(segment.x,segment.y,box,box);
    });

    ctx.fillStyle = "red";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "red";

    ctx.beginPath();
    ctx.arc(food.x+10,food.y+10,10,0,Math.PI*2);
    ctx.fill();

    let headX = snake[0].x;
    let headY = snake[0].y;

    if(direction === "UP") headY -= box;
    if(direction === "DOWN") headY += box;
    if(direction === "LEFT") headX -= box;
    if(direction === "RIGHT") headX += box;

    if(headX === food.x && headY === food.y){

        score++;
        document.getElementById("score").textContent = score;

        food = {
            x: Math.floor(Math.random()*25) * box,
            y: Math.floor(Math.random()*25) * box
        };

    } else {
        snake.pop();
    }

    const newHead = {
        x: headX,
        y: headY
    };

    if(
        headX < 0 ||
        headY < 0 ||
        headX >= canvas.width ||
        headY >= canvas.height ||
        snake.some(segment =>
            segment.x === headX &&
            segment.y === headY)
    ){
        alert(`Game Over! Score: ${score}`);
        location.reload();
    }

    snake.unshift(newHead);
}

setInterval(draw,100);