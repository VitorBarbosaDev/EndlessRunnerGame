// Select the canvas element from the HTML document
const canvas = document.querySelector('canvas');

// Get the 2D rendering context for the canvas
const c = canvas.getContext('2d');

// Set the canvas width and height to match the window's inner width and height
canvas.width  = 1024;
canvas.height = 576;

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