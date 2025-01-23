const tournamentBtn = document.getElementById('tournament-btn');
const twoPlayersBtn = document.getElementById('two-players-btn');
const threePlayersBtn = document.getElementById('three-players-btn');
const fourPlayersBtn = document.getElementById('four-players-btn');

tournamentBtn.addEventListener('click', startTournament);
twoPlayersBtn.addEventListener('click', startTwoPlayers);
threePlayersBtn.addEventListener('click', startThreePlayers);
fourPlayersBtn.addEventListener('click', startFourPlayers);

function startTournament() {
    window.location.href = 'tournament.html';
}

function startTwoPlayers() {
    window.location.href = '../html/2-player.html';
}

function startThreePlayers() {
    window.location.href = '../html/3-player.html';
}

function startFourPlayers() {
    window.location.href = '../html/4-player.html';
}
