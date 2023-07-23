/*
import db from '../models/db.js';
import User from '../models/UserModel.js';
*/

const db = require("../models/db.js")
const User = require("../models/UserModel.js")

const signup_controller = {
    getCheckEmail: function (req, res) {
        db.findOne(User, {email: req.query.email}, null, (data) => {
            res.send(data);
        })
    },

    getCheckUsername: function (req, res) {
        db.findOne(User, {username: req.query.username}, null, (data) => {
            res.send(data);
        })
    },

    postLogin: function (req, res) {
        db.findOne(User, {username: req.body.username, password: req.body.password}, null, (data) => {
            res.send(data);
        })
    },

    postSignUp: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        var user = {
            username: username,
            password: password
        }
        console.log(user.username + ": username");
        
        //add to database
        db.insertOne (User, user, function (flag) {
            if (flag) {
                console.log("success")
                res.redirect('login');
            }
        }); 
    },

    updateUser: function (req, res) {
        db.updateOne(User, {username: req.query.currN}, {username: req.query.newN, profileDesc: req.query.profDesc}, (data) =>{
            res.send(data);
        })
    }
}

module.exports = signup_controller
//export default signup_controller;