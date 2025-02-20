

<<<<<<< HEAD
=======

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
//             showModal(`${user.username} Wins!`);
			
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



>>>>>>> origin/master
window.start2PlayerGame = function() {
    if (window.gameInstance) {
        window.gameInstance.destroy();
    }
    window.gameInstance = new PongGameTwoPlayer("gameCanvas");
};






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

