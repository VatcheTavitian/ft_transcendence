


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

    let scriptExists = false;
    const scripts = document.getElementsByTagName('script');

    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('2p.js')) {
            scriptExists = true;
            break;
        }
    }

 
    if (!scriptExists) {
        const script = document.createElement('script');
        script.src = '../js/2p.js'; 
        script.type = 'text/javascript';
        script.onload = function() {
            if (typeof window.start2PlayerGame === "function") {
                window.start2PlayerGame();
            } else {
                console.error("start2PlayerGame is not defined");
            }
        };
        script.onerror = (error) => {
            console.error('Error loading 2p.js:', error);
        };
        document.body.appendChild(script);
    } else {
 
        if (typeof window.start2PlayerGame === "function") {
            window.start2PlayerGame();
        } else {
            console.error("start2PlayerGame is not defined");
        }
    }
}






function load4PlayerPage() {
    const gameContainer = document.getElementById('contentdiv');
    gameContainer.innerHTML = `
        <style>body {background-color: black;}</style>
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <div id="modal">
            <div id="modalContent">
                <button id="modalButton">Reset</button>
                <p id="modalMessage" style="font-weight: bold; color: white;"></p>
            </div>
        </div>`;


    let scriptExists = false;
    const scripts = document.getElementsByTagName('script');

    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('4p.js')) {
            scriptExists = true;
            break;
        }
    }

    if (!scriptExists) {
        const script = document.createElement('script');
        script.src = '../js/4p.js'; 
        script.type = 'text/javascript';
        script.onload = function() {
            if (typeof window.start4PlayerGame === "function") {
                window.start4PlayerGame();
            } else {
                console.error("start4PlayerGame is not defined");
            }
        };
        script.onerror = (error) => {
            console.error('Error loading 4p.js:', error);
        };
        document.body.appendChild(script);
    } else {
        if (typeof window.start4PlayerGame === "function") {
            window.start4PlayerGame();
        } else {
            console.error("start4PlayerGame is not defined");
        }
    }
}









///////////////////////////////////////////////////////////////////////



