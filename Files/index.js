$(document).ready(function() {

	sidebar_search = document.getElementById("nav_search");

	sidebar_search.addEventListener("click", function(){
		let search_bar = document.getElementById("search-sidebar-container");

		if (search_bar.style.display == "none")
			search_bar.style.display = "block";
		else
			search_bar.style.display = "none";
		
		search_bar.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				window.location.href = "forum.html";
			}
				
		});

	});

	header_search = document.getElementById("search-bar");

	header_search.addEventListener('keypress', function (e) {
		if (e.key === 'Enter') {
			window.location.href = "html/forum.html";
		}
		
	});
})