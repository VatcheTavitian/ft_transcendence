const singleplayerBtn = document.getElementById('singleplayer-btn');
const multiplayerBtn = document.getElementById('multiplayer-btn');

singleplayerBtn.addEventListener('click', startSingleplayer);
multiplayerBtn.addEventListener('click', startMultiplayer);

function startSingleplayer() {
    window.location.href = '../html/singleplayer.html';
}

function startMultiplayer() {
    window.location.href = '../html/multiplayer_select.html';
}
