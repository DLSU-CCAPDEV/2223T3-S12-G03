$(document).ready(function() {

    //Add Event Listener to the Button
    document.getElementById('post-comment').addEventListener('click', postComment, false);

    function postComment ()
    {
        //get Data
        let Date = getDateToday();
        let Username = "BigChungus";
        let Comment = document.getElementById("comment-input-box").value;

        //console.log(Date);
        
        if (Comment)
        {
            console.log(Comment);
            submitComment(Date, Comment, Username);
            document.getElementById("comment-input-box").value = "";
        }
    }

    function submitComment(Date, Comment, Username) {

        //Comment box div
        const newCommentDiv = document.createElement("div");
        newCommentDiv.classList.add("comment-box");
        
        //Comment Author
        const commentAuthor = document.createElement("div");
        commentAuthor.classList.add("comment-author");

        //<div class="comment-author">
        //      <a href="profile.html" class="comment-author-link"> BigChungus </a>
        //</div>
        const link =  document.createElement("a");
        link.href = "profile.html";
        link.textContent = Username;
        link.classList.add("comment-author-link");

        //Comment content
        const commentContent = document.createElement("div");
        commentContent.classList.add("comment-content");

        const text =  document.createElement("p");
        text.textContent = Comment;

        //Comment date
        const commentDate = document.createElement("div");
        commentDate.classList.add("comment-date");

        const text2 =  document.createElement("span");
        text2.textContent = "Commented On: ";

        const dateText =  document.createElement("span");
        dateText.textContent = Date;
        
        commentAuthor.appendChild(link);

        commentContent.appendChild(text);

        commentDate.appendChild(text2);
        commentDate.appendChild(dateText);

        newCommentDiv.appendChild(commentAuthor);
        newCommentDiv.appendChild(commentContent);
        newCommentDiv.appendChild(commentDate);

        document.getElementsByClassName("comments-container").item(0).append(newCommentDiv);
    }

    function getDateToday()
    {
        var today = new Date();

        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDay() + 1;

        var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        return "" +monthArray[month]+ " " +day+ ", " +year;
    }
})