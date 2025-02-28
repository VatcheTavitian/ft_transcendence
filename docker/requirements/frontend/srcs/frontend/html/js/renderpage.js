let user = null;

async function getUserInfo() {
        try {
            let response = await fetch('https://localhost:8008/api/getuserinfo', {
                method: 'GET',
                credentials: 'include',
            });
            user = await response.json();
            console.log("User info updated:", user);
            loadUserData()
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }


function removeAfterLogout() {
        const mainButton = document.getElementById('mainButton')
        const playGameButton = document.getElementById('playGameButton')
        const playTournamentButton = document.getElementById('playTournamentButton')
        const loginButton = document.getElementById('loginButton')
        const registerButton = document.getElementById('registerButton')
        const logoutButton = document.getElementById('logoutButton')
        const profileButton = document.getElementById('profileButton')
        const matchHistoryButton = document.getElementById('matchHistoryButton')
        if (mainButton !== null) {
            mainButton.remove();
        }
        if (loginButton == null) {
            renderLoginButton();
        }
        if (registerButton == null) 
            renderRegisterButton();
        if (playGameButton !== null)
            playGameButton.remove()
        if (playTournamentButton !== null)
            playTournamentButton.remove()
        if (matchHistoryButton !== null)
            matchHistoryButton.remove()
        if (logoutButton !== null)
            logoutButton.remove()
        if (profileButton !== null)
            profileButton.remove()
    }    

function removeAfterLogin() {
    const mainButton = document.getElementById('mainButton')
    const playGameButton = document.getElementById('playGameButton')
    const playTournamentButton = document.getElementById('playTournamentButton')
    const loginButton = document.getElementById('loginButton')
    const registerButton = document.getElementById('registerButton')
    const logoutButton = document.getElementById('logoutButton')
    const profileButton = document.getElementById('profileButton')
    const matchHistoryButton = document.getElementById('matchHistoryButton')
    if (mainButton == null) {
       renderMainButton();
    }
    if (loginButton !== null) {
        loginButton.remove();
    }
    if (registerButton !== null) 
        registerButton.remove();
    if (playGameButton == null)
        renderPlayGameButton()
    if (playTournamentButton == null)
        renderPlayTournamentButton()
    if (matchHistoryButton == null)
        renderMatchHistoryButton()
    if (profileButton == null)
        renderProfileButton()
    if (logoutButton == null)
        renderLogoutButton()
}




function loadUserData() {
    if (user == null || user[401]) {
        instructLogin();
        renderLoginButton()
        renderRegisterButton()
    }
    else {
      loadMainPage()
    }
    
}
getUserInfo();

