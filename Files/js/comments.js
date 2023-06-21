$(document).ready(function() {


    //Add Event Listener to the Button
    document.getElementById('post-comment').addEventListener('click', postComment, false);
    

    function postComment()
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
            removeComment();
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

        //Comment remove
        const commentRemove = document.createElement("div");
        commentRemove.classList.add("comment-remove");

        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("remove-button");
        
        commentAuthor.appendChild(link);

        commentContent.appendChild(text);

        commentDate.appendChild(text2);
        commentDate.appendChild(dateText);

        commentRemove.appendChild(removeButton);

        newCommentDiv.appendChild(commentAuthor);
        newCommentDiv.appendChild(commentContent);
        newCommentDiv.appendChild(commentDate);
        newCommentDiv.appendChild(commentRemove);

        document.getElementsByClassName("comments-container").item(0).append(newCommentDiv);
        
    }

    function removeComment(){
        $(".comment-box").on("click", ".remove-button", function(){
            $(this).closest(".comment-box").remove();
        });
    }

    function getDateToday()
    {
        var today = new Date();

        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDate();

        var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        return "" +monthArray[month]+ " " +day+ ", " +year;
    }
})