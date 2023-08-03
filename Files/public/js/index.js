
$(document).ready(function(){

	sidebar_search = document.getElementById("nav_search");

	sidebar_search.addEventListener("click", function(){
		let search_bar_form = document.getElementById("search-sidebar-container");

		if (search_bar_form.style.display != "none")
			search_bar_form.style.display = "none";
		else
			search_bar_form.style.display = "block";
		
		search_bar_form.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				search_bar_form.method = "GET"
				search_bar_form.action = "/search/" + $(".search-bar").val()
				search_bar_form.submit()
			}
				
		});

	});

	home_header = document.getElementById("home-header")
	header_search = document.getElementById("search-bar")

	header_search.addEventListener('keypress', function (e) {
		if (e.key === 'Enter' && $("#search-bar").val() != "") {
			home_header.method = "GET"
			home_header.action = "/search/" + $("#search-bar").val()
			home_header.submit()
		}
		
	});

});