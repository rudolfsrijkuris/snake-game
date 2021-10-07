const canvas = document.getElementById("game"); 
const ctx = canvas.getContext("2d");

const ground = new Image(); //jauns objekts - attēls
ground.src = "img/ground.png"; //ceļiņš līdz objektam

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32; //solis kastes izmērā
let score = 0;

let food = {
	x: Math.floor(Math.random()*17+1)*box,
	y: Math.floor(Math.random()*15+3)*box,
}

let snake = [];
snake[0] = {
	x: 9*box,
	y: 10*box,
}

document.addEventListener("keydown", direction);

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)clearInterval(game);
	}
}

let dir;

function direction(event){
	if(event.keyCode == 65) dir = "left";
	if(event.keyCode == 87) dir = "up";
	if(event.keyCode == 68) dir = "right";
	if(event.keyCode == 83) dir = "down";
}


function drawGame(){

	
	
	ctx.drawImage(ground, 0, 0);
	ctx.drawImage(foodImg, food.x, food.y);
	
	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText("Score "+score, 2.5*box, 1.7*box);
	
	for(let i = 0; i < snake.length; i++){
		ctx.fillStyle = "green";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
	}
	
	//snake.pop();

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	

	if(snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor(Math.random()*17+1)*box,
			y: Math.floor(Math.random()*15+3)*box,
		}
	} else {
		snake.pop();
	}

	if (snakeX < box || snakeY < box || snakeX > 17*box || snakeY > 17*box)clearInterval(game);
	
	
	//snakeX = snakeX - box;
	if(dir == "left")snakeX -= box;
	if(dir == "right")snakeX += box;
	if(dir == "up")snakeY -= box;
	if(dir == "down")snakeY += box;
	
	let newHead = {
		x: snakeX,
		y: snakeY
	}

	snake.unshift(newHead);
	

	
}


let game = setInterval(drawGame, 100);

eatTail(newHead, snake);