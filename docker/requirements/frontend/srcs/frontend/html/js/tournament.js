// window.startTournamentGameCall = function() {
//     if (window.gameInstance) {
//         window.gameInstance.destroy();
//     }
//     startTournamentGame();
//     // window.gameInstance = new PongGame("gameCanvas");
// };


// function startTournamentGame() {
//     console.log('this one')
//     const canvas = document.getElementById("gameCanvas");
   
//     const ctx = canvas.getContext("2d");

//     const fieldWidth = canvas.width;
//     const fieldHeight = canvas.height;
//     const paddleWidth = 10;
//     const paddleHeight = 60;
//     const ballRadius = 8;
//     const paddleSpeed = 5;
//     const ballSpeed = 4;
//     const maxScore = 5; // Lower score for a faster tournament

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

//     let players = [
//         { id: 1, name: "Player 1", wins: 0, losses: 0 },
//         { id: 2, name: "Player 2", wins: 0, losses: 0 },
//         { id: 3, name: "Player 3", wins: 0, losses: 0 },
//         { id: 4, name: "Player 4", wins: 0, losses: 0 }
//     ];

//     let currentPlayerIndex = 0;
//     let opponentIndex = 1;
//     let matchInProgress = false;

//     function playSound(soundFilePath) {
//         // const sound = new Audio(soundFilePath);
//         // sound.play();
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
//         if (player1Score >= maxScore || player2Score >= maxScore) {
//             // End current match and determine winner
//             endMatch();
//             return;
//         }

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
//     }

//     function resetGame() {
//         player1Score = 0;
//         player2Score = 0;
//         ballX = fieldWidth / 2;
//         ballY = fieldHeight / 2;
//         ballDirectionX = 1;
//         ballDirectionY = Math.random() * 2 - 1;
//     }

//     function endMatch() {
//         if (player1Score > player2Score) {
//             players[currentPlayerIndex].wins++;
//             players[opponentIndex].losses++;
//             showModal(`${players[currentPlayerIndex].name} wins!`);
//         } else {
//             players[opponentIndex].wins++;
//             players[currentPlayerIndex].losses++;
//             showModal(`${players[opponentIndex].name} wins!`);
//         }

//         // Check if there are more matches
//         setTimeout(() => {
//             if (opponentIndex < players.length - 1) {
//                 opponentIndex++;
//                 resetGame();
//                 gameLoop();
//             } else if (currentPlayerIndex < players.length - 1) {
//                 currentPlayerIndex++;
//                 opponentIndex = currentPlayerIndex + 1;
//                 resetGame();
//                 gameLoop();
//             } else {
//                 showFinalStandings();
//             }
//         }, 1000);
//     }

//     function showModal(message) {
//         modalMessage.textContent = message;
//         modal.style.display = "flex";
//     }

//     function showFinalStandings() {
//         let standings = players.map(player => `${player.name}: ${player.wins}W - ${player.losses}L`);
//         modalMessage.textContent = "Tournament Over!\n" + standings.join("\n");
//         modal.style.display = "flex";
//     }

//     function draw() {
//         ctx.clearRect(0, 0, fieldWidth, fieldHeight);

//         const barCount = 10;
//         const barSpacing = fieldHeight / (barCount + 1);
//         ctx.fillStyle = "#FFF";
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
//         ctx.fillText(player1Score, fieldWidth / 4, 50);
//         ctx.fillText(player2Score, fieldWidth * 3 / 4, 50);
//     }

//     gameLoop();

// }