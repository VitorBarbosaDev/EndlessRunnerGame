// Select the canvas element from the HTML document
const canvas = document.querySelector('canvas');

// Get the 2D rendering context for the canvas
const c = canvas.getContext('2d');

// Set the canvas width and height to match the window's inner width and height
canvas.width  = 1024;
canvas.height = 576;

// Define the gravity constant for the game
const gravity = .5;

class Player {
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
	update(){
		this.draw();
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		
		this.checkBounds();
	}
	
	checkBounds(){
		// Define the padding
		const padding = 5;
		
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
}

class GenericObject
{
	constructor({x, y, image})
	{
		this.position = {x: x, y: y};
		this.image    = image;
		this.width    = image.width;
		this.height   = image.height;
	}
	
	draw()
	{
		c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
}

class Platform extends GenericObject
{
	constructor({x, y, image})
	{
		super({x, y, image});
	}
}


function animate()
{
	c.fillStyle = 'white';
	c.fillRect(0, 0, canvas.width, canvas.height);
}

animate();