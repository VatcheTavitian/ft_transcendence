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
        this.maxScore = 5;
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
            this.showModal("")
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

