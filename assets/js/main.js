// Select the canvas element from the HTML document
const canvas = document.querySelector('canvas');
const startMenu   = document.getElementById('start-menu');
const playButton  = document.getElementById('play-button');
const howToButton = document.getElementById('how-to-button');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const gameOverMenu = document.getElementById("game-over");
const gameOverScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");



let countdownNumber = 3;  // 3 seconds countdown
// Get the 2D rendering context for the canvas
const c = canvas.getContext('2d');

// Set the canvas width and height to match the window's inner width and height
canvas.width  = 1024;
canvas.height = 576;

// Define the gravity constant for the game
const defaultGravity = 1000;
let gravity = 1000;

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
			gravity = 0;
			player.velocity.y = 0;
			}
		else{
			gravity = defaultGravity;
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
				gameOver();
			}
	}
	
	
	checkCollision(obstacle)
	{
		if (this.position.x < obstacle.position.x + obstacle.width &&
			this.position.x + this.width > obstacle.position.x &&
			this.position.y < obstacle.position.y + obstacle.height &&
			this.position.y + this.height > obstacle.position.y && gameStarted)
			{
				gameOver();
			}
		else if (this.position.x > obstacle.position.x + obstacle.width && gameStarted)
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

let countdownDisplay = "";  // A global variable for the countdown display

function startCountdown()
{
	countdownNumber = 4;
	

	
	let countdownInterval = setInterval(() =>
	                                    {
		                                    countdownNumber--;
		                                    
		                                  
		                                    
		                                    countdownDisplay = countdownNumber > .5 ? countdownNumber : "";
		                                    if (countdownNumber <= 0)
			                                    {
				                                    clearInterval(countdownInterval);
				                                    gameStarted = true;  // Starts the game
			                                    }
		                                    
		                                    c.fillText(countdownDisplay, canvas.width / 2, canvas.height / 2); // Redraw the countdown text after color change
	                                    }, 1000);
}

function gameOver(){
	gameOverMenu.style.display = "flex";
	gameStarted = false;
	
	gameOverScore.innerHTML = score;
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
	startMenu.style.display = "flex"; // Show the start menu when the game is not started
	
	
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
	
	// Draw the countdown display on every frame
	if (!gameStarted)
		{
			// Countdown Display
			c.font      = "50px Arial";
			c.textAlign = "center";
			
			switch (countdownNumber)
				{
					case 3:
						c.fillStyle = "yellow";
						break;
					case 2:
						c.fillStyle = "orange";
						break;
					case 1:
						c.fillStyle = "red";
						break;
					
				}
			c.fillText(countdownDisplay, canvas.width / 2, canvas.height / 2);
		}
	
	displayFps();
	
	displayScore()
	

	
	// Request the next animation frame
	requestAnimationFrame(animate);
}

animate();


restartButton.addEventListener('click', () =>{gameOverMenu.style.display = "none";resetGame();});

function playGame(){
	startMenu.style.display = "none"; // Hide the start menu when the play button is clicked
	startCountdown();  // Start countdown
	canvas.focus(); // Set focus on the canvas
}

playButton.addEventListener('click', () =>
{
	playGame();
});


howToButton.addEventListener('click', () =>
{
	modal.style.display = "block"; // Show the modal when the how to button is clicked
});
// When the user clicks on <span> (x), close the modal
span.onclick = function ()
	{
		modal.style.display = "none";
	}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event)
	{
		if (event.target === modal)
			{
				modal.style.display = "none";
			}
	}

function playerJump(){
	if (player.position.y > 30)
		{
			// Jump
			player.velocity.y = -300;
		}
	else
		{
			player.velocity.y = 0;
		}
}


// Add an event listener for mouse clicks on the canvas
canvas.addEventListener('click', () =>
{
	playerJump();
});

window.addEventListener('keydown', (event) =>{
	
	
	
	if(event.code === 'Space')
	{
		
		playerJump();
	}
})