
window.startSingleGame = function() {
    if (window.gameInstance) {
        window.gameInstance.destroy();
    }
    window.gameInstance = new PongGame("gameCanvas");
};

class PongGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error("Canvas not found!");
            return;
        }
        this.ctx = this.canvas.getContext("2d");
        this.running = false;
        this.animationFrameId = null;
        this.keys = { w: false, s: false };

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
            if (e.key === "w") this.keys.w = true;
            if (e.key === "s") this.keys.s = true;
        };

        this.keyupHandler = (e) => {
            if (e.key === "w") this.keys.w = false;
            if (e.key === "s") this.keys.s = false;
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
        this.gameOver = false;
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
        this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        if (this.keys.w && this.paddle1Y > 0) this.paddle1Y -= this.paddleSpeed;
        if (this.keys.s && this.paddle1Y < this.fieldHeight - this.paddleHeight) this.paddle1Y += this.paddleSpeed;
        this.aiMove();

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

    saveMatch() {
        const formData = new FormData();
        formData.append('player2', 'AI');
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

    resetBall() {
        this.ballX = this.fieldWidth / 2;
        this.ballY = this.fieldHeight / 2;
        this.ballDirectionX = -this.ballDirectionX;
        this.ballDirectionY = Math.random() * 2 - 1;
        

        if (this.player1Score >= this.maxScore) {
            this.gameOver = true;
            this.saveMatch()
            this.showModal("You win!");
        } else if (this.player2Score >= this.maxScore) {
            this.gameOver = true;
            this.saveMatch()
            this.showModal("AI Wins!");
        }
    }

    showModal(message) {
        document.getElementById("modalMessage").textContent = message;
        document.getElementById("modal").style.display = "flex";
        document.getElementById("modalMessage").style.color = "white";
        this.stop();
    }

    aiMove() {
        let temp = this.paddle2Y;
    
        if (this.ballY < this.paddle2Y + this.paddleHeight / 2) {
            temp = this.paddle2Y - this.paddleSpeed;
        } else if (this.ballY > this.paddle2Y + this.paddleHeight / 2) {
            temp = this.paddle2Y + this.paddleSpeed;
        }
    
        temp = Math.max(25, Math.min(525, temp));
    
        this.paddle2Y = temp;
    }

    draw() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);

    
        this.ctx.fillStyle = "#FFF";
        const barCount = 10;
        const barSpacing = this.fieldHeight / (barCount + 1);
        for (let i = 1; i <= barCount; i++) {
            const barY = i * barSpacing;
            this.ctx.fillRect(this.fieldWidth / 2 - 1, barY - 5, 2, 10);
        }

    
        this.ctx.fillRect(0, this.paddle1Y, this.paddleWidth, this.paddleHeight);
        this.ctx.fillRect(this.fieldWidth - this.paddleWidth, this.paddle2Y, this.paddleWidth, this.paddleHeight);

    
        this.ctx.beginPath();
        this.ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fill();

      
        this.ctx.font = "30px Arial";
        if (user.username.length > 10) {
            temp = user.username.substring(0, 10) + '.'
            this.ctx.fillText(temp, this.fieldWidth / 4, 30);
        }
        else
            this.ctx.fillText(user.username, this.fieldWidth / 4, 30);
        this.ctx.fillText(this.player1Score, this.fieldWidth / 4, 60);
        this.ctx.fillText("AI", this.fieldWidth * 3 / 4, 30);
        this.ctx.fillText(this.player2Score, this.fieldWidth * 3 / 4, 60);

        if (this.gameOver) {
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "red";
            this.ctx.textAlign = "center";
            this.ctx.fillText("GAME OVER", this.fieldWidth / 2, this.fieldHeight / 2);
        }
    }

    destroy() {
        this.stop();
        this.removeEventListeners();
    }
}

let gameInstance = null;
document.addEventListener("DOMContentLoaded", () => {
    gameInstance = new PongGame("gameCanvas");
});

document.getElementById("modalButton").addEventListener("click", () => {
    if (gameInstance) {
        gameInstance.destroy();
    }
    gameInstance = new PongGame("gameCanvas");
});
