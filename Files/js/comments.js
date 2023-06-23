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
            editComment();
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

        //Comment edit
        const commentEdit = document.createElement("div");
        commentEdit.classList.add("edit-button");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute("id","frEditBtn");
        
        //
        commentAuthor.appendChild(link);

        commentContent.appendChild(text);

        commentDate.appendChild(text2);
        commentDate.appendChild(dateText);

        commentRemove.appendChild(removeButton);

        commentEdit.appendChild(editButton);

        //
        newCommentDiv.appendChild(commentAuthor);
        newCommentDiv.appendChild(commentContent);
        newCommentDiv.appendChild(commentDate);
        newCommentDiv.appendChild(commentRemove);
        newCommentDiv.appendChild(commentEdit);

        document.getElementsByClassName("comments-container").item(0).append(newCommentDiv);
        
    }

    function removeComment(){
        $(".comment-box").on("click", ".remove-button", function(){
            $(this).closest(".comment-box").remove();
        });
    }

    function editComment(){
        $(".comment-box").on("click", "#frEditBtn", function(){
            if($(this).text() == "Edit"){
                $(this).text("Confirm");
                $(".comment-content > p").attr("contenteditable", "true");
            }
            else{
                $(this).text("Edit");
                $(".comment-content > p").attr("contenteditable", "false");
            }
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