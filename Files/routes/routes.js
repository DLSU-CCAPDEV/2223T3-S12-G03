const express = require("express")

const controller = require("../controllers/controller.js")

const post_controller = require("../controllers/post_controller.js")

const search_controller = require("../controllers/search_controller.js")

const signup_controller = require("../controllers/signup_controller.js")

// const validation = require("../helpers/validation.js")

const app = express()

// general routes
app.get('/favicon.ico', controller.getFavicon)

app.get("/404", controller.get404)

app.get("/", controller.getHome)

app.get("/home", controller.getHome)

app.get("/signup", controller.getSignup)
app.post("/signup", signup_controller.postSignUp)

app.get("/login", controller.getLogin)

app.get("/profile", controller.getProfile)

app.get("/forum", controller.getForum)


// routes for specific games
app.get("/page/:valorant", controller.getPage)

app.get("/page/:apexlegends", controller.getPage)

app.get("/page/:fortnite", controller.getPage)

app.get("/page/:eldenring", controller.getPage)




module.exports = app