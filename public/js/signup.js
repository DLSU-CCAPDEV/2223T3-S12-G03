$(document).ready(function(){
    // validations
    let isUsernameGood = false
    let isPasswordGood = false

    let usernameInput = document.querySelector("#registerUsername")
    let passwordInput = document.querySelector("#registerPassword")


    usernameInput?.addEventListener("keyup", async function(e){
        let username = validator.trim($("#registerUsername").val())

        if(validator.isLength(username, {min: 3, max: undefined})){

            $.get("/signupCheckUsername", {username: username}, function(result){
                if(result.username == username){
                    $("#invalid-registration-username").text("Username already exists!")
                    //$("#registerButton").prop("disabled", true)
                    isUsernameGood = false
                }
        
                else{
                    $("#invalid-registration-username").text("")
                    //$("#registerButton").prop("disabled", false)
                    isUsernameGood = true
                }
            })
        }

        else{
            $("#invalid-registration-username").text("Username must be at least 3 characters long")
            isUsernameGood = false
        }
        

        ValidateFields(isUsernameGood, isPasswordGood)

    })

    passwordInput?.addEventListener("keyup", async function(e){
        let password = $("#registerPassword").val() // not going to trim it because some people prefer to have spaces in their password

        if(validator.isLength(password, {min: 8, max: undefined})){
            isPasswordGood = true
            $("#invalid-registration-password").text("")
        }

        else{
            $("#invalid-registration-password").text("Password must be at least 8 characters long")
            isPasswordGood = false
        }

        ValidateFields(isUsernameGood, isPasswordGood)

    })

    
    // activates submit button when requirements are met
    function ValidateFields(validUsername, validPassword){

        if(validUsername && validPassword){
            $("#registerButton").prop("disabled", false)
        }

        else{
            $("#registerButton").prop("disabled", true)
        }
    }
})