/*
import db from '../models/db.js';
import User from '../models/UserModel.js';
*/

const { validationResult } = require("express-validator")

const db = require("../models/db.js")
const User = require("../models/UserModel.js")

const bcrypt = require("bcrypt")
const SALT_ROUNDS = 10

const signup_controller = {
    
    getCheckUsername: function (req, res) {
        db.findOne(User, {username: req.query.username}, null, (data) => {
            res.send(data);
        })
    },

    postLogin: function (req, res) {
        
        db.findOne(User, {username: req.body.username}, null, (data) => {
            
            // if user exists in database
            if(data){
                bcrypt.compare(req.body.password, data.password, function(err, equal){
                    
                    // handles both plaintext password and hashed password
                    if(equal || req.body.password == data.password){
                        res.redirect("/home?username=" + req.body.username)
                    }

                    // incorrect details
                    else{
                        res.render("login", {title: "Login", errorMessage: "Username/Password incorrect"})
                    }
                })

                
            }

            // no such user
            else{
                res.render("login", {title: "Login", errorMessage: "Username/Password incorrect"})
            }
        })
    },

    postSignUp: function (req, res) {

        let errors = validationResult(req)

        if(!errors.isEmpty()){

            errors = errors.errors

            let details = {}

            for(i=0; i < errors.length; i++){
                details["invalid_registration_" + errors[i].param] = errors[i].msg
            }

            res.render("signup", details)

        }

        else{

            let username = req.body.username;
            let password = req.body.password;

            bcrypt.hash(password, SALT_ROUNDS, function(err, hash){

                let user = {
                    username: username,
                    password: hash
                }
                console.log(user.username + ": username");
                

                //add to database
                db.insertOne (User, user, function (flag) {
                    if (flag) {
                        console.log("Signup success")
                        res.redirect('/login');
                    }

                    else{
                        console.log("Signup failed")
                        res.render("signup", {invalid_registration_username: "Username already exists!"})
                    }
                }); 

            })

        }
        
        
    },

    updateUser: function (req, res) {
        db.updateOne(User, {username: req.query.currN}, {username: req.query.newN, profileDesc: req.query.profDesc}, (data) =>{
            res.send(data);
        })
    }
}

module.exports = signup_controller
//export default signup_controller;