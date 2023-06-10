// Select the canvas element from the HTML document
const canvas = document.querySelector('canvas');

// Get the 2D rendering context for the canvas
const c = canvas.getContext('2d');

// Set the canvas width and height to match the window's inner width and height
canvas.width  = 1024;
canvas.height = 576;

// Define the gravity constant for the game
const gravity = .4;

let score = 0;
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
		this.color    = 'green';
	}
	
	// the draw method to draw the player on the canvas
	draw()
	{
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	
	// the update method to update the player's position and velocity
	update()
	{
		this.draw();
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		
		if(player.y + this.height >= canvas.height){
			this.position.y = canvas.height - this.height;
			this.velocity.y = 0;
		}
		
		this.checkBounds();
	}
	
	checkBounds()
	{
		// Define the padding
		const padding = 5;
		if(!gameStarted){
			this.position.x = 200;
			this.position.y = 250;
		}
		// If the player is not at the bottom of the canvas, apply gravity
		if (this.position.y + this.height + this.velocity.y <= canvas.height)
			{
				this.velocity.y += gravity;
			}
		// If the player is at the bottom of the canvas, set the vertical velocity to 0
		else
			{
				this.velocity.y = 0;
			}
		// If the player is not at the left or right edge of the canvas, apply horizontal velocity
		if (this.position.x + this.width + this.velocity.x <= canvas.width - padding && this.position.x + this.velocity.x >= padding)
			{
				this.velocity.x += 0;
			}
		// If the player is at the left or right edge of the canvas, set the horizontal velocity to 0
		else
			{
				this.velocity.x = 0;
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
	}
}

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
	
	update() 
	{
		if(gameStarted)
			{
				
				this.position.x -= this.velocity; // Subtract the velocity from the x-position
				if (this.position.x < -this.width) // If the object is off the left side of the canvas
					{
						this.position.x = canvas.width; // Set the x-position to the right side of the canvas 
					}
			}
		this.draw();
	}
}

class Obstacle extends GenericObject
{
	constructor({x, y, color, width, height, velocity})
	{
		super({x, y, color, width, height, velocity});
	}
}

let obstacles = [];


const player = new Player();
 

player.update();

resetGame();
function resetGame()
{
	
	obstacles = [new Obstacle({x: 500, y: 100, color: 'red', width: 30, height: 100, velocity: 3}),
		new Obstacle({x: 600, y: 0, color: 'red', width: 100, height: 130, velocity: 2}),
		new Obstacle({x: 600, y: 450, color: 'green', width: 100, height: 230, velocity: 2})];
	
	player.position = {x: 200, y: 250};
	
	gameStarted = false;
	
}

function animate()
{
	// Request the next animation frame
	requestAnimationFrame(animate);
	c.fillStyle = 'white';
	c.fillRect(0, 0, canvas.width, canvas.height);
	//update the players state
	player.update();
	
	// Draw the obstacles
	obstacles.forEach(obstacle => {obstacle.update();
	player.checkCollision(obstacle);});
}

animate();

// Add an event listener for mouse clicks on the canvas
canvas.addEventListener('click', () =>
{
	if(!gameStarted){
		gameStarted = true;
	
	}
	
	if(player.position.y > 30)
		{
			// Jump
			player.velocity.y = -10;
		}
	else
	{
		player.velocity.y = 0;
}
});