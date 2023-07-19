const express = require("express")

const controller = require("../controllers/controller.js")

const post_controller = require("../controllers/post_controller.js")

const search_controller = require("../controllers/search_controller.js")

const signup_controller = require("../controllers/signup_controller.js")

// const validation = require("../helpers/validation.js")

const app = express()


app.get("/", function(req, res){
    res.sendFile("index.html")
})


module.exports = app