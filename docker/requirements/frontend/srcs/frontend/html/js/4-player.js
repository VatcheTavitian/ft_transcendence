const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
let paddle3Y = (fieldHeight - paddleHeight) / 2;
let paddle4Y = (fieldHeight - paddleHeight) / 2;
let paddle3X = fieldWidth / 4;
let paddle4X = 3 * fieldWidth / 4;
let ballX = fieldWidth / 2;
let ballY = fieldHeight / 2;
let ballDirectionX = 1;
let ballDirectionY = Math.random() * 2 - 1;
let player1Score = 0;
let player2Score = 0;

let paddle1Direction = 0;
let paddle2Direction = 0;
let paddle3Direction = 0;
let paddle4Direction = 0;

let keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false,
    c: false,
    v: false,
    n: false,
    m: false,
};

function playSound(soundFilePath) {
    const sound = new Audio(soundFilePath);
    sound.play();
}

window.addEventListener("keydown", (e) => {
    if (e.key === "w") keys.w = true;
    if (e.key === "s") keys.s = true;
    if (e.key === "ArrowUp") keys.ArrowUp = true;
    if (e.key === "ArrowDown") keys.ArrowDown = true;
    if (e.key === "c") keys.c = true;
    if (e.key === "v") keys.v = true;
    if (e.key === "n") keys.n = true;
    if (e.key === "m") keys.m = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key === "w") keys.w = false;
    if (e.key === "s") keys.s = false;
    if (e.key === "ArrowUp") keys.ArrowUp = false;
    if (e.key === "ArrowDown") keys.ArrowDown = false;
    if (e.key === "c") keys.c = false;
    if (e.key === "v") keys.v = false;
    if (e.key === "n") keys.n = false;
    if (e.key === "m") keys.m = false;
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
    if (keys.ArrowUp && paddle2Y > 0) paddle2Y -= paddleSpeed;
    if (keys.ArrowDown && paddle2Y < fieldHeight - paddleHeight) paddle2Y += paddleSpeed;
    if (keys.c && paddle3Y > 0) paddle3Y -= paddleSpeed;
    if (keys.v && paddle3Y < fieldHeight - paddleHeight) paddle3Y += paddleSpeed;
    if (keys.n && paddle4Y > 0) paddle4Y -= paddleSpeed;
    if (keys.m && paddle4Y < fieldHeight - paddleHeight) paddle4Y += paddleSpeed;

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

    if (ballX >= paddle3X && ballX <= paddle3X + paddleWidth && ballY >= paddle3Y && ballY <= paddle3Y + paddleHeight) {
        ballDirectionX = -ballDirectionX;
        playSound("../assets/audio/L-Paddle-Hit.mp3");
    }

    if (ballX >= paddle4X && ballX <= paddle4X + paddleWidth && ballY >= paddle4Y && ballY <= paddle4Y + paddleHeight) {
        ballDirectionX = -ballDirectionX;
        playSound("../assets/audio/R-Paddle-Hit.mp3");
    }

    if (ballX <= 0) {
        player2Score++;
        playSound("../assets/audio/score.mp3");
        resetBall();
    }
    if (ballX >= fieldWidth) {
        player1Score++;
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
    ctx.fillRect(paddle3X, paddle3Y, paddleWidth, paddleHeight);
    ctx.fillRect(paddle4X, paddle4Y, paddleWidth, paddleHeight);

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
