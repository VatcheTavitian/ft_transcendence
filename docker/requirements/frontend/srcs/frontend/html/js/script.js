


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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tournament below





class PongGameTwoPlayer {
   
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error("Canvas not found!");
            return;
        }
        this.ctx = this.canvas.getContext("2d");
        this.running = false;
        this.animationFrameId = null;
        this.keys = { w: false, s: false, ArrowUp: false, ArrowDown: false };
        this.player2Name =  prompt("Enter Player 2's name:") || "Opponent";
        this.setupGame();
        this.addEventListeners();
        this.start();
    }

    setupGame() {
        this.fieldWidth = this.canvas.width;
        this.fieldHeight = this.canvas.height;
        this.paddleWidth = 10;
        this.paddleHeight = 60;
        this.ballRadius = 8;
        this.paddleSpeed = 5;
        this.ballSpeed = 4;
        this.maxScore = 10;
        this.resetGame();
    }

    addEventListeners() {
        this.keydownHandler = (e) => {
            if (e.key in this.keys) this.keys[e.key] = true;
        };

        this.keyupHandler = (e) => {
            if (e.key in this.keys) this.keys[e.key] = false;
        };

        this.modalButtonHandler = () => {
            this.resetGame();
            this.start();
        };

        window.addEventListener("keydown", this.keydownHandler);
        window.addEventListener("keyup", this.keyupHandler);
        document.getElementById("modalButton").addEventListener("click", this.modalButtonHandler);
    }

    removeEventListeners() {
        window.removeEventListener("keydown", this.keydownHandler);
        window.removeEventListener("keyup", this.keyupHandler);
        document.getElementById("modalButton").removeEventListener("click", this.modalButtonHandler);
    }

    resetGame() {
        this.paddle1Y = (this.fieldHeight - this.paddleHeight) / 2;
        this.paddle2Y = (this.fieldHeight - this.paddleHeight) / 2;
        this.ballX = this.fieldWidth / 2;
        this.ballY = this.fieldHeight / 2;
        this.ballDirectionX = 1;
        this.ballDirectionY = Math.random() * 2 - 1;
        this.player1Score = 0;
        this.player2Score = 0;
        this.running = true;
    }

    start() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.running = true;
        this.gameLoop();
    }

    stop() {
        this.running = false;
        cancelAnimationFrame(this.animationFrameId);
    }

    gameLoop() {
        if (!this.running) return;
        this.update();
        this.draw();
        if (this.running) {
        this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    update() {
        if (this.keys.w && this.paddle1Y > 0) this.paddle1Y -= this.paddleSpeed;
        if (this.keys.s && this.paddle1Y < this.fieldHeight - this.paddleHeight) this.paddle1Y += this.paddleSpeed;
        if (this.keys.ArrowUp && this.paddle2Y > 0) this.paddle2Y -= this.paddleSpeed;
        if (this.keys.ArrowDown && this.paddle2Y < this.fieldHeight - this.paddleHeight) this.paddle2Y += this.paddleSpeed;

        this.ballX += this.ballDirectionX * this.ballSpeed;
        this.ballY += this.ballDirectionY * this.ballSpeed;

        if (this.ballY <= 0 || this.ballY >= this.fieldHeight) {
            this.ballDirectionY = -this.ballDirectionY;
        }

        if (this.ballX <= this.paddleWidth && this.ballY >= this.paddle1Y && this.ballY <= this.paddle1Y + this.paddleHeight) {
            this.ballDirectionX = -this.ballDirectionX;
        }

        if (this.ballX >= this.fieldWidth - this.paddleWidth - this.ballRadius && this.ballY >= this.paddle2Y && this.ballY <= this.paddle2Y + this.paddleHeight) {
            this.ballDirectionX = -this.ballDirectionX;
        }

        if (this.ballX <= 0) {
            this.player2Score++;
            this.resetBall();
        }

        if (this.ballX >= this.fieldWidth) {
            this.player1Score++;
            this.resetBall();
        }
    }

    resetBall() {
        this.ballX = this.fieldWidth / 2;
        this.ballY = this.fieldHeight / 2;
        this.ballDirectionX = -this.ballDirectionX;
        this.ballDirectionY = Math.random() * 2 - 1;
        if (this.player1Score >= this.maxScore || this.player2Score >= this.maxScore) {
            this.running = false;
        }
        if (this.player1Score >= this.maxScore) {
            this.showModal( user.username + " Wins!");

            const formData = new FormData();
            formData.append('player2', this.player2Name);
            formData.append('player1_score', this.player1Score);
            formData.append('player2_score', this.player2Score);
            console.log('sending request')
            const csrftoken = getCookie('csrftoken');
            fetch('https://localhost:8008/api/add_match/', {
                method: 'POST',
                credentials: 'include',  
                headers: {
                    'X-CSRFToken': csrftoken 
                },
                body: formData  
            })
            .then(response => response.json())
            .then(data => console.log('Match added:', data))
            .catch(error => console.error('Error:', error));
        } else if (this.player2Score >= this.maxScore) {
            this.showModal("Player 2 Wins!");
        }
    }

    showModal(message) {
        document.getElementById("modalMessage").textContent = message;
        document.getElementById("modal").style.display = "flex";
        this.stop();
    }

    draw() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);

        this.ctx.fillStyle = "#FFF";
        this.ctx.fillRect(0, this.paddle1Y, this.paddleWidth, this.paddleHeight);
        this.ctx.fillRect(this.fieldWidth - this.paddleWidth, this.paddle2Y, this.paddleWidth, this.paddleHeight);

        this.ctx.beginPath();
        this.ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.font = "30px Arial";
        this.ctx.fillText(user.username, this.fieldWidth / 4, 30);
        this.ctx.fillText(this.player1Score, this.fieldWidth / 4, 60);
        this.ctx.fillText(this.player2Name, this.fieldWidth * 3 / 4, 30);
        this.ctx.fillText(this.player2Score, this.fieldWidth * 3 / 4, 60);
    }

    destroy() {
        this.stop();
        this.removeEventListeners();
    }
}



async function startTournament() {
    console.log('1');
    const gameContainer = document.getElementById('contentdiv');
   
    gameContainer.innerHTML = `
        <style>body {background-color: black;}</style>
        <div id="tourCanvas"></div
        <div id="modal">
            <div id="modalMessage"></div>
            <button id="modalButton">Next Match</button>
        </div>
    `;


    // Create script elements for both scripts
    const script = document.createElement('script');
    script.src = '../js/tournament.js';
    const script2 = document.createElement('script');
    script2.src = '../js/2p.js';

    // Append the scripts to the document body
    document.body.appendChild(script);
    document.body.appendChild(script2);
    console.log('Scripts added');

    // Function to load a script and return a promise
    const loadScript = (script) => {
        return new Promise((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Script load error: ${script.src}`));
        });
    };

    // Wait for both scripts to load
    try {
        await Promise.all([loadScript(script), loadScript(script2)]);
        console.log('Both scripts loaded');

        // Now that both scripts have loaded, check if startTournamentGameCall exists
        if (typeof startTournamentGameCall === "function") {
            // Wait a short time before calling startTournamentGameCall
            setTimeout(function() {
                startTournamentGameCall();  // Calls startTournamentGame after a delay
            }, 2000);  // Adjust delay (in ms) if needed
        } else {
            console.error("startTournamentGameCall is not defined");
        }
    } catch (error) {
        console.error("Error loading scripts:", error);
    }
}



class Tournament {
    constructor(canvasId, username) {
        this.canvasId = canvasId;
        this.username = username;
        this.players = [];
        this.game = null;
        this.round = 1;
        this.match = 1;
        this.winner = null;
        this.setupTournament();
    }
    
    setupTournament() {
        let numPlayers = 0;
        while (numPlayers < 2 || numPlayers > 8) {
            numPlayers = parseInt(prompt("Enter number of players (2-8):"));
        }
        
        this.players.push(this.username); // Add the current user as Player 1
        
        for (let i = 2; i <= numPlayers; i++) {
            const playerName = prompt(`Enter Player ${i}'s name:`) || `Player ${i}`;
            this.players.push(playerName);
        }

        this.startRound();
    }

    startRound() {
        if (this.players.length === 1) {
            this.winner = this.players[0];
            this.endTournament();
            return;
        }

        const player1 = this.players.shift();
        const player2 = this.players.shift();
        
        this.game = new PongGameTwoPlayer(this.canvasId, player1, player2); // Pass player names to the game
        this.game.onGameOver = (winner, loser, player1Score, player2Score) => this.endMatch(winner, loser, player1Score, player2Score);
        this.game.start();
    }
    
    
    
    endMatch(winner, loser, player1Score, player2Score) {
        if (winner) {
            this.players.push(winner);
        }
        if (loser) {
            const loserIndex = this.players.indexOf(loser);
            if (loserIndex > -1) {
                this.players.splice(loserIndex, 1);
            }
        }
        
        this.game.destroy();
        this.game = null;

        if (this.players.length === 1) {
            this.winner = this.players[0];
            this.endTournament();
        } else {
            this.startRound();
        }
    }
    
    endTournament() {
        const modalMessage = document.getElementById("modalMessage");
        const modal = document.getElementById("modal");
        
        if (this.winner) {
            modalMessage.textContent = `${this.winner} wins the tournament!`;
        } else {
            modalMessage.textContent = "Tournament ended unexpectedly.";
        }
        modal.style.display = "flex";
        this.game?.destroy();
        this.game = null;
    }
}





function startTournament() {
    setTimeout(() => {
        console.log('Waiting for 3 seconds before starting the tournament...');
        const gameContainer = document.getElementById('tourCanvas');
        const newContainer = document.createElement('div');
        newContainer.innerHTML = `
            <canvas id="gameCanvas" width="800" height="400"></canvas>`;

        gameContainer.appendChild(newContainer);
        const canv = document.getElementById('gameCanvas');
        const tournament = new Tournament(canv, user.username);
    }, 3000);
}

    window.startTournamentGameCall = function() {
        if (window.gameInstance) {
            window.gameInstance.destroy();
        }
        startTournament();
        // window.gameInstance = new PongGame("gameCanvas");
    };
    // Call the startTournament function when needed
    startTournamentGameCall()