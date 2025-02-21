


function instructLogin () {

    removeAfterLogout()


    const contentdiv = document.getElementById("contentdiv")
    contentdiv.innerHTML = ''
    const newdiv = document.createElement("div")

    const head = document.createElement("H3")
    head.innerText = "You are not logged in"

    const par = document.createElement("p")
    par.innerText = "Please login to use this site"

    newdiv.appendChild(head)
    newdiv.appendChild(par)
    contentdiv.appendChild(newdiv)


};


function renderProfileButton() {

    const profileButton = document.getElementById('loginButton')
    if (!profileButton) {
        const navbarNav = document.getElementById("navbarNav")
        const li = document.createElement("li")
        li.className = "nav-item"
        const alink = document.createElement("a")
        alink.href = "/profile"
        alink.className = "nav-link"
        alink.innerText = "Profile"
        alink.style.color = "#39FF14"
        alink.id = "profileButton" 

        li.append(alink)
        navbarNav.appendChild(li)

        alink.addEventListener('click', function(event) {
        event.preventDefault();
        history.pushState({ page: "profile" }, "Profile", "/profile");
        loadProfilePage();
        })
    }
}

function renderMainButton() {

    const mainButton = document.getElementById('mainButton')
    if (!mainButton) {
        const navbarNav = document.getElementById("navbarNav")
        const li = document.createElement("li")
        li.className = "nav-item"
        const alink = document.createElement("a")
        alink.href = "/main"
        alink.className = "nav-link"
        alink.innerText = "Home"
        alink.style.color = "#39FF14"
        alink.id = "mainButton" 

        li.append(alink)
        navbarNav.appendChild(li)

        alink.addEventListener('click', function(event) {
        event.preventDefault();
        history.pushState({ page: "main" }, "Main", "/main");
        loadMainPage();
        })
    }
}


function renderLoginButton() {

    const loginButton = document.getElementById('loginButton')
    if (!loginButton) {
        const navbarNav = document.getElementById("navbarNav")
        const li = document.createElement("li")
        li.className = "nav-item"
        const alink = document.createElement("a")
        alink.href = "/login"
        alink.className = "nav-link"
        alink.innerText = "Login"
        alink.style.color = "#39FF14"
        alink.id = "loginButton" 

        li.append(alink)
        navbarNav.appendChild(li)

        alink.addEventListener('click', function(event) {
        event.preventDefault();
        history.pushState({ page: "login" }, "Login", "/login");
        loadLoginPage()
        })
    }
}

function renderRegisterButton() {

    const registerButton = document.getElementById('registerButton')
    if (!registerButton) {
        const navbarNav = document.getElementById("navbarNav")
        const li = document.createElement("li")
        li.className = "nav-item"
        const alink2 = document.createElement("a")
        alink2.href = "/register"
        alink2.className = "nav-link"
        alink2.innerText = "Register"
        alink2.style.color = "#39FF14"
        alink2.id = 'registerButton'

        li.append(alink2)
        navbarNav.appendChild(li)

        alink2.addEventListener('click', function(event) {
        event.preventDefault();
        history.pushState({ page: "register" }, "Register", "/register");
        loadRegisterPage()
        });
    }

}



function renderMatchHistoryButton() {

    const navbarNav = document.getElementById("navbarNav")
    const li = document.createElement("li")
    li.className = "nav-item"
    const alink = document.createElement("a")
    alink.href = "/matchhistory"
    alink.className = "nav-link"
    alink.innerText = "Match History"
    alink.style.color = "#39FF14"
    alink.id = 'matchHistoryButton'

    li.append(alink)
    navbarNav.appendChild(li)

    alink.addEventListener('click', function(event) {
        event.preventDefault();
        history.pushState({ page: "matchhistory" }, "MatchHistory", "/matchhistory");
        loadTournamentsWonPage()
        // loadMatchHistoryPage()
        });
}

function renderLogoutButton() {

    const navbarNav = document.getElementById("navbarNav")
    const li = document.createElement("li")
    li.className = "nav-item"
    const alink = document.createElement("a")
    alink.href = "/logout"
    alink.className = "nav-link"
    alink.innerText = "Logout"
    alink.style.color = "#39FF14"
    alink.id = 'logoutButton'

    li.append(alink)
    navbarNav.appendChild(li)

    alink.addEventListener('click', function(event) {
        event.preventDefault();
        history.pushState({ page: "logout" }, "Logout", "/logout");
        user = null
        fetch('https://localhost:8008/api/logout', {
            method: 'GET',
            credentials: 'include'  
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            instructLogin()
        })
        .catch(error => console.error('Error:', error));
    });
}


function renderPlayGameButton() {

    const navbarNav = document.getElementById("navbarNav")
    const li = document.createElement("li")
    li.className = "nav-item"
    const alink = document.createElement("a")
    alink.href = "/playgame"
    alink.className = "nav-link"
    alink.innerText = "Play Game"
    alink.style.color = "#39FF14"
    alink.id = 'playGameButton'

    li.append(alink)
    navbarNav.appendChild(li)

    alink.addEventListener('click', function(event) {
        event.preventDefault();
        history.pushState({ page: "playgame" }, "PlayGame", "/playgame");
        loadGamePage()
    });
}

function renderPlayTournamentButton() {

    const navbarNav = document.getElementById("navbarNav")
    const li = document.createElement("li")
    li.className = "nav-item"
    const alink = document.createElement("a")
    alink.href = "/playtournament"
    alink.className = "nav-link"
    alink.innerText = "Play Tournament"
    alink.style.color = "#39FF14"
    alink.id = 'playTournamentButton'

    li.append(alink)
    navbarNav.appendChild(li)

    alink.addEventListener('click', function(event) {
        event.preventDefault();
        history.pushState({ page: "playtournament" }, "PlayTournament", "/playtournament");
        loadTournamentPage()
        });
}
