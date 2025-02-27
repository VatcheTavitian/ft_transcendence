function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function loadFriendList() {
    const contentdiv = document.getElementById("contentdiv");
    const newcontainer = document.createElement('div');
    newcontainer.innerHTML = `
        <br>
        <br>
        <div>
            <h3>Your Friends</h3>
            <ul id="friends"></ul>
        </div>
    `;
    contentdiv.appendChild(newcontainer);
    
    loadAddFriend();
    loadDeleteFriendList();

    fetch('https://localhost:8008/api/listfriends/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'X-CSRFToken': getCookie('csrftoken') },
    })
    .then(response => response.json())
    .then(data => {
        const friendsList = document.getElementById('friends');
        friendsList.innerHTML = '';
        let friends = [];

        if (data.nonintrafriends) {
            friends = friends.concat(data.nonintrafriends.map(friend => friend.friend?.username));
        }
        if (data.intrafriends) {
            friends = friends.concat(data.intrafriends.map(intrafriend => intrafriend.intra_friend?.username));
        }

        fetch('https://localhost:8008/api/getonlinestatus/', {
            method: 'GET',
            credentials: 'include',
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
        })
        .then(response => response.json())
        .then(statusData => {
            friends.forEach(username => {
                if (username) {
                    const friendDiv = document.createElement('li');
                    friendDiv.textContent = username;

    
                    if (statusData[username]) {
                        friendDiv.style.color = 'Green';
                        friendDiv.textContent += " (Online)";
                    }

                    friendsList.appendChild(friendDiv);
                }
            });
        })
        .catch(error => console.error('Error fetching online status:', error));
    })
    .catch(error => console.error('Error fetching friend list:', error));
}


function loadAddFriend() {
    const contentdiv = document.getElementById("contentdiv");
    const newcontainer = document.createElement('div');
    newcontainer.innerHTML = `
    <br>
        <div>
            <h3>Add Friend</h3>
            <form id="addFriendForm" method="POST">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <select id="username" name="username" class="form-control" required>
                        <option value="">Select a user</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Add Friend</button>
            </form>
        </div>
    `;
    contentdiv.appendChild(newcontainer)
    fetch('https://localhost:8008/api/listnonfriends/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'X-CSRFToken': getCookie('csrftoken') },
    })
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('addFriendForm').querySelector('select');

        if (data.nonintrafriends) {
            data.nonintrafriends.forEach(friend => {
                if (friend && friend.username) {
                    const option = document.createElement('option');
                    option.value = friend.username;
                    option.text = friend.username;
                    select.appendChild(option);
                }
            });
        }

        if (data.intrafriends) {
            data.intrafriends.forEach(friend => {
                if (friend && friend.username) {
                    const option = document.createElement('option');
                    option.value = friend.username;
                    option.text = friend.username;
                    select.appendChild(option);
                }
            });
        }

    })
    .catch(error => console.error('Error:', error));

    document.getElementById('addFriendForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        fetch('https://localhost:8008/api/addfriend/', {
            method: 'POST',
            credentials: 'include', 
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            body: new FormData(document.getElementById('addFriendForm'))
        })
        .then(response => response.json())
        .then(data => {
           
            if (data.success) {
                const contentdiv = document.getElementById("contentdiv");
                contentdiv.innerHTML = ''
                loadMainPage()
            }
            else if (data.error) {
                const contentdiv = document.getElementById("contentdiv");
                contentdiv.innerHTML = ''
                alert('Error! ' + data.error)
                loadMainPage()
            }
    })
        .catch(error => console.error('Error:', error));
    });
}


function loadDeleteFriendList() {
    const contentdiv = document.getElementById("contentdiv");
    const newcontainer = document.createElement('div');
    newcontainer.innerHTML = `
    <br>
        <div>
            <h3>Remove Friend</h3>
            <form id="deleteFriendForm" method="POST">
                <div class="form-group">
                    <label for="friend">Friend:</label>
                    <select id="friend" name="friend" class="form-control" required>
                        <option value="">Select a friend</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-danger">Delete Friend</button>
            </form>
        </div>
    `;
    contentdiv.appendChild(newcontainer)
    fetch('https://localhost:8008/api/listfriends/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'X-CSRFToken': getCookie('csrftoken') },
    })
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('deleteFriendForm').querySelector('select');
        
        if (data.nonintrafriends) {
            data.nonintrafriends.forEach(friend => {
                const option = document.createElement('option');
                if (friend.friend && friend.friend.username) {
                    option.value = friend.friend.username;
                    option.text = friend.friend.username;
                    select.appendChild(option);
                }
            });
        }

        if (data.intrafriends) {
            data.intrafriends.forEach(intrafriend => {
                const option = document.createElement('option');
                if (intrafriend.intra_friend && intrafriend.intra_friend.username) {
                    option.value = intrafriend.intra_friend.username;
                    option.text = intrafriend.intra_friend.username;
                    select.appendChild(option);
                }
            });
        }
    })
    .catch(error => console.error('Error:', error));

    document.getElementById('deleteFriendForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
                
        fetch('https://localhost:8008/api/deletefriend/', {
            method: 'POST',
            credentials: 'include', 
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            body: new FormData(document.getElementById('deleteFriendForm'))
        })
        .then(response => response.json())
        .then(data => {
        
            if (data.success) {
                const contentdiv = document.getElementById("contentdiv");
                contentdiv.innerHTML = ''
                loadMainPage()
            }
            else if (data.error) {
                const contentdiv = document.getElementById("contentdiv");
                contentdiv.innerHTML = ''
                alert('Error! ' + data.error)
                loadMainPage()
            }
    })
        .catch(error => console.error('Error:', error));
    });
}



function loadMainPage() {
    if (!user) {
        removeAfterLogout()
        loadLoginPage()
    }
    else {
        removeAfterLogin()
        const contentdiv = document.getElementById("contentdiv");
        contentdiv.innerHTML = ''
        const newdiv = document.createElement("div");
        const head = document.createElement("H3");
        if (user.first_name) {
            head.innerText = "Welcome back " + user.first_name;
            newdiv.appendChild(head)
            contentdiv.appendChild(newdiv)
            loadFriendList()
        }
    }

}

function changePasswordForm() {
    if (!user.intra_id) {
        const contentdiv = document.getElementById('contentdiv');
        const newcontainer = document.createElement('div')
        newcontainer.innerHTML = `
        <br>
        <br>
        <h4> Update your password </h4>
        <div class="container mt-4">
                <form id="updatePasswordForm" method="POST" class="form">
                    <div class="form-group">
                        <label for="old_password">Old Password:</label>
                        <input type="password" id="old_password" name="old_password" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="new_password">New Password:</label>
                        <input type="password" id="new_password" name="new_password" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="confirm_password">Confirm Password:</label>
                        <input type="password" id="confirm_password" name="confirm_password" class="form-control" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary mt-2">Change Password</button>
                </form>
            </div>
        `;
        contentdiv.appendChild(newcontainer)
        
        document.getElementById('updatePasswordForm').addEventListener('submit', async function(event) {
            event.preventDefault();
                
            const newPassword = document.getElementById('new_password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            
            if (newPassword !== confirmPassword) {
                alert('New password and confirm password do not match.');
                return;
            }
            
            const formData = new FormData(this);
            const csrftoken = getCookie('csrftoken');
            
            try {
                const response = await fetch('https://localhost:8008/api/updatepassword/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'X-CSRFToken': csrftoken },
                    body: formData
                });
                
                const result = await response.json();
             
                if (result.error)
                    alert('Error!' + result.error);
                else
                    loadProfilePage()
            } catch (error) {
                console.error('Error changing password:', error); 
            }
        });
    }
}

async function loadProfilePage() {
    if (!user) {
        removeAfterLogout()
        loadLoginPage()
    }
    else {
        const container = document.getElementById('contentdiv');
        container.innerHTML = `
            <div class="container mt-4">
            <form id="updateUserForm" method="POST" enctype="multipart/form-data">
            <h4> Update your details </h4>

            <div class="form-group">
                <label for="username">Username:</label>
                <input type="username" id="username" name="username" class="form-control" required readonly>
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="first_name">First Name:</label>
                <input type="text" id="first_name" name="first_name" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="last_name">Last Name:</label>
                <input type="text" id="last_name" name="last_name" class="form-control" required>
            </div>
            <br>
            <div class="form-group">
                <label for="current_photo">Current Profile Image:</label><br>
                <img id="current_photo" src="" alt="Current Profile Image" class="img-thumbnail" width="150">
            </div>
            <br>
            <div class="form-group">
                <label for="avatar">UpdateProfile Image:</label>
                <input type="file" id="avatar" name="avatar" class="form-control-file" accept="image/*">
            </div>     

            <button type="submit" class="btn btn-primary">Update</button>
        </form>
    </div>

        `;
        changePasswordForm()
        try {
            const response = await fetch('https://localhost:8008/api/updateuser/', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            
            document.getElementById('username').value = data.user.username;
            document.getElementById('email').value = data.user.email;
            document.getElementById('first_name').value = data.user.first_name;
            document.getElementById('last_name').value = data.user.last_name;
         
            const avatarUrl = data.avatar.avatar.startsWith('/media/https')
                ? data.avatar.avatar.replace('/media/', '').replace('https%3A/', 'https://')
                : "https://localhost:8008" + data.avatar.avatar;
            
            document.getElementById('current_photo').src = avatarUrl;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        
        document.getElementById('updateUserForm').addEventListener('submit', async function(event) {
            event.preventDefault();
                       
            const csrftoken = getCookie('csrftoken');
            const formData = new FormData(this);
            
            try {
                const response = await fetch('https://localhost:8008/api/updateuser/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'X-CSRFToken': csrftoken },
                    body: formData
                });
                
                const result = await response.json();
            
                if (result.error)
                    alert("Error! " + result.error)
                else
                    loadProfilePage()
            } catch (error) {
                console.error('Error updating user:', error);
            }
        });
    }
}

function loadMatchHistoryPage() {
    if (!user) {
        removeAfterLogout()
        loadLoginPage()
    }
    else {
        const container = document.getElementById('contentdiv');
        const newcontainer = document.createElement('div')
        newcontainer.innerHTML = `
            <div>
                <h3>Match History</h3>
                <ul id="matchHistoryList" class="list-group"></ul>
            </div>
        `;

        container.appendChild(newcontainer)
        fetch('https://localhost:8008/api/get_player_scores', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            const matchHistoryList = document.getElementById('matchHistoryList');
            matchHistoryList.innerHTML = '';
            
            if (data.length > 0) {
                data.forEach(match => {
                    const matchItem = document.createElement('li');
                    matchItem.className = 'list-group-item border rounded mb-3 shadow-sm';  // Here are the integrated Bootstrap classes
                    
                    matchItem.innerHTML = `
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">${new Date(match.match_date).toLocaleString()}</span>
                            <span class="badge bg-success">Winner: <strong>${match.winner}</strong></span>
                        </div>
                        <div class="mb-2">
                            <strong>Player 1:</strong> ${match.player1} 
                            <span class="badge bg-primary">Score: ${match.player1_score}</span>
                        </div>
                        <div class="mb-2">
                            <strong>Opponent:</strong> ${match.player2} 
                            <span class="badge bg-primary">Score: ${match.player2_score}</span>
                        </div>
                    `;
                    matchHistoryList.appendChild(matchItem);
                });
            } else {
                matchHistoryList.innerHTML = '<p>No match history found.</p>';
            }
        })
        .catch(error => console.error('Error fetching match history:', error));
    }
}

function loadTournamentsWonPage() {
    if (!user) {
        removeAfterLogout()
        loadLoginPage()
    }
    else {
        const contentdiv = document.getElementById('contentdiv');
        contentdiv.innerHTML = ''
        const newcontainer = document.createElement('div')
        newcontainer.innerHTML = `
            <div>
                <h3>Tournaments Won</h3>
                <ul id="tournamentsWonList"></ul>
            </div>
        `;
        contentdiv.appendChild(newcontainer)
        
        fetch('https://localhost:8008/api/get_tournament_info', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            const tournamentsWonList = document.getElementById('tournamentsWonList');
            tournamentsWonList.innerHTML = '';
            const tournamentItem = document.createElement('div')
            if (data.won > 0) {
                    tournamentItem.innerHTML = `
                        <strong>${data.won}</strong> <br>
                    `;
                    tournamentsWonList.appendChild(tournamentItem);
            
            } else
                tournamentsWonList.innerHTML = 'No tournaments won found.';
        
        
        })
        .catch(error => console.error('Error fetching tournaments won info:', error));

        const newcontainer2 = document.createElement('div')
        newcontainer2.innerHTML = `
            <div>
                <h3>Match History</h3>
                <ul id="matchHistoryList" class="list-group"></ul>
            </div>
        `;

        contentdiv.appendChild(newcontainer2)
        fetch('https://localhost:8008/api/get_player_scores', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            const matchHistoryList = document.getElementById('matchHistoryList');
            
            if (data.length > 0) {
                data.forEach(match => {
                    const matchItem = document.createElement('li');
                    matchItem.className = 'list-group-item border rounded mb-3 shadow-sm'; // Here are the integrated Bootstrap classes
                    
                    matchItem.innerHTML = `
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">${new Date(match.match_date).toLocaleString()}</span>
                            <span class="badge bg-success">Winner: <strong>${match.winner}</strong></span>
                        </div>
                        <div class="mb-2">
                            <strong>Player 1:</strong> ${match.player1} 
                            <span class="badge bg-primary">Score: ${match.player1_score}</span>
                        </div>
                        <div class="mb-2">
                            <strong>Opponent:</strong> ${match.player2} 
                            <span class="badge bg-primary">Score: ${match.player2_score}</span>
                        </div>
                    `;
                    matchHistoryList.appendChild(matchItem);
                });
            } else {
                matchHistoryList.innerHTML = '<p>No match history found.</p>';
            }
        })
        .catch(error => console.error('Error fetching match history:', error));
    }
}




function loadLoginPage() {
    const container = document.getElementById('contentdiv');
    container.innerHTML = `
        <div class="container mt-4">
            <h3>Login</h3>
            <form id="loginForm" method="POST">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" class="form-control">
                </div>

                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" class="form-control">
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

            <br>
            <a href="https://localhost:8008/api/intralogin/" class="nav-link" id="intraLogin" style="color: blue;">
                Login with 42 Intra instead
            </a>
        </div>
    `;
    loadResetPassword()
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();  
    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;   
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        const csrftoken = getCookie('csrftoken');

        fetch("https://localhost:8008/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'X-CSRFToken': csrftoken,
            },
            body: formData.toString(),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                history.pushState({ page: "main" }, "Main", "/main");
                user = data;
                loadMainPage();
            } else {
                const prevMessage = document.getElementById('errorMessage');
                if (prevMessage) prevMessage.remove();
                const errorMsg = document.createElement('p');
                errorMsg.innerText = "Error: Check Username Or Password!";
                errorMsg.id = 'errorMessage';
                errorMsg.style.color = 'red';
                const intraLoginLink = document.getElementById('intraLogin');
                intraLoginLink.appendChild(errorMsg);
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred during login - try again');
        });
    });
}


function loadResetPassword() {
    const contentdiv = document.getElementById('contentdiv');
    const newcontainer = document.createElement('div')
    newcontainer.innerHTML = `
    <br>
        <div class="container mt-4">
            <h3>Reset Password</h3>
            <p>If you have forgotten your password, enter your email to receive a new one
            <form id="passwordResetForm" method="POST">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary">Reset Password</button>
            </form>
        </div>
    `;

    contentdiv.appendChild(newcontainer)

    document.getElementById('passwordResetForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const csrftoken = getCookie('csrftoken');
        fetch('https://localhost:8008/api/resetpassword/', {
            method: 'POST',
            credentials: 'include', 
            headers: { 'X-CSRFToken': csrftoken },
            body: new FormData(document.getElementById('passwordResetForm'))
        })
        .then(response => response.json())
        .then(data => {
          
            if (data.detail) {
                alert('Password reset has been sent')
                loadLoginPage()
            }
            if (data.email) 
                alert('User with that email does not exist')
    })
        .catch(error => console.error('Error:', error));
    });
}




function loadRegisterPage() {
    const container = document.getElementById('contentdiv');
    container.innerHTML = `
        <div class="container mt-4">
            <form id="createNewUser" method="POST" action="https://localhost:8008/api/register/" enctype="multipart/form-data">
                <h4>Create new user</h4>

                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="confirm_password">Confirm Password:</label>
                    <input type="password" id="confirm_password" name="confirm_password" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="first_name">First Name:</label>
                    <input type="text" id="first_name" name="first_name" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="last_name">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="avatar">Profile Image:</label>
                    <input type="file" id="avatar" name="avatar" class="form-control-file" accept="image/*">
                </div>

                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        </div>
    `;

 

    document.getElementById('createNewUser').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const csrftoken = getCookie('csrftoken');
        fetch('https://localhost:8008/api/register/', {
            method: 'POST',
            credentials: 'include',
            headers: { 'X-CSRFToken': csrftoken },
            body: new FormData(document.getElementById('createNewUser'))
        })
        .then(response => response.json())
        .then(data => {
      
            if (data.error)
                alert('Error! ' + data.error)
            else if (data.success) {
                alert('Successfuly registered, please login')
                loadLoginPage()
            }
    })
        .catch(error => console.error('Error:', error));
    });
}

function loadGamePage() {
    if (!user) {
        removeAfterLogout()
        loadLoginPage()
    }
    else {
        const contentdiv = document.getElementById('contentdiv');
        contentdiv.innerHTML = ""
        const newcontainer = document.createElement('div')
        newcontainer.innerHTML = ` <div id="menu" class="menu">
            <h1>PONG</h1>
            <button id="singleplayer-btn" class="menu-btn">Singleplayer</button>
            <button id="2player-btn" class="menu-btn">2 Player</button>
            <button id="4player-btn" class="menu-btn">4 Player</button>
        </div>

        <script src="../js/script.js"></script>`
        contentdiv.appendChild(newcontainer)
        spb = document.getElementById('singleplayer-btn');
        spb.addEventListener('click', loadSinglePlayerPage);
        spb2 = document.getElementById('2player-btn');
        spb2.addEventListener('click', load2PlayerPage);
        spb4 = document.getElementById('4player-btn');
        spb4.addEventListener('click', load4PlayerPage);
    }
}



window.onpopstate = function(event) {
    const page = event.state ? event.state.page : 'main';
    if (page === 'login') 
        loadLoginPage()
    else if (page === 'register')
        loadRegisterPage()
    else if (page === 'main')
        loadMainPage()
    else if (page === 'playgame')
        loadGamePage()
    else if (page === 'playtournament')
        loadTournamentPage()
    else if (page === 'matchhistory')
        loadTournamentsWonPage()
    else if (page === 'profile') 
        loadProfilePage()
}




function loadTournamentPage() {
    if (!user) {
        removeAfterLogout()
        loadLoginPage()
    }
    else {
        const contentdiv = document.getElementById('contentdiv');
        contentdiv.innerHTML = ""
        const newcontainer = document.createElement('div')
        newcontainer.innerHTML = `
        <head><link rel="stylesheet" href="../css/tournament.css"></head>
        <style>body {background-color: black;}</style>
        <div id="playerInputSection">
        <h2>Enter Tournament Details</h2>
        <label for="numPlayers">Number of Players: </label>
        <input type="number" id="numPlayers" min="2" max="10" value="2">
        <button id="startInputBtn">Enter Names</button>

        <div id="playersInputs" style="display: none;">
            <h3>Enter Player Aliases</h3>
            <div id="playerNamesInputs"></div>
            <button id="startTournamentBtn" style="display: none;">Start Tournament</button>
        </div>
        </div>

        <canvas id="gameCanvas" width="800" height="400" style="display: none;"></canvas>

        <div id="modal">
        <div id="modalMessage"></div>
        <button id="modalButton" style="display: none;">Next Match</button>
        </div>
        <script src="../js/tournament.js"></script>
        `;
        contentdiv.appendChild(newcontainer);
        const script = document.createElement('script');
        script.src = '../js/tournament.js';
        script.onload = function() {
            launchTournament();
        };
        document.body.appendChild(script);
    }
}