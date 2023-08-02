$(document).ready(function(){
    // validations

    let usernameInput = document.querySelector("#registerUsername")

    usernameInput?.addEventListener("keyup", async function(e){
        let username = $("#registerUsername").val()

        $.get("/signupCheckUsername", {username: username}, function(result){
            if(result.username == username){
                $("#invalid-registration").text("Username already exists!")
                $("#registerButton").prop("disabled", true)
            }
    
            else{
                $("#invalid-registration").text("")
                $("#registerButton").prop("disabled", false)
            }
        })
    })

    
})