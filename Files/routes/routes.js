const express = require("express")

const controller = require("../controllers/controller.js")

const post_controller = require("../controllers/post_controller.js")

const search_controller = require("../controllers/search_controller.js")

const signup_controller = require("../controllers/signup_controller.js")

// const validation = require("../helpers/validation.js")

const app = express()


app.get("/", controller.getHome)

app.get("/signup", controller.getSignup)

app.get("/login", controller.getLogin)

app.get("/profile", controller.getProfile)

app.get("/forum", controller.getForum)


module.exports = app