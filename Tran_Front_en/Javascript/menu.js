document.getElementById("singlePlayerBtn").addEventListener("click", function () {
    loadGame("singleplayer");
});

document.getElementById("multiPlayerBtn").addEventListener("click", function () {
    loadGame("multiplayer");
});

function loadGame(mode) {
    // Dynamically load the corresponding game files
    const gameContainer = document.body;
    
    // Remove current content
    gameContainer.innerHTML = "";

    // Create the game div container
    const gameDiv = document.createElement("div");
    gameContainer.appendChild(gameDiv);

    // Load the correct HTML, CSS, and JavaScript based on the selected mode
    if (mode === "singleplayer") {
        // Load Singleplayer HTML content dynamically
        gameDiv.innerHTML = `
            <div class="board">
                <div class='ball'>
                    <div class="ball_effect"></div>
                </div>
                <div class="paddle_1 paddle"></div>
                <div class="paddle_2 paddle"></div>
                <h1 class="player_1_score">0</h1>
                <h1 class="message">Press Enter to Play Pong</h1>
            </div>
        `;
        // Change CSS file for singleplayer
        document.getElementById("style").setAttribute("href", "singleplayer.css");
        // Add singleplayer game logic
        const script = document.createElement("script");
        script.src = "singleplayer_logic.js";
        gameContainer.appendChild(script);
    } else if (mode === "multiplayer") {
        // Load Multiplayer HTML content dynamically
        gameDiv.innerHTML = `
            <div class="board">
                <div class='ball'>
                    <div class="ball_effect"></div>
                </div>
                <div class="paddle_1 paddle"></div>
                <div class="paddle_2 paddle"></div>
                <div class="paddle_3 paddle"></div>
                <div class="paddle_4 paddle"></div>
                <h1 class="player_1_score">0</h1>
                <h1 class="player_2_score">0</h1>
                <h1 class="player_3_score">0</h1>
                <h1 class="player_4_score">0</h1>
                <h1 class="message">Press Enter to Play Pong</h1>
            </div>
        `;
        // Change CSS file for multiplayer
        document.getElementById("style").setAttribute("href", "multiplayer.css");
        // Add multiplayer game logic
        const script = document.createElement("script");
        script.src = "multiplayer_logic.js";
        gameContainer.appendChild(script);
    }
}
