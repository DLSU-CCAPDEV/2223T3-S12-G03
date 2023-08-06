
const db = require("../models/db.js")
const Post = require("../models/PostModel.js")

const search_controller = {

    //Search Page
    searchPage: function(req, res) {
        
        db.findMany(Post, {}, {}, function(result){

            if(result){

                let searchKey = req.params.key.toLowerCase()
                console.log("Searching: " + searchKey)

                let details = [];
                let i = 0;
                for(let input of result){

                    // will not work if any of these 3 have no value
                    if(input["game"] && input["username"] && input["postTitle"]){

                        let game = input["game"].toLowerCase()
                        let username = input["username"].toLowerCase()
                        let postTitle = input["postTitle"].toLowerCase()
    
                        // will only send posts search.hbs that matches the search key
                        if (game.includes(searchKey) || username.includes(searchKey) || postTitle.includes(searchKey)){
                            let detail = {
                                game: input['game'],
                                username: input['username'],
                                postDate: input['postDate'],
                                postTitle: input['postTitle'],
                                image: input['image'],
                                postDesc: input['postDesc'],
                                vote: input['vote'],
                                commentNo: input['commentNo'],
                                postid: input['postid'],
                            }
                            console.log(detail);
                            details[i] = detail; 
                            i++;
                        }
                    }
                    
                }
                details = details.reverse();
                res.render('search', {
                    title: "Search Results",
                    items: details
                })
            }
            else{
                res.render('search', {
                    title: "Search Results"
                })
            }
        })
        
    },

}

module.exports = search_controller
//export default search_controller;