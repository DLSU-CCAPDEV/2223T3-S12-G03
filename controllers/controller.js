/*
import db from '../models/db.js';
import Post from '../models/PostModel.js';
import Comment from '../models/CommentModel.js';
import User from '../models/UserModel.js';
import upload from "../models/uploadMiddleware.js";
*/

const db = require("../models/db.js")
const Post = require("../models/PostModel.js")
const Comment = require("../models/CommentModel.js")
const User = require("../models/UserModel.js")
const upload = require("../models/uploadMiddleware.js")

const defaultUser = "BigChungus";

function dateFormat(){
    var today = new Date();

    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();

    var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    return "" +monthArray[month]+ " " +day+ ", " +year;
}

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    get404: function(req, res){
        res.render("404")
    },

    //Temporary Home page 
    getHome: function(req, res) {

        let isGuest = true
        if(req.session.username) isGuest = false

        console.log("@/home/" + req.session.username);
        db.findMany(Post, {}, {}, function(data){
            if(data.length >= 1){
                var details = [];
                var i = 0;
                for(var input of data){
                    var detail = {
                        postDate: input['postDate'],
                        postTitle: input['postTitle'],
                        postDesc: input['postDesc'],
                        postid: input['postid'],
                    }
                    details[i] = detail; 
                    i++;
                }

                details = details.reverse();
                res.render('home', {
                    title: "Homepage",
                    posts: details.slice(0,5),
                    username: req.session.username,
                    guest: isGuest
                })

            }
            else{
                res.render('home',{
                    title:"Homepage",
                    username: req.session.username,
                    guest: isGuest
                });
            }
            
        })
        
    },

    getSignup: function(req, res) { 
        res.render('signup',{
            title: "Signup"
        });
    },

    getLogin: function(req, res) {

        if(req.session.username){
            res.redirect("/home")
        }

        else{
            res.render('login', {
                title: "Login"
            });
        }
        
    },

    getLogout: function(req, res){
        req.session.destroy(function(error){
            if (error) throw error

            res.redirect("/login")
        })
    },

    getMyProfile: function(req, res) {
        var username = req.session.username
        console.log("@/profile");
        var ArrComments = [], ArrPosts = [], ArrUsers = [], ArrGames = [];
        var i, x;

        if (username == null){
            res.redirect("login")
        }
        else {
            //Get comments of user
            db.findMany (Comment, {author: username}, {}, function (usercomments) {
                if (usercomments) {
                
                    for(i = 0; i < usercomments.length; i++) {
                        var obj = {
                            posttitle : usercomments[i]['postTitle'],
                            comment : usercomments[i]['text'],
                            commentdate : usercomments[i]['date'],
                            postid: usercomments[i]['postid']
                        }
                        ArrComments[i] =  obj;
                    }
                }
            });

            //Get Posts
            db.findMany(Post, {username: username}, {}, function (userposts) {
                if (userposts) {

                    for(i = 0; i < userposts.length; i++) {
                        var obj = {
                            postTitle : userposts[i]['postTitle'],
                            postDesc : userposts[i]['postDesc'],
                            postDate : userposts[i]['postDate'],
                            postid: userposts[i]['postid']
                        }

                        ArrPosts[i] = obj;
                        console.log(ArrPosts[i]);
                    }
                }
            })

            ArrPosts.reverse();

            //Get user page
            db.findOne(User, {username: username}, {}, function(data){
                  if (data != null) {
                            res.render('profile', 
                            {
                                title:"Profile",
                                username: data['username'],
                                picture: data['picture'],
                                profileDesc: data['profileDesc'],
                                recentpost : ArrPosts.reverse().slice(0,5),
                                recentcomment: ArrComments.reverse().slice(0,5),
                            });
                  }
                  else {
                    res.redirect("../404");
                  }
            })
        }
    },

    //Temporary Profile page
    getProfile: function(req, res) {
        var username = req.params.username
        console.log("@/profile/" + username);
        var ArrComments = [], ArrPosts = [], ArrUsers = [], ArrGames = [];
        var i, x;

        if (username == null){
            //res.redirect('/profile/BigChungus') //default profile
            res.redirect("login") // defaults to login page
        }
        else {
            //Get comments of user
            db.findMany (Comment, {author: username}, {}, function (usercomments) {
                if (usercomments) {
                
                    for(i = 0; i < usercomments.length; i++) {
                        var obj = {
                            posttitle : usercomments[i]['postTitle'],
                            comment : usercomments[i]['text'],
                            commentdate : usercomments[i]['date'],
                            postid: usercomments[i]['postid']
                        }
                        ArrComments[i] =  obj;
                    }
                }
            });

            //Get Posts
            db.findMany(Post, {username: username}, {}, function (userposts) {
                if (userposts) {

                    for(i = 0; i < userposts.length; i++) {
                        var obj = {
                            postTitle : userposts[i]['postTitle'],
                            postDesc : userposts[i]['postDesc'],
                            postDate : userposts[i]['postDate'],
                            postid: userposts[i]['postid']
                        }

                        ArrPosts[i] = obj;
                        console.log(ArrPosts[i]);
                    }
                }
            })

            ArrPosts.reverse();

            //Get user page
            db.findOne(User, {username: username}, {}, function(data){
                  if (data != null) {
                            res.render('profile', 
                            {
                                title:"Profile",
                                username: data['username'],
                                picture: data['picture'],
                                profileDesc: data['profileDesc'],
                                recentpost : ArrPosts.reverse().slice(0,5),
                                recentcomment: ArrComments.reverse().slice(0,5),
                            });
                  }
                  else {
                    res.redirect("../404");
                  }
            })
        }
    },


    //Genre page
    getGenre: function(req, res) {

        let isGuest = true
        if(req.session.username) isGuest = false

        console.log("@/genre");
        
        res.render('genre',{
            title:"Genre",
            guest: isGuest
        });
        
        
    },
    //Temporary Forum page (Need to fix uploading images)
    getForum: function(req, res) {
        let isGuest = true
        if(req.session.username) isGuest = false

        console.log("@/forum");
        db.findMany(Post, {}, {}, function(result){
            if(result.length >= 1){
                var details = [];
                var i = 0;
                for(var input of result){
                    var detail = {
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
                details = details.reverse();
                res.render('forum', {
                    title: "Forum",
                    items: details,
                    guest: isGuest
                })
            }
            else{
                res.render('forum', {
                    title: "Forum",
                    guest: isGuest
                })
            }
        })
        
    },


    //Create page
    getCreate: function(req, res) {
        console.log("@/create");
        
        if(req.session.username){
            res.render('create',{
                title:"Create"
            });
        }
        
        else{
            res.redirect("login")
        }
    },

    //Temporary adding post function (need to fix saving images)
    postAddPost: function(req, res) {
        console.log("@/postAddPost");
        
        upload(req, res, function(err) {
            if(err){
                console.log(err);
                return res.end("Something went wrong");
            }

                var username = req.session.username;
                var game = req.body.game;
                var content = req.body.postDesc;
                var postTitle = req.body.postTitle;
                var postDate = dateFormat();
                var postid = Math.random().toString(36).slice(2);
                var image;
                
            if(!req.file){
                image = "";
            }
            else{
                image = req.file.filename;
            }

            while(db.findOne(Post, {postid:postid}, {}, function(flag){})){
                postid = Math.random().toString(36).slice(2);
            }

            var post = {
                postid: postid,
                game:game,
                username:username,
                postDate:postDate,
                postTitle:postTitle,
                image:image,
                postDesc:content,
                vote:0,
                commentNo:0
            }

            db.insertOne(Post, post, function(flag){
                if(flag){
                    res.redirect('/forum');
                }
            })

        });
    },

    //Maybe temporary Game page
    getPage: function(req, res) {

        let isGuest = true
        if(req.session.username) isGuest = false

        var game = req.params.game;
        console.log("@/page/"+ game);

        if(game == "apexlegends"){
            db.findMany(Post, {game: "Apex Legends"}, {}, function(data){
                if(data.length >= 1){
                    var details = [];
                    var i = 0;
                    for(var input of data){
                        var detail = {
                            game: input['game'],
                            postDate: input['postDate'],
                            postTitle: input['postTitle'],
                            postDesc: input['postDesc'],
                            postid: input['postid'],
                        }
                        details[i] = detail; 
                        i++;
                    }
                    details = details.reverse();
                    res.render('page', {
                        title: "Apex Legends",
                        background: "apex-wallpaper",
                        gamepost:"APEX LEGENDS",
                        posts: details.slice(0,5),
                        guest: isGuest
                    })
                }
                else{
                    res.render('page',{
                        title:"Apex Legends",
                        background:"apex-wallpaper",
                        gamepost:"APEX LEGENDS",
                        guest: isGuest
                    });
                }
            })
            
        }
        else if(game == "valorant"){
            db.findMany(Post, {game: "Valorant"}, {}, function(data){
                if(data.length >= 1){
                    var details = [];
                    var i = 0;
                    for(var input of data){
                        var detail = {
                            game: input['game'],
                            postDate: input['postDate'],
                            postTitle: input['postTitle'],
                            postDesc: input['postDesc'],
                            postid: input['postid'],
                        }
                        details[i] = detail; 
                        i++;
                    }
                    details = details.reverse();
                    res.render('page', {
                        title: "Valorant",
                        background: "valorant-wallpaper",
                        gamepost:"VALORANT",
                        posts: details.slice(0,5),
                        guest: isGuest
                    })
                }
                else{
                    res.render('page',{
                        title:"Valorant",
                        background:"valorant-wallpaper",
                        gamepost:"VALORANT",
                        guest: isGuest
                    });
                }
            })
            
        }
        else if(game == "fortnite"){
            db.findMany(Post, {game: "Fortnite"}, {}, function(data){
                if(data.length >= 1){
                    var details = [];
                    var i = 0;
                    for(var input of data){
                        var detail = {
                            game: input['game'],
                            postDate: input['postDate'],
                            postTitle: input['postTitle'],
                            postDesc: input['postDesc'],
                            postid: input['postid'],
                        }
                        details[i] = detail; 
                        i++;
                    }
                    details = details.reverse();
                    res.render('page', {
                        title: "Fortnite",
                        background: "fortnite-wallpaper",
                        gamepost:"FORTNITE",
                        posts: details.slice(0,5),
                        guest: isGuest
                    })
                }
                else{
                    res.render('page',{
                        title:"Fortnite",
                        background:"fortnite-wallpaper",
                        gamepost:"FORTNITE",
                        guest: isGuest
                    });
                }
            })
            
        }
        else if(game == "eldenring"){
            db.findMany(Post, {game: "Elden Ring"}, {}, function(data){
                if(data.length >= 1){
                    var details = [];
                    var i = 0;
                    for(var input of data){
                        var detail = {
                            game: input['game'],
                            postDate: input['postDate'],
                            postTitle: input['postTitle'],
                            postDesc: input['postDesc'],
                            postid: input['postid'],
                        }
                        details[i] = detail; 
                        i++;
                    }
                    details = details.reverse();
                    res.render('page', {
                        title: "Elden Ring",
                        background: "eldenring-wallpaper",
                        gamepost:"ELDEN RING",
                        posts: details.slice(0,5),
                        guest: isGuest
                    })
                }
                else{
                    res.render('page',{
                        title:"Elden Ring",
                        background:"eldenring-wallpaper",
                        gamepost:"ELDEN RING",
                        guest: isGuest
                    });
                }
            })
            
        }
        else if(game == "odyssey"){
            db.findMany(Post, {game: "Mario Odyssey"}, {}, function(data){
                if(data.length >= 1){
                    var details = [];
                    var i = 0;
                    for(var input of data){
                        var detail = {
                            game: input['game'],
                            postDate: input['postDate'],
                            postTitle: input['postTitle'],
                            postDesc: input['postDesc'],
                            postid: input['postid'],
                        }
                        details[i] = detail; 
                        i++;
                    }
                    details = details.reverse();
                    res.render('page', {
                        title: "Mario Odyssey",
                        background: "odyssey-wallpaper",
                        gamepost:"MARIO ODYSSEY",
                        posts: details.slice(0,5),
                        guest: isGuest
                    })
                }
                else{
                    res.render('page',{
                        title:"Mario Odyssey",
                        background:"odyssey-wallpaper",
                        gamepost:"MARIO ODYSSEY",
                        guest: isGuest
                    });
                }
            })
            
        }
        else{
            res.redirect("../404");
        }
        
    },

    //Maybe temporary Post page
    getPost: function(req, res) {

        let isGuest = true
        if(req.session.username) isGuest = false

        console.log("@/post/"+ req.params.id);
        var query = {postid: req.params.id};

        db.findOne(Post, query, {}, function(data){
            if(data != null){
                var background;
                console.log(data);
                if(data['game'] == "Apex Legends"){
                    background = "apex-wallpaper";
                }
                else if(data['game'] == "Elden Ring"){
                    background = "eldenring-wallpaper";
                }
                else if(data['game'] == "Fortnite"){
                    background = "fortnite-wallpaper";
                }
                else if(data['game'] == "Mario Odyssey"){
                    background = "odyssey-wallpaper";
                }
                else if(data['game'] == "Valorant"){
                    background = "valorant-wallpaper";
                }
            
                db.findMany(Comment, {postid: data['postid']}, {}, function(comments){
                  if (comments != null) {
                        var commentArr = [];
                        for (let i = 0; i < comments.length; i++) {
                              var comment = {
                                    author: comments[i].author,
                                    text: comments[i].text,
                                    date: comments[i].date
                              }

                              commentArr[i] = comment;
                        }

                        commentArr.reverse();

                        res.render('post', {
                        title: data['game'],
                        background: background,
                        game: data['game'],
                        username: data['username'],
                        postDate: data['postDate'],
                        postTitle: data['postTitle'],
                        image: data['image'],
                        postDesc: data['postDesc'],
                        vote: data['vote'],
                        commentbox: commentArr,
                        postid: data['postid'],
                        guest: isGuest
                        })

                  }
                  else {
                        res.render('post', {
                        title: data['game'],
                        background: background,
                        game: data['game'],
                        username: data['username'],
                        postDate: data['postDate'],
                        postTitle: data['postTitle'],
                        image: data['image'],
                        postDesc: data['postDesc'],
                        vote: data['vote'],
                        postid: data['postid'],
                        guest: isGuest
                        })
                  }
                })
            }
            else{
                res.redirect("../404");
            }
        })
    },

}

module.exports = controller
//export default controller;