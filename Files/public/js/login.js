document.addEventListener("DOMContentLoaded", function (event) {
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("login_uname");
    const passwordInput = document.getElementById("login_password");
    const errorText = document.getElementById("loginError");

    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        const formData = new FormData(document.forms.login)
        var reqBody = {};

        for(var data of formData){
            //console.log(data[0] + " " + data[1]);
            reqBody[data[0]] = data[1];
        }

        console.log("testing " + reqBody.username);
        fetch ('/login', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'    
            }
        })
            .then (res => res.text()
            .then ((data) => {
                if (!data) {
                    errorText.textContent = "Username or Password is incorrect.";
                }
                else {
                    errorText.textContent = "";
                    window.location = '/home?username=' + username;
                }
        }));
    })
})