$(document).ready(function() {

    //Add Event Listener to the Button
    let button = document.getElementById('follow-button');
    button.addEventListener('click', followPost, false);

    function followPost(e) {

        e.preventDefault();

        //make data editable
        
        if (button.textContent != "Follow")
        {
            button.textContent = "Follow";
            button.style.backgroundColor = "#17132a";
        }
        else 
        {
            button.textContent = "Followed";
            button.style.backgroundColor = "#56d0ae";
        }
    }
})