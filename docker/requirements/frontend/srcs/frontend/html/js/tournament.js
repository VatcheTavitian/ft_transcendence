function loadTournamentAndStart() {
    const gameContainer = document.getElementById('contentdiv');
    // // Add modal HTML structure directly here instead of inside the string
    // gameContainer.innerHTML = `
    //     <div id="modal" style="display:none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.8); color: white; padding: 20px; border-radius: 10px; text-align: center;">
    //         <p id="modalMessage">Modal message will appear here.</p>
    //     </div>
    // `;

    // Create the tournament form dynamically and add it to the container
    const tournamentForm = document.createElement('form');
    tournamentForm.id = "tournamentForm";


    const playerCountLabel = document.createElement('label');
    playerCountLabel.setAttribute('for', 'playerCount');
    playerCountLabel.textContent = 'Number of Players: ';
    tournamentForm.appendChild(playerCountLabel);

    const playerCountInput = document.createElement('input');
    playerCountInput.type = 'number';
    playerCountInput.id = 'playerCount';
    playerCountInput.name = 'playerCount';
    playerCountInput.min = 2;
    playerCountInput.max = 8;
    playerCountInput.required = true;
    tournamentForm.appendChild(playerCountInput);

    const playerNamesContainer = document.createElement('div');
    playerNamesContainer.id = 'playerNames';
    tournamentForm.appendChild(playerNamesContainer);

    // Render the player name inputs dynamically based on player count selection
    playerCountInput.addEventListener('input', function() {
        const numberOfPlayers = parseInt(playerCountInput.value);
        playerNamesContainer.innerHTML = ''; // Clear existing player name inputs
        for (let i = 1; i <= numberOfPlayers; i++) {
            const playerLabel = document.createElement('label');
            playerLabel.textContent = `Player ${i} Name: `;
            const playerInput = document.createElement('input');
            playerInput.type = 'text';
            playerInput.id = `playerName${i}`;
            playerInput.name = `playerName${i}`;
            playerNamesContainer.appendChild(playerLabel);
            playerNamesContainer.appendChild(playerInput);
        }
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Start Tournament';
    tournamentForm.appendChild(submitButton);

    gameContainer.appendChild(tournamentForm);

    // Handle form submission
    tournamentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get player count and validate it
        const playerCountInput = document.getElementById('playerCount');
        const numberOfPlayers = parseInt(playerCountInput.value);
        if (isNaN(numberOfPlayers) || numberOfPlayers < 2 || numberOfPlayers > 8) {
            console.error('Invalid player count');
            return;
        }

        const playerNames = [];
        for (let i = 1; i <= numberOfPlayers; i++) {
            const playerInput = document.getElementById(`playerName${i}`);
            let playerName = playerInput ? playerInput.value : `Player ${i}`;
            playerNames.push(playerName);
        }

        // Handle odd players by adding AI if needed
        if (numberOfPlayers % 2 !== 0) {
            playerNames.push("AI");
        }

        // Create game pairs
        const players = playerNames.map((name, index) => ({
            name: (index === 0 ? user.username : name), // Set player1 to user.username
            score: 0,
            paddleY: (gameContainer.height - 60) / 2,
            opponent: null
        }));

        // Create game pairs
        for (let i = 0; i < players.length; i += 2) {
            players[i].opponent = players[i + 1] || null; // opponent is AI if odd number of players
        }

        // Now that the tournament is initialized, we can start the first game
        startGame(players, 0);
    });
}

function startGame(players, currentGameIndex) {
    const gameContainer = document.getElementById('contentdiv');
    gameContainer.innerHTML = "";

    const gameCanvas = document.createElement('canvas');
    gameCanvas.id = 'gameCanvas';
    gameCanvas.width = 600;
    gameCanvas.height = 400;
    document.getElementById('contentdiv').appendChild(gameCanvas);

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const fieldWidth = canvas.width;
    const fieldHeight = canvas.height;
    const paddleWidth = 10;
    const paddleHeight = 60;
    const ballRadius = 8;
    const paddleSpeed = 5;
    const ballSpeed = 4;
    const maxScore = 1;

    let ballX = fieldWidth / 2;
    let ballY = fieldHeight / 2;
    let ballDirectionX = 1;
    let ballDirectionY = Math.random() * 2 - 1;

    const player1 = players[currentGameIndex * 2];
    const player2 = players[currentGameIndex * 2 + 1];
    
    let paddle1Y = player1.paddleY;
    let paddle2Y = player2.paddleY;
    
    let player1Score = 0;
    let player2Score = 0;

    let keys = {
        w: false,
        s: false,
        ArrowUp: false,
        ArrowDown: false
    };

    window.addEventListener("keydown", (e) => {
        if (e.key === "w") keys.w = true;
        if (e.key === "s") keys.s = true;
        if (e.key === "ArrowUp") keys.ArrowUp = true;
        if (e.key === "ArrowDown") keys.ArrowDown = true;
    });

    window.addEventListener("keyup", (e) => {
        if (e.key === "w") keys.w = false;
        if (e.key === "s") keys.s = false;
        if (e.key === "ArrowUp") keys.ArrowUp = false;
        if (e.key === "ArrowDown") keys.ArrowDown = false;
    });

    function aiMove(player) {
        if (!player.opponent) return;
        if (ballY < paddle2Y + paddleHeight / 2) {
            paddle2Y -= paddleSpeed;
        } else if (ballY > paddle2Y + paddleHeight / 2) {
            paddle2Y += paddleSpeed;
        }

        if (paddle2Y < 0) paddle2Y = 0;
        if (paddle2Y > fieldHeight - paddleHeight) paddle2Y = fieldHeight - paddleHeight;
    }

    function update() {
        if (keys.w && paddle1Y > 0) paddle1Y -= paddleSpeed;
        if (keys.s && paddle1Y < fieldHeight - paddleHeight) paddle1Y += paddleSpeed;
        aiMove(player2);

        ballX += ballDirectionX * ballSpeed;
        ballY += ballDirectionY * ballSpeed;

        if (ballY <= 0 || ballY >= fieldHeight) {
            ballDirectionY = -ballDirectionY;
        }

        if (ballX <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
            ballDirectionX = -ballDirectionX;
        }

        if (ballX >= fieldWidth - paddleWidth - ballRadius && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
            ballDirectionX = -ballDirectionX;
        }

        if (ballX <= 0) {
            player2Score++;
            resetBall();
        }

        if (ballX >= fieldWidth) {
            player1Score++;
            resetBall();
        }
    }

    function resetBall() {
        ballX = fieldWidth / 2;
        ballY = fieldHeight / 2;
        ballDirectionX = -ballDirectionX;
        ballDirectionY = Math.random() * 2 - 1;

        if (player1Score >= maxScore) {
            player1.score++;
            showModal(`${player1.name} Wins!`);
            nextGame();
        }

        if (player2Score >= maxScore) {
            player2.score++;
            showModal(`${player2.name} Wins!`);
            nextGame();
        }
    }

    function showModal(message) {
        const modalMessage = document.getElementById("modalMessage");
        const modal = document.getElementById("modal");
        modalMessage.textContent = message;
        modal.style.display = "flex"; // Make modal visible
    }
   

    function nextGame() {
        if (currentGameIndex + 1 < players.length / 2) {
            startGame(players, currentGameIndex + 1);
        } else {
            showModal("Tournament Complete!");
        }
    }

    function draw() {
        ctx.clearRect(0, 0, fieldWidth, fieldHeight);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, fieldWidth, fieldHeight);

        const barCount = 10;
        const barSpacing = fieldHeight / (barCount + 1);
        ctx.fillStyle = "#FFF";
        for (let i = 1; i <= barCount; i++) {
            const barY = i * barSpacing;
            ctx.fillRect(fieldWidth / 2 - 1, barY - 5, 2, 10);
        }

        ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
        ctx.fillRect(fieldWidth - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillText(player1.name, fieldWidth / 4, 30);
        ctx.fillText(player1Score, fieldWidth / 4, 60);
        ctx.fillText(player2.name, fieldWidth * 3 / 4, 30);
        ctx.fillText(player2Score, fieldWidth * 3 / 4, 60);
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
