


function loadSinglePlayerPage() {
	const gameContainer = document.getElementById('contentdiv');
	gameContainer.innerHTML = `
	<style>body {background-color: black;}</style>
	<canvas id="gameCanvas" width="800" height="600"></canvas>
	<div id="modal">
		<div id="modalContent">
		<button id="modalButton">Reset</button>
		<p id="modalMessage" style="font-weight: bold;"></p>
		</div>
	</div>`;
	const script = document.createElement('script');
	script.src = '../js/1p.js';
	document.body.appendChild(script);
	script.onload = function() {
		if (typeof window.startSingleGame === "function") {
			window.startSingleGame();
		} else {
			console.error("startSingleGame is not defined");
		}
	};
}

function load2PlayerPage() {
	const gameContainer = document.getElementById('contentdiv');
	gameContainer.innerHTML = `
	<style>body {background-color: black;}</style>
	<canvas id="gameCanvas" width="800" height="600"></canvas>
	<div id="modal">
		<div id="modalContent">
		<button id="modalButton">Reset</button>
		<p id="modalMessage" style="font-weight: bold;"></p>
		</div>
	</div>`;
	const script = document.createElement('script');
	script.src = '../js/2p.js';
	document.body.appendChild(script);
	script.onload = function() {
		if (typeof window.start2PlayerGame === "function") {
			window.start2PlayerGame();
		} else {
			console.error("start2PlayerGame is not defined");
		}
	};
}



function load3PlayerPage() {
	const gameContainer = document.getElementById('contentdiv');
	gameContainer.innerHTML = `
	<style>body {background-color: black;}</style>
	<canvas id="gameCanvas" width="800" height="600"></canvas>
	<div id="modal">
		<div id="modalContent">
		<button id="modalButton">Reset</button>
		<p id="modalMessage" style="font-weight: bold;"></p>
		</div>
	</div>`;
	const script = document.createElement('script');
	script.src = '../js/3p.js';
	document.body.appendChild(script);
	script.onload = function() {
		if (typeof window.start3PlayerGame === "function") {
			window.start3PlayerGame();
		} else {
			console.error("start3PlayerGame is not defined");
		}
	};
}



function load4PlayerPage() {
	const gameContainer = document.getElementById('contentdiv');
	gameContainer.innerHTML = `
	<style>body {background-color: black;}</style>
	<canvas id="gameCanvas" width="800" height="600"></canvas>
	<div id="modal">
		<div id="modalContent">
		<button id="modalButton">Reset</button>
		<p id="modalMessage" style="font-weight: bold;"></p>
		</div>
	</div>`;
	const script = document.createElement('script');
	script.src = '../js/4p.js';
	document.body.appendChild(script);
	script.onload = function() {
		if (typeof window.start4PlayerGame === "function") {
			window.start4PlayerGame();
		} else {
			console.error("start4PlayerGame is not defined");
		}
	};
}


<<<<<<< HEAD
=======

// function loadTournamentPage() {
// 	const gameContainer = document.getElementById('contentdiv');
// 	gameContainer.innerHTML = `
// 	<div id="modal" style="display:none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.8); color: white; padding: 20px; border-radius: 10px; text-align: center;">
// 		<p id="modalMessage">Modal message will appear here.</p>
// 	</div><script src="../js/tournament.js"></script>`;
// 	loadTournamentAndStart()
// }




// function start2PlayerGame() {
//     const canvas = document.getElementById("gameCanvas");
//     const ctx = canvas.getContext("2d");
	
//     const fieldWidth = canvas.width;
//     const fieldHeight = canvas.height;
//     const paddleWidth = 10;
//     const paddleHeight = 60;
//     const ballRadius = 8;
//     const paddleSpeed = 5;
//     const ballSpeed = 4;
//     const maxScore = 1;
	
//     let paddle1Y = (fieldHeight - paddleHeight) / 2;
//     let paddle2Y = (fieldHeight - paddleHeight) / 2;
//     let ballX = fieldWidth / 2;
//     let ballY = fieldHeight / 2;
//     let ballDirectionX = 1;
//     let ballDirectionY = Math.random() * 2 - 1;
//     let player1Score = 0;
//     let player2Score = 0;
	
//     let paddle1Direction = 0;
//     let paddle2Direction = 0;
	
//     let keys = {
//         w: false,
//         s: false,
//         ArrowUp: false,
//         ArrowDown: false,
//     };

//     let player2Name =  prompt("Enter Player 2's name:") || "Opponent";
	
//     function playSound(soundFilePath) {
//         const sound = new Audio(soundFilePath);
//         sound.play();
//     }
	
	
//     window.addEventListener("keydown", (e) => {
//         if (e.key === "w") keys.w = true;
//         if (e.key === "s") keys.s = true;
//         if (e.key === "ArrowUp") keys.ArrowUp = true;
//         if (e.key === "ArrowDown") keys.ArrowDown = true;
//     });
	
//     window.addEventListener("keyup", (e) => {
//         if (e.key === "w") keys.w = false;
//         if (e.key === "s") keys.s = false;
//         if (e.key === "ArrowUp") keys.ArrowUp = false;
//         if (e.key === "ArrowDown") keys.ArrowDown = false;
//     });
	
//     const modal = document.getElementById("modal");
//     const modalMessage = document.getElementById("modalMessage");
//     const modalButton = document.getElementById("modalButton");
	
//     modalButton.addEventListener("click", () => {
//         modal.style.display = "none";
//         resetGame();
//     });
	
//     function gameLoop() {
//         if (player1Score >= maxScore || player2Score >= maxScore) return;
	
//         update();
//         draw();
//         requestAnimationFrame(gameLoop);
//     }
	
//     function update() {
//         if (keys.w && paddle1Y > 0) paddle1Y -= paddleSpeed;
//         if (keys.s && paddle1Y < fieldHeight - paddleHeight) paddle1Y += paddleSpeed;
//         if (keys.ArrowUp && paddle2Y > 0) paddle2Y -= paddleSpeed;
//         if (keys.ArrowDown && paddle2Y < fieldHeight - paddleHeight) paddle2Y += paddleSpeed;
	
//         ballX += ballDirectionX * ballSpeed;
//         ballY += ballDirectionY * ballSpeed;
	
//         if (ballY <= 0 || ballY >= fieldHeight) {
//             ballDirectionY = -ballDirectionY;
//         }
	
//         if (ballX <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
//             ballDirectionX = -ballDirectionX;
//             playSound("../assets/audio/L-Paddle-Hit.mp3");
//         }
//         if (ballX >= fieldWidth - paddleWidth - ballRadius && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
//             ballDirectionX = -ballDirectionX;
//             playSound("../assets/audio/R-Paddle-Hit.mp3");
//         }
	
//         if (ballX <= 0) {
//             player2Score++;
//             playSound("../assets/audio/score.mp3");
//             resetBall();
//         }
//         if (ballX >= fieldWidth) {
//             player1Score++;
//             playSound("../assets/audio/score.mp3");
//             resetBall();
//         }
//     }
	
//     function resetBall() {
//         ballX = fieldWidth / 2;
//         ballY = fieldHeight / 2;
//         ballDirectionX = -ballDirectionX;
//         ballDirectionY = Math.random() * 2 - 1;
	
//         if (player1Score >= maxScore) {
//             showModal(f"{user.username} Wins!");
			
//             const formData = new FormData();
//             formData.append('player2', player2Name);
//             formData.append('player1_score', player1Score);
//             formData.append('player2_score', player2Score);
//             const csrftoken = getCookie('csrftoken');
//             fetch('https://localhost:8008/api/add_match/', {
//                 method: 'POST',
//                 credentials: 'include',  
//                 headers: {
//                     'X-CSRFToken': csrftoken 
//                 },
//                 body: formData  
//             })
//             .then(response => response.json())
//             .then(data => console.log('Match added:', data))
//             .catch(error => console.error('Error:', error));
//         }
//         if (player2Score >= maxScore) {
//             showModal("Player 2 Wins!");
//         }
//     }
		
	
//     function showModal(message) {
//         modalMessage.textContent = message;
//         modal.style.display = "flex";
//     }
	
//     function draw() {
//         ctx.clearRect(0, 0, fieldWidth, fieldHeight);
	
//         const barCount = 10;
//         const barSpacing = fieldHeight / (barCount + 1);
//         ctx.fillStyle = "#000";
//         for (let i = 1; i <= barCount; i++) {
//             const barY = i * barSpacing;
//             ctx.fillRect(fieldWidth / 2 - 1, barY - 5, 2, 10);
//         }
	
//         ctx.fillStyle = "#FFF";
//         ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
//         ctx.fillRect(fieldWidth - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
	
//         ctx.fillStyle = "#FFF";
//         ctx.beginPath();
//         ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
//         ctx.fill();
	
//         ctx.fillStyle = "#FFF";
//         ctx.font = "30px Arial";
//         ctx.fillText(user.username, fieldWidth / 4, 30);
//         ctx.fillText(player1Score, fieldWidth / 4, 60);
//         ctx.fillText(player2Name, fieldWidth * 3 / 4, 30);
//         ctx.fillText(player2Score, fieldWidth * 3 / 4, 60);
//     }
	
//     gameLoop();
	
// }    

// function start3PlayerGame() {
//     const canvas = document.getElementById("gameCanvas");
//     const ctx = canvas.getContext("2d");

//     const fieldWidth = canvas.width;
//     const fieldHeight = canvas.height;
//     const paddleWidth = 10;
//     const paddleHeight = 60;
//     const ballRadius = 8;
//     const paddleSpeed = 5;
//     const ballSpeed = 4;
//     const maxScore = 10;

//     let paddle1Y = (fieldHeight - paddleHeight) / 2;
//     let paddle2Y = (fieldHeight - paddleHeight) / 2;
//     let paddle3Y = (fieldHeight - paddleHeight) / 2;
//     let paddle3X = fieldWidth / 4;
//     let ballX = fieldWidth / 2;
//     let ballY = fieldHeight / 2;
//     let ballDirectionX = 1;
//     let ballDirectionY = Math.random() * 2 - 1;
//     let player1Score = 0;
//     let player2Score = 0;
//     let player3Score = 0;

//     let keys = {
//         w: false,
//         s: false,
//         ArrowUp: false,
//         ArrowDown: false,
//         c: false,
//         v: false,
//     };

//     // Ask for player names
//     let player2Name = prompt("Enter Player 2's name:") || "Player 2";
//     let player3Name = prompt("Enter Player 3's name:") || "Player 3";

//     function playSound(soundFilePath) {
//         const sound = new Audio(soundFilePath);
//         sound.play();
//     }

//     window.addEventListener("keydown", (e) => {
//         if (e.key === "w") keys.w = true;
//         if (e.key === "s") keys.s = true;
//         if (e.key === "ArrowUp") keys.ArrowUp = true;
//         if (e.key === "ArrowDown") keys.ArrowDown = true;
//         if (e.key === "c") keys.c = true;
//         if (e.key === "v") keys.v = true;
//     });

//     window.addEventListener("keyup", (e) => {
//         if (e.key === "w") keys.w = false;
//         if (e.key === "s") keys.s = false;
//         if (e.key === "ArrowUp") keys.ArrowUp = false;
//         if (e.key === "ArrowDown") keys.ArrowDown = false;
//         if (e.key === "c") keys.c = false;
//         if (e.key === "v") keys.v = false;
//     });

//     const modal = document.getElementById("modal");
//     const modalMessage = document.getElementById("modalMessage");
//     const modalButton = document.getElementById("modalButton");

//     modalButton.addEventListener("click", () => {
//         modal.style.display = "none";
//         resetGame();
//     });

//     function gameLoop() {
//         if (player1Score >= maxScore || player2Score >= maxScore || player3Score >= maxScore) return;

//         update();
//         draw();
//         requestAnimationFrame(gameLoop);
//     }

//     function update() {
//         if (keys.w && paddle1Y > 0) paddle1Y -= paddleSpeed;
//         if (keys.s && paddle1Y < fieldHeight - paddleHeight) paddle1Y += paddleSpeed;
//         if (keys.ArrowUp && paddle2Y > 0) paddle2Y -= paddleSpeed;
//         if (keys.ArrowDown && paddle2Y < fieldHeight - paddleHeight) paddle2Y += paddleSpeed;
//         if (keys.c && paddle3Y > 0) paddle3Y -= paddleSpeed;
//         if (keys.v && paddle3Y < fieldHeight - paddleHeight) paddle3Y += paddleSpeed;

//         ballX += ballDirectionX * ballSpeed;
//         ballY += ballDirectionY * ballSpeed;

//         if (ballY <= 0 || ballY >= fieldHeight) {
//             ballDirectionY = -ballDirectionY;
//         }

//         if (ballX <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
//             ballDirectionX = -ballDirectionX;
//             playSound("../assets/audio/L-Paddle-Hit.mp3");
//         }
//         if (ballX >= fieldWidth - paddleWidth - ballRadius && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
//             ballDirectionX = -ballDirectionX;
//             playSound("../assets/audio/R-Paddle-Hit.mp3");
//         }

//         if (ballX >= paddle3X && ballX <= paddle3X + paddleWidth && ballY >= paddle3Y && ballY <= paddle3Y + paddleHeight) {
//             ballDirectionX = -ballDirectionX;
//             playSound("../assets/audio/L-Paddle-Hit.mp3");
//         }

//         if (ballX <= 0) {
//             player2Score++;
//             playSound("../assets/audio/score.mp3");
//             resetBall();
//         }
//         if (ballX >= fieldWidth) {
//             player1Score++;
//             playSound("../assets/audio/score.mp3");
//             resetBall();
//         }
//     }

//     function resetBall() {
//         ballX = fieldWidth / 2;
//         ballY = fieldHeight / 2;
//         ballDirectionX = -ballDirectionX;
//         ballDirectionY = Math.random() * 2 - 1;

//         if (player1Score >= maxScore) {
//             showModal(user.username + " Wins!");
//             const formData = new FormData();
//             formData.append('player1', user.username);
//             formData.append('player2', player2Name + " & " + player3Name);
//             formData.append('player1_score', player1Score);
//             formData.append('player2_score', player2Score);
//             const csrftoken = getCookie('csrftoken');
//             fetch('https://localhost:8008/api/add_match/', {
//                 method: 'POST',
//                 credentials: 'include',  
//                 headers: {
//                     'X-CSRFToken': csrftoken 
//                 },
//                 body: formData  
//             })
//             .then(response => response.json())
//             .then(data => console.log('Match added:', data))
//             .catch(error => console.error('Error:', error));
//         }
//         if (player2Score >= maxScore) {
//             showModal(`${player2Name} Wins!`);
//         }
//         if (player3Score >= maxScore) {
//             showModal(`${player3Name} Wins!`);
//         }
//     }

//     function showModal(message) {
//         modalMessage.textContent = message;
//         modal.style.display = "flex";
//     }

//     function draw() {
//         ctx.clearRect(0, 0, fieldWidth, fieldHeight);

//         const barCount = 10;
//         const barSpacing = fieldHeight / (barCount + 1);
//         ctx.fillStyle = "#000";
//         for (let i = 1; i <= barCount; i++) {
//             const barY = i * barSpacing;
//             ctx.fillRect(fieldWidth / 2 - 1, barY - 5, 2, 10);
//         }

//         ctx.fillStyle = "#FFF";
//         ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
//         ctx.fillRect(fieldWidth - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
//         ctx.fillRect(paddle3X, paddle3Y, paddleWidth, paddleHeight);

//         ctx.fillStyle = "#FFF";
//         ctx.beginPath();
//         ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
//         ctx.fill();

//         ctx.fillStyle = "#FFF";
//         ctx.font = "30px Arial";
//         ctx.fillText(player1Score, fieldWidth / 4, 60);
//         ctx.fillText(player2Score, fieldWidth / 2, 60);
//         ctx.fillText(player3Score, fieldWidth * 3 / 4, 60);

//         ctx.fillText(user.username, fieldWidth / 4, 30);
//         ctx.fillText(player2Name, fieldWidth / 2, 30);
//         ctx.fillText(player3Name, fieldWidth * 3 / 4, 30);
//     }

//     gameLoop();
// }


// function start4PlayerGame() {
//     const canvas = document.getElementById("gameCanvas");
//     const ctx = canvas.getContext("2d");

//     const fieldWidth = canvas.width;
//     const fieldHeight = canvas.height;
//     const paddleWidth = 10;
//     const paddleHeight = 60;
//     const ballRadius = 8;
//     const paddleSpeed = 5;
//     const ballSpeed = 4;
//     const maxScore = 10;

//     let paddle1Y = (fieldHeight - paddleHeight) / 2;
//     let paddle2Y = (fieldHeight - paddleHeight) / 2;
//     let paddle3Y = (fieldHeight - paddleHeight) / 2;
//     let paddle4Y = (fieldHeight - paddleHeight) / 2; // Player 4's paddle
//     let paddle3X = fieldWidth / 4;
//     let paddle4X = fieldWidth * 3 / 4; // Position Player 4
//     let ballX = fieldWidth / 2;
//     let ballY = fieldHeight / 2;
//     let ballDirectionX = 1;
//     let ballDirectionY = Math.random() * 2 - 1;
//     let player1Score = 0;
//     let player2Score = 0;
//     let player3Score = 0;
//     let player4Score = 0; // Player 4 score

//     let keys = {
//         w: false,
//         s: false,
//         ArrowUp: false,
//         ArrowDown: false,
//         c: false,
//         v: false,
//         x: false, // Player 4 control (up)
//         z: false, // Player 4 control (down)
//     };

//     // Ask for player names
//     let player2Name = prompt("Enter Player 2's name:") || "Player 2";
//     let player3Name = prompt("Enter Player 3's name:") || "Player 3";
//     let player4Name = prompt("Enter Player 4's name:") || "Player 4"; // Player 4's name

//     function playSound(soundFilePath) {
//         const sound = new Audio(soundFilePath);
//         sound.play();
//     }

//     window.addEventListener("keydown", (e) => {
//         if (e.key === "w") keys.w = true;
//         if (e.key === "s") keys.s = true;
//         if (e.key === "ArrowUp") keys.ArrowUp = true;
//         if (e.key === "ArrowDown") keys.ArrowDown = true;
//         if (e.key === "c") keys.c = true;
//         if (e.key === "v") keys.v = true;
//         if (e.key === "x") keys.x = true; // Player 4 up
//         if (e.key === "z") keys.z = true; // Player 4 down
//     });

//     window.addEventListener("keyup", (e) => {
//         if (e.key === "w") keys.w = false;
//         if (e.key === "s") keys.s = false;
//         if (e.key === "ArrowUp") keys.ArrowUp = false;
//         if (e.key === "ArrowDown") keys.ArrowDown = false;
//         if (e.key === "c") keys.c = false;
//         if (e.key === "v") keys.v = false;
//         if (e.key === "x") keys.x = false; // Player 4 up
//         if (e.key === "z") keys.z = false; // Player 4 down
//     });

//     const modal = document.getElementById("modal");
//     const modalMessage = document.getElementById("modalMessage");
//     const modalButton = document.getElementById("modalButton");

//     modalButton.addEventListener("click", () => {
//         modal.style.display = "none";
//         resetGame();
//     });

//     function gameLoop() {
//         if (player1Score >= maxScore || player2Score >= maxScore || player3Score >= maxScore || player4Score >= maxScore) return;

//         update();
//         draw();
//         requestAnimationFrame(gameLoop);
//     }

//     function update() {
//         if (keys.w && paddle1Y > 0) paddle1Y -= paddleSpeed;
//         if (keys.s && paddle1Y < fieldHeight - paddleHeight) paddle1Y += paddleSpeed;
//         if (keys.ArrowUp && paddle2Y > 0) paddle2Y -= paddleSpeed;
//         if (keys.ArrowDown && paddle2Y < fieldHeight - paddleHeight) paddle2Y += paddleSpeed;
//         if (keys.c && paddle3Y > 0) paddle3Y -= paddleSpeed;
//         if (keys.v && paddle3Y < fieldHeight - paddleHeight) paddle3Y += paddleSpeed;
//         if (keys.x && paddle4Y > 0) paddle4Y -= paddleSpeed; // Player 4 up
//         if (keys.z && paddle4Y < fieldHeight - paddleHeight) paddle4Y += paddleSpeed; // Player 4 down

//         ballX += ballDirectionX * ballSpeed;
//         ballY += ballDirectionY * ballSpeed;

//         if (ballY <= 0 || ballY >= fieldHeight) {
//             ballDirectionY = -ballDirectionY;
//         }

//         if (ballX <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
//             ballDirectionX = -ballDirectionX;
//             playSound("../assets/audio/L-Paddle-Hit.mp3");
//         }
//         if (ballX >= fieldWidth - paddleWidth - ballRadius && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
//             ballDirectionX = -ballDirectionX;
//             playSound("../assets/audio/R-Paddle-Hit.mp3");
//         }
//         if (ballX >= paddle3X && ballX <= paddle3X + paddleWidth && ballY >= paddle3Y && ballY <= paddle3Y + paddleHeight) {
//             ballDirectionX = -ballDirectionX;
//             playSound("../assets/audio/L-Paddle-Hit.mp3");
//         }
//         if (ballX >= paddle4X && ballX <= paddle4X + paddleWidth && ballY >= paddle4Y && ballY <= paddle4Y + paddleHeight) {
//             ballDirectionX = -ballDirectionX;
//             playSound("../assets/audio/R-Paddle-Hit.mp3");
//         }

//         if (ballX <= 0) {
//             player2Score++;
//             playSound("../assets/audio/score.mp3");
//             resetBall();
//         }
//         if (ballX >= fieldWidth) {
//             player1Score++;
//             playSound("../assets/audio/score.mp3");
//             resetBall();
//         }
//     }

//     function resetBall() {
//         ballX = fieldWidth / 2;
//         ballY = fieldHeight / 2;
//         ballDirectionX = -ballDirectionX;
//         ballDirectionY = Math.random() * 2 - 1;

//         if (player1Score >= maxScore) {
//             showModal(user.username + " Wins!");
//             const formData = new FormData();
//             formData.append('player1', user.username);
//             formData.append('player2', player2Name + " & " + player3Name + " & " + player4Name);
//             formData.append('player1_score', player1Score);
//             formData.append('player2_score', player2Score);
//             const csrftoken = getCookie('csrftoken');
//             fetch('https://localhost:8008/api/add_match/', {
//                 method: 'POST',
//                 credentials: 'include',  
//                 headers: {
//                     'X-CSRFToken': csrftoken 
//                 },
//                 body: formData  
//             })
//             .then(response => response.json())
//             .then(data => console.log('Match added:', data))
//             .catch(error => console.error('Error:', error));
//         }
		
//         if (player2Score >= maxScore) {
//             showModal(`${player2Name} Wins!`);
//         }
//         if (player3Score >= maxScore) {
//             showModal(`${player3Name} Wins!`);
//         }
//         if (player4Score >= maxScore) {
//             showModal(`${player4Name} Wins!`);
//         }
//     }

//     function showModal(message) {
//         modalMessage.textContent = message;
//         modal.style.display = "flex";
//     }

//     function draw() {
//         ctx.clearRect(0, 0, fieldWidth, fieldHeight);

//         const barCount = 10;
//         const barSpacing = fieldHeight / (barCount + 1);
//         ctx.fillStyle = "#000";
//         for (let i = 1; i <= barCount; i++) {
//             const barY = i * barSpacing;
//             ctx.fillRect(fieldWidth / 2 - 1, barY - 5, 2, 10);
//         }

//         ctx.fillStyle = "#FFF";
//         ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
//         ctx.fillRect(fieldWidth - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
//         ctx.fillRect(paddle3X, paddle3Y, paddleWidth, paddleHeight);
//         ctx.fillRect(paddle4X, paddle4Y, paddleWidth, paddleHeight); // Draw Player 4's paddle

//         ctx.fillStyle = "#FFF";
//         ctx.beginPath();
//         ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
//         ctx.fill();

//         ctx.fillStyle = "#FFF";
//         ctx.font = "30px Arial";
//         ctx.fillText(player1Score, fieldWidth / 4, 60);
//         ctx.fillText(player2Score, fieldWidth / 2, 60);
//         ctx.fillText(player3Score, fieldWidth * 3 / 4, 60);
//         ctx.fillText(player4Score, fieldWidth * 7 / 8, 60); // Player 4's score

//         ctx.fillText(user.username, fieldWidth / 4, 30);
//         ctx.fillText(player2Name, fieldWidth / 2, 30);
//         ctx.fillText(player3Name, fieldWidth * 3 / 4, 30);
//         ctx.fillText(player4Name, fieldWidth * 7 / 8, 30); // Player 4's name
//     }

//     gameLoop();
// }
>>>>>>> origin/master
