$(document).ready(function() {


	document.body.addEventListener('click', function(e) {
		if (/\bupvote\b/.test(e.target.className) || /\bdownvote\b/.test(e.target.className)) {
			let button = e.target

			if (e.target.className == "upvote") {
				upvote(button);
			}

			else if (e.target.className == "downvote") {
				downvote(button);
			}

		}
	})


	function upvote(upvote_button) {
		let vote_count = $(upvote_button).siblings('.vote-count');
		let downvote_button = $(upvote_button).siblings('.downvote');


		if (!$(upvote_button).data('clicked') && $(downvote_button).data('clicked') != true) {
			let votes = Number($(vote_count).text()) + 1;
			$(vote_count).text(votes);
			upvote_button.style.opacity = "0.7"

			$(upvote_button).data('clicked', true);
		}

		else if ($(upvote_button).data('clicked') == true){
			let votes = Number($(vote_count).text()) - 1;
			$(vote_count).text(votes);
			upvote_button.style.opacity = "1";
			$(upvote_button).data('clicked', false);
		}

		

	}

	function downvote(downvote_button) {
		let vote_count = $(downvote_button).siblings('.vote-count');
		let upvote_button = $(downvote_button).siblings('.upvote');

		if (!$(downvote_button).data('clicked') && $(upvote_button).data('clicked') != true) {
			let votes = Number($(vote_count).text()) - 1;
			$(vote_count).text(votes);
			downvote_button.style.opacity = "0.7"
			$(downvote_button).data('clicked', true);
		}

		else if ($(downvote_button).data('clicked') == true) {
			let votes = Number($(vote_count).text()) + 1;
			$(vote_count).text(votes);
			downvote_button.style.opacity = "1"
			$(downvote_button).data('clicked', false);
		}

	}

})