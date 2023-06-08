// Select the canvas element from the HTML document
const canvas = document.querySelector('canvas');

// Get the 2D rendering context for the canvas
const c = canvas.getContext('2d');

// Set the canvas width and height to match the window's inner width and height
canvas.width  = 1024;
canvas.height = 576;

class Player {
	
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