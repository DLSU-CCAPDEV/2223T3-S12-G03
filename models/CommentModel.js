/*
import mongoose from "mongoose";
*/

const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    postid: {
        type: String,
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment
//export default Comment;