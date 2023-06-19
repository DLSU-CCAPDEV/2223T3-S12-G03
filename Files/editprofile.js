$(document).ready(function() {

    //Add Event Listener to the Button
    let button = document.getElementById('editBtn');
    button.addEventListener('click', editProfile, false);

    function editProfile(e) {

        e.preventDefault();

        //get data
        var aboutBox = document.getElementById("description-box");
        var aboutUser = document.getElementById("description-text");
        var username = document.getElementById("username");
        var editText = document.getElementById("editText");
        var uploadBtn = document.getElementById("upload-image-div");

        var profileimg = document.getElementById("user-picture");

        var imageInput = document.getElementById("uploaded-image");
        var uploadedImg = "";

        imageInput.addEventListener("change", function () {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                uploadedImg = reader.result;
                profileimg.src = `${uploadedImg}`
            });
            reader.readAsDataURL(this.files[0]);
        });

        //make data editable

        aboutBox.contentEditable = "true";
        aboutUser.contentEditable = "true";
        username.contentEditable = "true";

        if (button.textContent != "Confirm")
        {
            button.textContent = "Confirm";
            editText.textContent = "Profile is now editable";
            uploadBtn.style.display = "inline";
        }
        else 
        {
            button.textContent = "EditProfile";

            aboutBox.contentEditable = "false";
            aboutUser.contentEditable = "false";
            username.contentEditable = "false";
            editText.textContent = "";

            uploadBtn.style.display = "none";
            
        }
    }
})