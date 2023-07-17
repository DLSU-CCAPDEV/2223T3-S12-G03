import db from '../models/db.js';
import Post from '../models/PostModel.js';
import Comment from '../models/CommentModel.js';

const post_controller = {
    editPost: function (req, res) {
        db.updateOne(Post, {postid: req.query.postid}, {postDesc: req.query.postDesc}, (data) => {
            res.render('post', {
                postDesc: req.query.postDesc
            })
        })
    },

    deletePost: function (req, res) {
        db.deleteOne(Post, {postid: req.query.postid}, (data) => {
            res.render('forum');
        })
    },

    addComment: function (req, res) {
        var author = "BigChungus"; //change when session is added
        var text = req.query.text;
        var date = req.query.date;
        var postid = req.query.postid;
        var postTitle = req.query.postTitle;

        const comment = {
            author: author,
            text: text,
            date: date,
            postid: postid,
            postTitle: postTitle
        }

        db.insertOne(Comment, comment, (flag) => {
            if (flag) {
                res.render('post', {
                    commentbox : {
                        author : author,
                        text : text,
                        date : date,
                    }
                })
            }
        })
    },

    editVotes: function (req, res) {
        db.updateOne(Post, {postid: req.query.postid}, {vote: req.query.vote}, (data) => {
            res.render('post', {
                vote: req.query.vote
            })
        })
    }
}

export default post_controller;