window.start4PlayerGame = function() {
    if (window.gameInstance) {
        window.gameInstance.destroy();
    }
    window.gameInstance = new PongGameFourPlayer("gameCanvas");
};


<<<<<<< HEAD
=======


>>>>>>> origin/master
function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "flex";
}

class PongGameFourPlayer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error("Canvas not found!");
            return;
        }
        this.ctx = this.canvas.getContext("2d");
        this.running = false;
        this.animationFrameId = null;
<<<<<<< HEAD
        this.keys = { w: false, s: false, ArrowUp: false, ArrowDown: false, z: false, x: false, n: false, m: false };
        this.player2Name = prompt("Enter Player 2's name:") || "Player 2";
        this.player3Name = prompt("Enter Player 3's name:") || "Player 3";
        this.player4Name = prompt("Enter Player 4's name:") || "Player 4"; 
=======
        this.keys = { w: false, s: false, ArrowUp: false, ArrowDown: false, z: false, x: false, n: false, m: false }; // Added keys for Player 4
        this.player2Name = prompt("Enter Player 2's name:") || "Player 2";
        this.player3Name = prompt("Enter Player 3's name:") || "Player 3";
        this.player4Name = prompt("Enter Player 4's name:") || "Player 4"; // Prompt for Player 4's name
>>>>>>> origin/master
        
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
        this.paddle3X = this.fieldWidth / 2 - this.paddleWidth / 2;
<<<<<<< HEAD
        this.paddle4X = this.fieldWidth / 4 - this.paddleWidth / 2; 
=======
        this.paddle4X = this.fieldWidth / 4 - this.paddleWidth / 2; // Position for Player 4's paddle
>>>>>>> origin/master
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
        this.paddle3Y = (this.fieldHeight - this.paddleHeight) / 2;
<<<<<<< HEAD
        this.paddle4Y = (this.fieldHeight - this.paddleHeight) / 2; 
=======
        this.paddle4Y = (this.fieldHeight - this.paddleHeight) / 2; // Reset Player 4's paddle position
>>>>>>> origin/master
        this.ballX = this.fieldWidth / 2;
        this.ballY = this.fieldHeight / 2;
        this.ballDirectionX = 1;
        this.ballDirectionY = Math.random() * 2 - 1;
        this.player1Score = 0;
        this.player2Score = 0;
        this.player3Score = 0;
<<<<<<< HEAD
        this.player4Score = 0; 
=======
        this.player4Score = 0; // Reset Player 4's score
>>>>>>> origin/master
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

<<<<<<< HEAD
    

    update() {
     
        if (this.keys.w && this.paddle1Y > 0) this.paddle1Y -= this.paddleSpeed;
        if (this.keys.s && this.paddle1Y < this.fieldHeight - this.paddleHeight) this.paddle1Y += this.paddleSpeed;
        
  
        if (this.keys.ArrowUp && this.paddle2Y > 0) this.paddle2Y -= this.paddleSpeed;
        if (this.keys.ArrowDown && this.paddle2Y < this.fieldHeight - this.paddleHeight) this.paddle2Y += this.paddleSpeed;
        
      
        if (this.keys.n && this.paddle3Y > 0) this.paddle3Y -= this.paddleSpeed;
        if (this.keys.m && this.paddle3Y < this.fieldHeight - this.paddleHeight) this.paddle3Y += this.paddleSpeed;
        

=======
    // update() {
      
    //     if (this.keys.w && this.paddle1Y > 0) this.paddle1Y -= this.paddleSpeed;
    //     if (this.keys.s && this.paddle1Y < this.fieldHeight - this.paddleHeight) this.paddle1Y += this.paddleSpeed;
        
   
    //     if (this.keys.ArrowUp && this.paddle2Y > 0) this.paddle2Y -= this.paddleSpeed;
    //     if (this.keys.ArrowDown && this.paddle2Y < this.fieldHeight - this.paddleHeight) this.paddle2Y += this.paddleSpeed;
        
     
    //     if (this.keys.z && this.paddle3Y > 0) this.paddle3Y -= this.paddleSpeed;
    //     if (this.keys.x && this.paddle3Y < this.fieldHeight - this.paddleHeight) this.paddle3Y += this.paddleSpeed;
        
   
    //     if (this.keys.n && this.paddle4Y > 0) this.paddle4Y -= this.paddleSpeed;
    //     if (this.keys.m && this.paddle4Y < this.fieldHeight - this.paddleHeight) this.paddle4Y += this.paddleSpeed;

    //     this.ballX += this.ballDirectionX * this.ballSpeed;
    //     this.ballY += this.ballDirectionY * this.ballSpeed;

    //     if (this.ballY <= 0 || this.ballY >= this.fieldHeight) {
    //         this.ballDirectionY = -this.ballDirectionY;
    //     }

    //     // Paddle collisions
    //     if (this.ballX <= this.paddleWidth && this.ballY >= this.paddle1Y && this.ballY <= this.paddle1Y + this.paddleHeight) {
    //         this.ballDirectionX = -this.ballDirectionX;
    //     }

    //     if (this.ballX >= this.fieldWidth - this.paddleWidth - this.ballRadius && this.ballY >= this.paddle2Y && this.ballY <= this.paddle2Y + this.paddleHeight) {
    //         this.ballDirectionX = -this.ballDirectionX;
    //     }

    //     if (this.ballX >= this.paddle3X && this.ballX <= this.paddle3X + this.paddleWidth && this.ballY >= this.paddle3Y && this.ballY <= this.paddle3Y + this.paddleHeight) {
    //         this.ballDirectionX = -this.ballDirectionX;
    //     }

    //     if (this.ballX >= this.paddle4X && this.ballX <= this.paddle4X + this.paddleWidth && this.ballY >= this.paddle4Y && this.ballY <= this.paddle4Y + this.paddleHeight) {
    //         this.ballDirectionX = -this.ballDirectionX;
    //     }

    //     // Scoring
    //     if (this.ballX <= 0) {
    //         this.player2Score++;
    //         this.resetBall();
    //     }

    //     if (this.ballX >= this.fieldWidth) {
    //         this.player1Score++;
    //         this.resetBall();
    //     }
    // }

    update() {
        // Player 1 controls
        if (this.keys.w && this.paddle1Y > 0) this.paddle1Y -= this.paddleSpeed;
        if (this.keys.s && this.paddle1Y < this.fieldHeight - this.paddleHeight) this.paddle1Y += this.paddleSpeed;
        
        // Player 2 controls
        if (this.keys.ArrowUp && this.paddle2Y > 0) this.paddle2Y -= this.paddleSpeed;
        if (this.keys.ArrowDown && this.paddle2Y < this.fieldHeight - this.paddleHeight) this.paddle2Y += this.paddleSpeed;
        
        // Player 3 controls (swapped with Player 4)
        if (this.keys.n && this.paddle3Y > 0) this.paddle3Y -= this.paddleSpeed;
        if (this.keys.m && this.paddle3Y < this.fieldHeight - this.paddleHeight) this.paddle3Y += this.paddleSpeed;
        
        // Player 4 controls (swapped with Player 3)
>>>>>>> origin/master
        if (this.keys.z && this.paddle4Y > 0) this.paddle4Y -= this.paddleSpeed;
        if (this.keys.x && this.paddle4Y < this.fieldHeight - this.paddleHeight) this.paddle4Y += this.paddleSpeed;
    
        this.ballX += this.ballDirectionX * this.ballSpeed;
        this.ballY += this.ballDirectionY * this.ballSpeed;
    
        if (this.ballY <= 0 || this.ballY >= this.fieldHeight) {
            this.ballDirectionY = -this.ballDirectionY;
        }
    
<<<<<<< HEAD
      
=======
        // Paddle collisions
>>>>>>> origin/master
        if (this.ballX <= this.paddleWidth && this.ballY >= this.paddle1Y && this.ballY <= this.paddle1Y + this.paddleHeight) {
            this.ballDirectionX = -this.ballDirectionX;
        }
    
        if (this.ballX >= this.fieldWidth - this.paddleWidth - this.ballRadius && this.ballY >= this.paddle2Y && this.ballY <= this.paddle2Y + this.paddleHeight) {
            this.ballDirectionX = -this.ballDirectionX;
        }
    
        if (this.ballX >= this.paddle3X && this.ballX <= this.paddle3X + this.paddleWidth && this.ballY >= this.paddle3Y && this.ballY <= this.paddle3Y + this.paddleHeight) {
            this.ballDirectionX = -this.ballDirectionX;
        }
    
        if (this.ballX >= this.paddle4X && this.ballX <= this.paddle4X + this.paddleWidth && this.ballY >= this.paddle4Y && this.ballY <= this.paddle4Y + this.paddleHeight) {
            this.ballDirectionX = -this.ballDirectionX;
        }
    
<<<<<<< HEAD
  
        
=======
        // Scoring
>>>>>>> origin/master
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
        if (this.player1Score >= this.maxScore || this.player2Score >= this.maxScore || this.player3Score >= this.maxScore || this.player4Score >= this.maxScore) {
            this.running = false;
        }
        this.ballX = this.fieldWidth / 2;
        this.ballY = this.fieldHeight / 2;
        this.ballDirectionX = Math.random() > 0.5 ? 1 : -1;
        this.ballDirectionY = Math.random() * 2 - 1;

        if (this.player1Score >= this.maxScore) {
            showModal(`${user.username} Wins!`);
            const formData = new FormData();
            formData.append('player2', this.player2Score + '/' + this.player3Score + '/' + this.player4Score);
            formData.append('player1_score', this.player1Score);
            formData.append('player2_score', this.player2Score);
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
        }
        if (this.player2Score >= this.maxScore) {
            showModal(`${this.player2Name} Wins!`);
        }
        if (this.player3Score >= this.maxScore) {
            showModal(`${this.player3Name} Wins!`);
        }
        if (this.player4Score >= this.maxScore) {
            showModal(`${this.player4Name} Wins!`);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.fieldWidth, this.fieldHeight);
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillRect(0, this.paddle1Y, this.paddleWidth, this.paddleHeight);
        this.ctx.fillRect(this.fieldWidth - this.paddleWidth, this.paddle2Y, this.paddleWidth, this.paddleHeight);
        this.ctx.fillRect(this.paddle3X, this.paddle3Y, this.paddleWidth, this.paddleHeight);
<<<<<<< HEAD
        this.ctx.fillRect(this.paddle4X, this.paddle4Y, this.paddleWidth, this.paddleHeight);
=======
        this.ctx.fillRect(this.paddle4X, this.paddle4Y, this.paddleWidth, this.paddleHeight); // Draw Player 4's paddle
>>>>>>> origin/master
        
        this.ctx.beginPath();
        this.ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillText(this.player1Score, this.fieldWidth / 4, 60);
        this.ctx.fillText(this.player2Score, this.fieldWidth / 2, 60);
        this.ctx.fillText(this.player3Score, this.fieldWidth * 3 / 4, 60);
        this.ctx.fillText(this.player4Score, this.fieldWidth * 3 / 4 + 100, 60); 

        this.ctx.fillText(user.username, this.fieldWidth / 4, 30);
        this.ctx.fillText(this.player2Name, this.fieldWidth / 2, 30);
        this.ctx.fillText(this.player3Name, this.fieldWidth * 3 / 4, 30);
        this.ctx.fillText(this.player4Name, this.fieldWidth * 3 / 4 + 100, 30); 
    }

    destroy() {
        this.stop();
        this.removeEventListeners();
    }
}


document.addEventListener("DOMContentLoaded", start4PlayerGame);