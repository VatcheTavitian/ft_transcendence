


function loadSinglePlayerPage() {
	const gameContainer = document.getElementById('contentdiv');
	gameContainer.innerHTML = `
	<style>body {background-color: black;}</style>
	<canvas id="gameCanvas" width="800" height="600"></canvas>
	<div id="modal">
		<div id="modalContent">
		<button id="modalButton">Reset</button>
		<p id="modalMessage" style="font-weight: bold;"></p>
		</div>
	</div>`;
	const script = document.createElement('script');
	script.src = '../js/1p.js';
	document.body.appendChild(script);
	script.onload = function() {
		if (typeof window.startSingleGame === "function") {
			window.startSingleGame();
		} else {
			console.error("startSingleGame is not defined");
		}
	};
}

function load2PlayerPage() {
	const gameContainer = document.getElementById('contentdiv');
	gameContainer.innerHTML = `
	<style>body {background-color: black;}</style>
	<canvas id="gameCanvas" width="800" height="600"></canvas>
	<div id="modal">
		<div id="modalContent">
		<button id="modalButton">Reset</button>
		<p id="modalMessage" style="font-weight: bold;"></p>
		</div>
	</div>`;
	const script = document.createElement('script');
	script.src = '../js/2p.js';
	document.body.appendChild(script);
	script.onload = function() {
		if (typeof window.start2PlayerGame === "function") {
			window.start2PlayerGame();
		} else {
			console.error("start2PlayerGame is not defined");
		}
	};
}



function load3PlayerPage() {
	const gameContainer = document.getElementById('contentdiv');
	gameContainer.innerHTML = `
	<style>body {background-color: black;}</style>
	<canvas id="gameCanvas" width="800" height="600"></canvas>
	<div id="modal">
		<div id="modalContent">
		<button id="modalButton">Reset</button>
		<p id="modalMessage" style="font-weight: bold;"></p>
		</div>
	</div>`;
	const script = document.createElement('script');
	script.src = '../js/3p.js';
	document.body.appendChild(script);
	script.onload = function() {
		if (typeof window.start3PlayerGame === "function") {
			window.start3PlayerGame();
		} else {
			console.error("start3PlayerGame is not defined");
		}
	};
}



function load4PlayerPage() {
	const gameContainer = document.getElementById('contentdiv');
	gameContainer.innerHTML = `
	<style>body {background-color: black;}</style>
	<canvas id="gameCanvas" width="800" height="600"></canvas>
	<div id="modal">
		<div id="modalContent">
		<button id="modalButton">Reset</button>
		<p id="modalMessage" style="font-weight: bold;"></p>
		</div>
	</div>`;
	const script = document.createElement('script');
	script.src = '../js/4p.js';
	document.body.appendChild(script);
	script.onload = function() {
		if (typeof window.start4PlayerGame === "function") {
			window.start4PlayerGame();
		} else {
			console.error("start4PlayerGame is not defined");
		}
	};
}









///////////////////////////////////////////////////////////////////////



