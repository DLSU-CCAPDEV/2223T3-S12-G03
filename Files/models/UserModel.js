/*
import mongoose from "mongoose";
*/

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: String,
    profileDesc: String,
    
});

const User = mongoose.model('User', UserSchema);

module.exports = User
//export default User;