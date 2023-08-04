const express = require("express")

const controller = require("../controllers/controller.js")

const post_controller = require("../controllers/post_controller.js")

const search_controller = require("../controllers/search_controller.js")

const signup_controller = require("../controllers/signup_controller.js")

const validation = require("../helpers/validation.js")

const app = express()


app.get('/favicon.ico', controller.getFavicon)

app.get("/404", controller.get404)

app.get("/", controller.getHome)

app.get("/home", controller.getHome)

app.get("/signup", controller.getSignup)
app.get("/signupCheckUsername", signup_controller.getCheckUsername)
app.post("/signup", validation.signupValidation(), signup_controller.postSignUp)

app.get("/search/:key", search_controller.searchPage)

app.get("/login", controller.getLogin)
app.post("/login", signup_controller.postLogin)

app.get("/profile", controller.getProfile)
app.get("/profile/:username", controller.getProfile)

app.get("/genre", controller.getGenre)

app.get("/forum", controller.getForum)

app.get("/create", controller.getCreate)
app.post("/create", controller.postAddPost)

// routes for specific games
app.get("/page/:game", controller.getPage)


app.get("/post/:id", controller.getPost, 
        post_controller.addComment, post_controller.deletePost, post_controller.editPost, post_controller.editVotes)




module.exports = app