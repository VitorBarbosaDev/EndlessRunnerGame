// Select the canvas element from the HTML document
const canvas = document.querySelector('canvas');

// Get the 2D rendering context for the canvas
const c = canvas.getContext('2d');

// Set the canvas width and height to match the window's inner width and height
canvas.width  = 1024;
canvas.height = 576;

// Define the gravity constant for the game
const gravity = 1000;

let score       = 0;
let gameStarted = false;

class Player
{
	constructor()
	{
		// Initialize the player's position, velocity, dimensions, and color
		this.position = {x: 100, y: 100};
		this.velocity = {x: 0, y: 0};
		this.width    = 30;
		this.height   = 30;
		this.color    = 'blue';
	}
	
	// the draw method to draw the player on the canvas
	draw()
	{
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	
	// the update method to update the player's position and velocity
	update(deltaTime)
	{
		this.draw();
		
		// Convert deltaTime from ms to s
		const delta = deltaTime / 1000;
		
		this.position.y += this.velocity.y * delta;
		this.position.x += this.velocity.x * delta;
		
		this.checkBounds(delta);
	}
	
	checkBounds(delta)
	{
		
		if (!gameStarted)
			{
				this.position.x = 200;
				this.position.y = 250;
			}
		
		if (player.y + this.height >= canvas.height)
			{
				this.position.y = canvas.height - this.height;
				this.velocity.y = 0;
			}
		
		//check if player is at the top of the canvas
		if (this.position.y <= 0)
			{
				this.position.y = 0;
				this.velocity.y = 0;
			}
		else if (this.position.y + this.height < canvas.height) // Only apply gravity if the player is not at the top of the canvas
			{
				this.velocity.y += gravity * delta;
			}
		
		//check if player is below the canvas
		if (this.position.y + this.height > canvas.height)
			{
				resetGame();
			}
	}
	
	
	checkCollision(obstacle)
	{
		if (this.position.x < obstacle.position.x + obstacle.width &&
			this.position.x + this.width > obstacle.position.x &&
			this.position.y < obstacle.position.y + obstacle.height &&
			this.position.y + this.height > obstacle.position.y)
			{
				// Collision detected, reset player's position
				this.position = {x: 200, y: 250};
				resetGame();
			}
		else if (this.position.x > obstacle.position.x + obstacle.width)
			{
				// Player passed the obstacle, increment the score
				score += 10;  // Increment the score by a certain value, here 10
			}
	}
	
}

let obstacleSpeed = 1;

class GenericObject
{
	constructor({x, y, color, width, height, velocity})
	{
		this.position = {x: x, y: y};
		this.color    = color;
		this.width    = width;
		this.height   = height;
		this.velocity = velocity || 0;
	}
	
	draw()
	{
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	
	update(deltaTime)
	{
		if (gameStarted)
			{
				const delta = deltaTime / 1000;
				
				this.position.x -= this.velocity * obstacleSpeed * delta;
				if (this.position.x < -this.width)
					{
						this.position.x = canvas.width;
						obstacleSpeed += .1;
					}
			}
		this.draw();
	}
}

const ObstacleType = {
	TOP: 'top',
	BOTTOM: 'bottom'
};


class Obstacle extends GenericObject
{
	constructor({x, y, color, width, height, velocity, type})
	{
		super({x, y, color, width, height, velocity});
		this.type = type;
	}
	
	update(deltaTime)
	{
		if (gameStarted)
			{
				const delta = deltaTime / 1000;
				
				this.position.x -= this.velocity * obstacleSpeed * delta;
				if (this.position.x < -this.width -obstacleDistance/2.5)
					{
						this.position.x = canvas.width;
						obstacleSpeed += .02;
						score += 50;
						if (this.type === ObstacleType.TOP)
							{
								this.height = Math.random() * (375 - 120) + 120;
							}
						else if (this.type === ObstacleType.BOTTOM)
							{
								let topObstacle = obstacles.find(obstacle =>
									                                 obstacle.type === ObstacleType.TOP &&
									                                 obstacle.position.x === this.position.x
								);
								
								if (topObstacle)
									{
										this.position.y = topObstacle.height + gap;
										this.height     = canvas.height - this.position.y;
									}
							}
					}
			}
		this.draw();
	}
	
}


let obstacles = [];
let gap              = 150;  // The gap size between the top and bottom obstacles
let obstacleDistance = 300;  // The horizontal distance between obstacles

const player = new Player();


player.update();

resetGame();


function resetGame()
{
	obstacles       = [];
	obstacleSpeed   = 1;
	score           = 0;
	player.position = {x: 200, y: 250};
	gameStarted     = false;
	
	
	
	
	// Creating four pairs of obstacles
	for (let i = 0; i < 4; i++)
		{
			const randomHeight = Math.random() * (300 - 130) + 130;
			
			obstacles.push(
				new Obstacle({
					             x: 800 + i * obstacleDistance,
					             y: 0,
					             color: 'red',
					             width: 100,
					             height: randomHeight,
					             velocity: 300,
					             type: ObstacleType.TOP
				             }),
				new Obstacle({
					             x: 800 + i * obstacleDistance,
					             y: randomHeight + gap,
					             color: 'green',
					             width: 100,
					             height: canvas.height - randomHeight - gap,
					             velocity: 300,
					             type: ObstacleType.BOTTOM
				             })
			);
		}
	
}


function displayFps(){
	// FPS
	let now      = performance.now();
	let duration = (now - lastTime) / 1000;
	
	lastTime = now;
	
	let fps = Math.round(1 / duration);
	
	// FPS Display
	c.font      = "20px Arial";
	c.fillStyle = "black";
	c.fillText("FPS: " + fps, 100, 50);
	
}

function displayScore(){
	// Score Display
	c.font      = "30px Arial";
	c.fillStyle = "black";
	c.textAlign = "center";  // This will center the text based on the position provided.
	c.fillText("Score: " + score, canvas.width / 2, 50);
}


let fps = 60;
let lastTime = 0;

function animate(time = 0)
{
	const deltaTime = time - lastTime;
	lastTime        = time;
	
	c.fillStyle = 'white';
	c.fillRect(0, 0, canvas.width, canvas.height);
	//update the players state
	player.update(deltaTime);
	
	// Draw the obstacles
	obstacles.forEach(obstacle =>
	                  {
		                  obstacle.update(deltaTime);
		                  player.checkCollision(obstacle);
	                  });
	
	displayFps();
	
	displayScore()

	
	
	// Request the next animation frame
	requestAnimationFrame(animate);
}

animate();


// Add an event listener for mouse clicks on the canvas
canvas.addEventListener('click', () =>
{
	if (!gameStarted)
		{
			gameStarted = true;
			
		}
	
	if (player.position.y > 30)
		{
			// Jump
			player.velocity.y = -300;
		}
	else
		{
			player.velocity.y = 0;
		}
});