const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const fieldWidth = canvas.width;
const fieldHeight = canvas.height;
const paddleWidth = 10;
const paddleHeight = 60;
const ballRadius = 8;
const paddleSpeed = 5;
const ballSpeed = 4;
const maxScore = 10;

let paddle1Y = (fieldHeight - paddleHeight) / 2;
let paddle2Y = (fieldHeight - paddleHeight) / 2;
let ballX = fieldWidth / 2;
let ballY = fieldHeight / 2;
let ballDirectionX = 1;
let ballDirectionY = Math.random() * 2 - 1;
let player1Score = 0;
let player2Score = 0;

let paddle1Direction = 0;

let keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false,
};

function playSound(soundFilePath) {
    const sound = new Audio(soundFilePath);
    sound.play();
}

window.addEventListener("keydown", (e) => {
    if (e.key === "w") keys.w = true;
    if (e.key === "s") keys.s = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key === "w") keys.w = false;
    if (e.key === "s") keys.s = false;
});

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const modalButton = document.getElementById("modalButton");

modalButton.addEventListener("click", () => {
    modal.style.display = "none";
    resetGame();
});

function gameLoop() {
    if (player1Score >= maxScore || player2Score >= maxScore) return;

    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    if (keys.w && paddle1Y > 0) paddle1Y -= paddleSpeed;
    if (keys.s && paddle1Y < fieldHeight - paddleHeight) paddle1Y += paddleSpeed;
    aiMove();

    ballX += ballDirectionX * ballSpeed;
    ballY += ballDirectionY * ballSpeed;

    if (ballY <= 0 || ballY >= fieldHeight) {
        ballDirectionY = -ballDirectionY;
    }

    if (ballX <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
        ballDirectionX = -ballDirectionX;
        playSound("../assets/audio/L-Paddle-Hit.mp3");
    }
    if (ballX >= fieldWidth - paddleWidth - ballRadius && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
        ballDirectionX = -ballDirectionX;
        playSound("../assets/audio/R-Paddle-Hit.mp3");
    }

    if (ballX <= 0) {
        player2Score++;
        playSound("../assets/audio/score.mp3");
        resetBall();
    }
    if (ballX >= fieldWidth) {
        playSound("../assets/audio/score.mp3");
        resetBall();
    }
}

function resetBall() {
    ballX = fieldWidth / 2;
    ballY = fieldHeight / 2;
    ballDirectionX = -ballDirectionX;
    ballDirectionY = Math.random() * 2 - 1;

    if (player1Score >= maxScore) {
        showModal("Player 1 Wins!");
    }
    if (player2Score >= maxScore) {
        showModal("Player 2 Wins!");
    }
}

function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "flex";
}

function aiMove() {
    if (ballY < paddle2Y + paddleHeight / 2) {
        paddle2Y -= paddleSpeed;
    } else if (ballY > paddle2Y + paddleHeight / 2) {
        paddle2Y += paddleSpeed;
    }

    if (paddle2Y < 0) paddle2Y = 0;
    if (paddle2Y > fieldHeight - paddleHeight) paddle2Y = fieldHeight - paddleHeight;
}

function draw() {
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);

    const barCount = 10;
    const barSpacing = fieldHeight / (barCount + 1);
    ctx.fillStyle = "#FFF";
    for (let i = 1; i <= barCount; i++) {
        const barY = i * barSpacing;
        ctx.fillRect(fieldWidth / 2 - 1, barY - 5, 2, 10);
    }

    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(fieldWidth - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#FFF";
    ctx.font = "30px Arial";
    ctx.fillText(player1Score, fieldWidth / 4, 50);
    ctx.fillText(player2Score, fieldWidth * 3 / 4, 50);
}

gameLoop();


