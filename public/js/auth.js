// Moving around Login and Signup forms
var loginBtn = document.getElementById("login");
var signupBtn = document.getElementById("signup");
var btn = document.getElementById("btn");
var loginbtn = document.getElementById("login-btn");
var signupbtn = document.getElementById("signup-btn");

function signup() {
    loginBtn.style.left = "-400px"
    signupBtn.style.left = "50px"
    btn.style.left = "100px"
    signupbtn.style.color = "white"
    loginbtn.style.color = "black"
}

function login() {
    loginBtn.style.left = "50px"
    signupBtn.style.left = "450px"
    btn.style.left = "0px"
    loginbtn.style.color = "white"
    signupbtn.style.color = "black"
}

// Post request for submit-login button
const button = document.getElementById('submit-login');

button.addEventListener('click', () => {
    const data = {
        "email": "niknm@nm.com",
        "password": "nikniknik"
    };
    try {
        // Sending a Login request
        const response = fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Loggen in: ', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } catch (err) {
        console.error(`Error: ${err}`);
    }
});

// const data = { username: 'example' };

// fetch('/users/login', {
//     method: 'POST', // or 'PUT'
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });