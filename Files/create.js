var Post = function(title, content, game){
                this.title = title;
                this.content = content;
                this.game = game;
}

var errorTitle = "Enter a title";
var errorContent =  "Enter description";
const defaultUser = "BigChungus";
var uploaded_image;

var loadFile = function(event) {
	var image = document.getElementById('display-image');
    uploaded_image = URL.createObjectURL(event.target.files[0]);
	image.src = uploaded_image;
};

$(document).ready(function(){
    console.log("Document Ready");
    

    $(".collapsible").click(function(e){
        if($(".hide").css("display") === "block"){
            $(".hide").css("display", "none");
        }
        else{
            $(".hide").css("display", "block");
            window.scrollTo(0,0);
        }

    });

    $("#submit-button").click(function(e){
        e.preventDefault();
        let title = $("#post-title").val();
        let content = $("#post-content").val();
        let game = $("#selected-game").val();

        if(validateFields(title, content)){
            let post = new Post(title, content, game);
            
            refreshDisplay(post);
            resetForm();
        }
    });

    function dateFormat(){
        var today = new Date();

        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDay() + 1;

        var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        return "" +monthArray[month]+ " " +day+ ", " +year;
    }

    function refreshDisplay(post){
        let parent = $("#forum-body");

        let forum_post = document.createElement("div");
        let top_bar = document.createElement("div");
        let game_post = document.createElement("div");
        let game_post_div = document.createElement("div");
        let game_post_span_1 = document.createElement("span");
        let game_post_user = document.createElement("a");
        let game_post_span_2 = document.createElement("span"); 
        let post_title_link = document.createElement("a");
        let post_title = document.createElement("p");
        let post_body = document.createElement("div");
        let post_image = document.createElement("img");
        let bottom_bar = document.createElement("div");
        let forumactions = document.createElement("div");
        let upvote_icon = document.createElement("img");
        let vote_counter = document.createElement("p");
        let downvote_icon = document.createElement("img");
        let comment = document.createElement("div");
        let comment_icon = document.createElement("img");
        let comment_counter = document.createElement("p");
       
        $(forum_post).addClass("forum-post");
        $(top_bar).addClass("top-bar");
        $(game_post).addClass("game-post");
        $(game_post_user).addClass("game-post-user");
        $(post_title_link).addClass("post-title-link");
        $(post_title).addClass("post-title");
        $(post_body).addClass("forum-post-body");
        $(bottom_bar).addClass("bottom-bar");
        $(upvote_icon).addClass("upvote");
        $(vote_counter).addClass("vote-count");
        $(downvote_icon).addClass("downvote");
        $(comment_icon).addClass("comment");
        $(comment_counter).addClass("comment-count");
        $(post_image).addClass("post-image");

        

        $(forumactions).append(upvote_icon);
        $(forumactions).append(vote_counter);
        $(forumactions).append(downvote_icon);
        $(forumactions).append(comment_icon);
        $(forumactions).append(comment_counter);

        $(game_post).append(game_post_div);
        $(game_post).append(game_post_span_1);
        $(game_post).append(game_post_user);
        $(game_post).append(game_post_span_2);

        $(post_title_link).append(post_title);

        $(bottom_bar).append(forumactions);

        $(top_bar).append(game_post);
        $(top_bar).append(post_title_link);

        $(post_body).append(post_image);

        $(forum_post).append(top_bar);
        $(forum_post).append(post_body);
        $(forum_post).append(bottom_bar);

        $(game_post_div).text("Game | " + post.game);
        $(game_post_span_1).text("Posted by: ");
        $(game_post_user).text(defaultUser);
        $(game_post_user).attr("href", "profile.html");
        $(game_post_span_2).text("; On: " + dateFormat());

        $(post_image).attr("src", uploaded_image);

        $(post_title).text(post.title);
        $(upvote_icon).attr("src", "../images/forum_icons.png");
        $(downvote_icon).attr("src", "../images/forum_icons.png");
        $(comment_icon).attr("src", "../images/comment-icon.png");
        $(comment_counter).text("0");
        $(vote_counter).text("0");
        $(comment_counter).text("0");

        
        $(parent).prepend(forum_post);

    }

    function validateFields(title, content) {
		if(title.length == 0 || content.length == 0){
			if(title.length == 0){
				showError(errorTitle);
			}
			else if(content.length == 0){
				showError(errorContent);
			}
			return false;
		}
		return true;
	}

    function hideError() {
		$("div#error-text").text("");
	}

	function showError(errorText) {
		$("div#error-text").text(errorText);
	}

    function resetForm() {
        $("#post-title").val("");
        $("#post-content").val("");
        $("#uploaded-image").val("");
        $("#selected-game").val("Apex Legends");
        $("#display-image").attr("src", "");
        hideError();
	}
});