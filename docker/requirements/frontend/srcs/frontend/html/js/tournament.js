function launchTournament() {
    const numPlayersInput = document.getElementById("numPlayers");
    const startInputBtn = document.getElementById("startInputBtn");
    const playersInputsDiv = document.getElementById("playersInputs");
    const playerNamesInputsDiv = document.getElementById("playerNamesInputs");
    const startTournamentBtn = document.getElementById("startTournamentBtn");
    const gameCanvas = document.getElementById("gameCanvas");
    const ctx = gameCanvas.getContext("2d");

    let fieldWidth = gameCanvas.width;
    let fieldHeight = gameCanvas.height;

    let paddleWidth = 10;
    let paddleHeight = 60;
    let ballRadius = 8;
    let paddleSpeed = 5;
    let ballSpeed = 4;
    let maxScore = 5; 

    let paddle1Y = (fieldHeight - paddleHeight) / 2;
    let paddle2Y = (fieldHeight - paddleHeight) / 2;
    let ballX = fieldWidth / 2;
    let ballY = fieldHeight / 2;
    let ballDirectionX = 1;
    let ballDirectionY = Math.random() * 2 - 1;
    let player1Score = 0;
    let player2Score = 0;

    let paddle1Direction = 0;
    let paddle2Direction = 0;
    let buttonflag = false;

    let keys = {
        w: false,
        s: false,
        ArrowUp: false,
        ArrowDown: false,
    };

    let players = [];
    let currentPlayerIndex = 0;
    let opponentIndex = 1;
    let matchInProgress = false;

    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modalMessage");
    const modalButton = document.getElementById("modalButton");

 
    startInputBtn.addEventListener("click", () => {
        const numPlayers = parseInt(numPlayersInput.value);
        if (numPlayers >= 2 && numPlayers <= 10) {
            playersInputsDiv.style.display = "block";
            playerNamesInputsDiv.innerHTML = "";

          
            for (let i = 1; i <= numPlayers; i++) {
                const playerInputDiv = document.createElement("div");
                playerInputDiv.classList.add("playerInput");
                if (i == 1) {
                    playerInputDiv.innerHTML = `
                        <label for="player${i}">Player 1 Name: </label>
                        <input type="text" id="player${i}" value="${user.username}" readonly />
                    `;
                }
                else {
                    playerInputDiv.innerHTML = `
                        <label for="player${i}">Player ${i} Alias: </label>
                        <input type="text" id="player${i}" placeholder="Enter alias for Player ${i}" required />
                    `;
                }
                playerNamesInputsDiv.appendChild(playerInputDiv);
            }

            startTournamentBtn.style.display = "inline-block";
        } else {
            alert("Please enter a valid number of players (between 2 and 10).");
        }
    });

    startTournamentBtn.addEventListener("click", () => {
        const numPlayers = parseInt(numPlayersInput.value);
        const playerNames = [];


        for (let i = 1; i <= numPlayers; i++) {
            const playerNameInput = document.getElementById(`player${i}`);
            const alias = playerNameInput.value.trim();
            if (alias) {
                if (i == 1)
                    playerNames.push(user.username);
                else
                    playerNames.push(alias);
            } else {
                alert(`Please enter a name for Player ${i}.`);
                return;
            }
        }

 
        initializeTournament(playerNames);
        let modalBtn = document.getElementById("modalButton");
        modalBtn.removeAttribute('style');
        modalBtn.innerText = "Begin";

    });

    function initializeTournament(playerNames) {
 
        document.getElementById("playerInputSection").style.display = "none";
        numPlayersInput.style.display = "none";
        startInputBtn.style.display = "none";
        startTournamentBtn.style.display = "none";

        gameCanvas.style.display = "block";  // Show the game canvas

        players = playerNames.map((name, index) => ({
            id: index + 1,
            name,
            wins: 0,
            losses: 0
        }));

        currentPlayerIndex = 0;
        opponentIndex = 1;
        matchInProgress = true;
        resetGame();
        startNextMatch();
    }

    function startNextMatch() {
        
        if (players[currentPlayerIndex] && players[opponentIndex]) {
            const player1Name = players[currentPlayerIndex].name;
            const player2Name = players[opponentIndex].name;

            modalMessage.textContent = `Match: ${player1Name} vs ${player2Name}`;
            modal.style.display = "flex";

         
            modalButton.removeEventListener("click", handleFinalResultsModalClick);
            modalButton.addEventListener("click", () => {
                modal.style.display = "none"; // Close the modal
                resetGame();
                //gameLoop();
            });
        } else {
            startTournamentBtn.style.display = "none";  
            console.log("Tournament Over");
            showFinalStandings();
            // console.error("Invalid player indices:", currentPlayerIndex, opponentIndex);
            // console.log(players);
            // console.log(currentPlayerIndex, opponentIndex);
        }
    }


    // Reset game settings
    function resetGame() {

        // Reset scores
        player1Score = 0;
        player2Score = 0;

        // Reset ball position to center
        ballX = fieldWidth / 2;
        ballY = fieldHeight / 2;

        // Reset ball movement direction
        ballDirectionX = 1;  // Start with rightward motion
        ballDirectionY = Math.random() * 2 - 1;  // Random vertical direction

        ballSpeed = 4; // Reset ball speed to initial value
    }


    // Game loop
    function gameLoop() {
        // Check if the tournament is over
        if (player1Score >= maxScore || player2Score >= maxScore) {
            endMatch();
            return;  // Stop the game loop if a match has ended
        }

        update();   // Update the game mechanics (paddles, ball, etc.)
        draw();     // Draw the game elements (ball, paddles, scores, etc.)
        requestAnimationFrame(gameLoop);  // Continue the game loop
    }

    // Update game mechanics
    function update() {
        if (keys.w && paddle1Y > 0) paddle1Y -= paddleSpeed;
        if (keys.s && paddle1Y < fieldHeight - paddleHeight) paddle1Y += paddleSpeed;
        if (keys.ArrowUp && paddle2Y > 0) paddle2Y -= paddleSpeed;
        if (keys.ArrowDown && paddle2Y < fieldHeight - paddleHeight) paddle2Y += paddleSpeed;

        ballX += ballDirectionX * ballSpeed;
        ballY += ballDirectionY * ballSpeed;

        if (ballY <= 0 || ballY >= fieldHeight) {
            ballDirectionY = -ballDirectionY;
        }

        if (ballX <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
            ballDirectionX = -ballDirectionX;
            // paddleHitSound.play();  // Play sound on paddle hit
        }
        if (ballX >= fieldWidth - paddleWidth - ballRadius && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
            ballDirectionX = -ballDirectionX;
            // paddleHitSound.play();  // Play sound on paddle hit
        }

        if (ballX <= 0) {
            player2Score++;
            // scoreSound.play();  // Play sound on scoring
            resetBall();
        }
        if (ballX >= fieldWidth) {
            player1Score++;
            // scoreSound.play();  // Play sound on scoring
            resetBall();
        }
    }

    // Reset ball position
    function resetBall() {
        ballSpeed = 4;
        ballX = fieldWidth / 2;
        ballY = fieldHeight / 2;
        ballDirectionX = -ballDirectionX;
        ballDirectionY = Math.random() * 2 - 1;
    }

    // Draw game elements
    function draw() {
        ctx.clearRect(0, 0, fieldWidth, fieldHeight);

        const barCount = 10;
        const barSpacing = fieldHeight / (barCount + 1);
        ctx.fillStyle = "#FFF";
        for (let i = 1; i <= barCount; i++) {
            const barY = i * barSpacing;
            ctx.fillRect(fieldWidth / 2 - 1, barY - 5, 2, 10);
        }

        // Draw paddles
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
        ctx.fillRect(fieldWidth - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

        // Draw ball
        ctx.fillStyle = "#FFF";
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw scores
        ctx.fillStyle = "#FFF";
        ctx.font = "30px Arial";
        // ctx.fillText(player1Name, fieldWidth / 4, 30);
        ctx.fillText(player1Score, fieldWidth / 4, 60);
        // ctx.fillText(player2Name, fieldWidth * 3 / 4, 30);
        ctx.fillText(player2Score, fieldWidth * 3 / 4, 60);
    }

    // Handle match end
    function endMatch() {
        // Ensure the player objects are valid.
        if (players[currentPlayerIndex] && players[opponentIndex]) {
            if (player1Score > player2Score) {
                players[currentPlayerIndex].wins++;
                players[opponentIndex].losses++;
            } else {
                players[opponentIndex].wins++;
                players[currentPlayerIndex].losses++;
            }

            // Check if all matches are complete
            if (opponentIndex < players.length - 1) {
                opponentIndex++;
                resetGame();
                startNextMatch();
            } else if (currentPlayerIndex < players.length - 1) {
                // Ensure we don’t exceed the number of players
                currentPlayerIndex++;
                opponentIndex = currentPlayerIndex + 1;
                if (opponentIndex >= players.length) {
                    opponentIndex = currentPlayerIndex + 1; // Ensure opponentIndex does not exceed length
                }
                resetGame();
                startNextMatch();
            } else {
                // This should trigger when both currentPlayerIndex and opponentIndex are at the last match
                console.log("Tournament Over");
                showFinalStandings();
            }
        } else {
            console.error("Invalid player indices:", currentPlayerIndex, opponentIndex);
            // Handle error (you could reset or show an error modal if needed)
        }
    }

    // Show modal with winner
    function showWinnerModal(message) {
        gameCanvas.style.display = "none";  // Hide the game board
        modalMessage.textContent = message;
        modal.style.display = "flex";
    }

    // Show final standings at the end of the tournament
    function showFinalStandings() {
        console.log(user.username + '11 won!!!')
        gameCanvas.style.display = "none";  // Hide the game canvas
        // Sort players by wins in descending order (first by wins, then by losses if needed)
        players.sort((a, b) => {
            if (b.wins === a.wins) {
                return a.losses - b.losses; // Sort by losses if wins are the same
            }
            return b.wins - a.wins; // Sort by wins
        });
        const winner = players[0];
        if (winner.name == user.username) {
            fetch('https://localhost:8008/api/get_tournament_info/', {
                method: 'POST',
                credentials: 'include',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        }
      

        // Prepare the standings chart with winner highlighted
        let standingsHTML = "<h3>Tournament Over!</h3>";
        standingsHTML += "<div><table style='width: 100%; border-collapse: collapse;'>";
        standingsHTML += "<tr><th style='text-align: left; padding: 8px;'>Player</th><th style='text-align: left; padding: 8px;'>Wins</th><th style='text-align: left; padding: 8px;'>Losses</th></tr></div>";

        // Loop through players to display standings
        players.forEach((player, index) => {
            let rowStyle = "";
            if (index === 0) {
                // Highlight the winner
                rowStyle = "background-color: #FFD700; font-weight: bold;";  // Gold background for winner
            }

            standingsHTML += `<tr style="${rowStyle}">
                                <td style="padding: 8px;">${player.name}</td>
                                <td style="padding: 8px;">${player.wins}</td>
                                <td style="padding: 8px;">${player.losses}</td>
                            </tr>`;
        });

        standingsHTML += "</table>";

        // Set the standings in the modal message
        modalMessage.innerHTML = standingsHTML;

        // Display the modal with the standings
        modal.style.display = "flex";
    }

    // Final results modal close handler - redirects to tournament page
    function handleFinalResultsModalClick() {
        // window.location.href = '../html/tournament.html'; // Redirect to tournament page
        loadTournamentPage()
    }

    // Attach event listener to final modal button
    modalButton.addEventListener("click", () => {
        if (modalMessage.textContent.includes("Tournament Over")) {
            handleFinalResultsModalClick();
        } else {
            // For match modal, just close the modal and continue
            modal.style.display = "none"; 
            resetGame();
            gameLoop();
        }
    });

    // Keydown and keyup events for paddle movement
    document.addEventListener("keydown", (event) => {
        if (event.key === "w") keys.w = true;
        if (event.key === "s") keys.s = true;
        if (event.key === "ArrowUp") keys.ArrowUp = true;
        if (event.key === "ArrowDown") keys.ArrowDown = true;
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "w") keys.w = false;
        if (event.key === "s") keys.s = false;
        if (event.key === "ArrowUp") keys.ArrowUp = false;
        if (event.key === "ArrowDown") keys.ArrowDown = false;
    });
}

