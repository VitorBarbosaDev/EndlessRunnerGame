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
const leaderboardButton = document.getElementById("leaderboard-button");
const playerNameInput = document.getElementById('player-name');
const leaderboardModal       = document.getElementById("myleaderboard");
let closeLeaderboardButton = document.getElementById("leaderboard-close");
const fullscreenButton = document.getElementById("fullscreen-button");
let countdownNumber = 3;  // 3 seconds countdown
// Get the 2D rendering context for the canvas
const c = canvas.getContext('2d');

// Set the canvas width and height to match the window's inner width and height
canvas.width  = Math.min(window.innerWidth, 1024);
canvas.height = Math.min(window.innerHeight, 576);

// Responsive text sizes
let baseFontSize = Math.sqrt(canvas.width * canvas.height) / 20;  


import {firebaseConfig} from './secrets.js';

import {
	getDocs,
	getFirestore,
	collection,
	addDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';





// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function addPlayerScore(name,score)
{
	const playerName = playerNameInput.value || "Anonymous";
	try
		{
			const docRef = await addDoc(collection(db, "leaderboard"), {
				name: playerName,
				score: score
			});
			console.log("Document written with ID: ", docRef.id);
		}
	catch (e)
		{
			console.error("Error adding document: ", e);
		}
}




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
		this.position = {x: canvas.width * 0.1, y: canvas.height * 0.5};
		this.velocity = {x: 0, y: 0};
		this.width    = Math.max(canvas.width * 0.01, 30);
		this.height   = Math.max(canvas.height * 0.01, 30);
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
				gravity           = 0;
				player.velocity.y = 0;
			}
		else
			{
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
				gameOver().catch(error => console.error("Error in gameOver: ", error));
			}
	}
	
	
	checkCollision(obstacle)
	{
		if (this.position.x < obstacle.position.x + obstacle.width &&
			this.position.x + this.width > obstacle.position.x &&
			this.position.y < obstacle.position.y + obstacle.height &&
			this.position.y + this.height > obstacle.position.y && gameStarted)
			{
				gameOver().catch(error => console.error("Error in gameOver: ", error));
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
		this.width = Math.max(canvas.width * 0.02, 100); // Adjust the width here
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
				if (this.position.x < -this.width - obstacleDistance / 2.5)
					{
						this.position.x = canvas.width;
						obstacleSpeed += 0.02;
						score += 50;
						if (this.type === ObstacleType.TOP)
							{
								this.height = Math.random() * (canvas.height * 0.5 - canvas.height * 0.2) + canvas.height * 0.2;
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

let topScores = null;
let currentGameScore = 0;
let scoreSubmitted = false;
async function gameOver()
{
	
	
	gameOverMenu.style.display = "flex";
	gameStarted                = false;
	currentGameScore           = score;
	gameOverScore.innerHTML    = currentGameScore;
	score                      = 0; // reset score after game over
	
	//Firebase operations 
	if (!scoreSubmitted)
		{
			try
				{
					scoreSubmitted = true;
					await addPlayerScore(playerNameInput.value, currentGameScore);
					topScores = await getScores(); // fetch scores and store them in topScores
					console.log(topScores);
				}
			catch (error)
				{
					console.error("Firebase error:", error);
				}
		}

	
	
}


async function getScores()
{
	const querySnapshot = await getDocs(collection(db, "leaderboard"));
	const scores        = [];
	querySnapshot.forEach((doc) =>
	                      {
		                      const data = doc.data();
		                      if (data.score > 0)
			                      {
				                      scores.push(data);
			                      }
	                      });
	
	// Sort the scores in descending order
	scores.sort((a, b) => b.score - a.score);
	
	return scores;
}


function displayLeaderboard()
{
	const leaderboardContent     = leaderboardModal.querySelector('.modal-content');
	leaderboardContent.innerHTML = `
    <div class="modal-header">
      <h1>Here are the Top Scores <i class="fa-solid fa-gamepad"></i></h1>
      <span class="close">&times;</span>
    </div>
  `;
	topScores.forEach((score, index) =>
	                  {
		                  leaderboardContent.innerHTML += `<p>${index + 1}. ${score.name}: ${score.score}</p>`;
	                  });
	leaderboardModal.style.display = "block";
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
	player.position = {x: canvas.width * 0.1, y: canvas.height * 0.5};
	gameStarted     = false;
	scoreSubmitted = false; // Reset the score submission state
	startMenu.style.display = "flex"; // Show the start menu when the game is not started
	
	// Determine the number of obstacles based on canvas width
	let numObstacles  = Math.floor(canvas.width / 300); // One pair of obstacles every 300 pixels
	
	
	
	// Creating responsive obstacles +1 to make sure there is always an obstacle on the screen
	for (let i = 0; i < numObstacles + 1; i++)
		{
			// Make the height of the obstacle responsive to the canvas height
			const randomHeight = Math.random() * (canvas.height * 0.5 - canvas.height * 0.2) + canvas.height * 0.2;
			
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


function displayFps()
{
	// FPS
	let now      = performance.now();
	let duration = (now - lastTime) / 1000;
	lastTime     = now;
	let fps      = Math.round(1 / duration);
	// FPS Display
	c.font       = baseFontSize * 0.4 + "px Arial";  // Make the font size responsive
	c.fillStyle  = "black";
	c.fillText("FPS: " + fps, 100, 50);
}

function displayScore()
{
	// Score Display
	c.font      = baseFontSize * 0.6 + "px Arial";  // Make the font size responsive
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
	//check if the player has entered their name
	if (playerNameInput.value.trim() === "")
		{
			alert("Please enter your name before playing.");
			return;
		}
	startMenu.style.display = "none"; // Hide the start menu when the play button is clicked
	startCountdown();  // Start countdown
	canvas.focus(); // Set focus on the canvas
}

// Full-screen support
function toggleFullScreen()
{
	if (!document.fullscreenElement)
		{
			document.documentElement.requestFullscreen();
		}
	else
		{
			if (document.exitFullscreen)
				{
					document.exitFullscreen();
				}
		}
}

// Full-screen button event listener
fullscreenButton.addEventListener('click', toggleFullScreen);



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
		else if (event.target === leaderboardModal)
			{
				leaderboardModal.style.display = "none";
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

// When the user clicks on the leaderboard button, display the leaderboard
leaderboardButton.addEventListener('click',  () =>
{
	displayLeaderboard();
});

closeLeaderboardButton.onclick = function ()
	{
		leaderboardModal.style.display = "none";
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

// Listen for fullscreen change and resize the canvas
document.addEventListener('fullscreenchange', adjustPositions);
window.addEventListener('resize', adjustPositions);

function adjustPositions()
{
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	baseFontSize  = Math.sqrt(canvas.width * canvas.height) / 20;  // Recalculate base font size when the canvas size changes
	
	// Adjust player's position
	player.position = {x: canvas.width * 0.6, y: canvas.height * 0.5};
	
	// Adjust obstacles' positions
	obstacles.forEach(obstacle =>
	                  {
		                  if (obstacle.position.x < player.position.x)
			                  {
				                  obstacle.position.x -= canvas.width * 0.2;
			                  }
		                  else
			                  {
				                  obstacle.position.x += canvas.width * 0.2;
			                  }
	                  });
	
	// Call resetGame() 
	resetGame();
}


