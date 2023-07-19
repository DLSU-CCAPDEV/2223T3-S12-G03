/*
Use in the terminal when there is no node_modules folder:
    npm install
*/

const dotenv = require("dotenv")
dotenv.config()
port = process.env.PORT
hostname = process.env.HOSTNAME

const express = require("express")

const hbs = require("hbs")

const routes = require("./routes/routes.js")

const db = require("./models/db.js")
const commentModel_db = require("./models/CommentModel.js")
const postModel_db = require("./models/PostModel.js")
const uploadMiddleware_db = require("./models/uploadMiddleware.js")
const userModel_db = require("./models/UserModel.js")

const app = express()

// partials
hbs.registerPartials(__dirname, "/views/partials")

// view engine
app.set("view engine", "hbs")

//body parser
app.use(express.urlencoded({extended: true}))

// static files
app.use(express.static("public"))



// routes for the webpages
app.use("/", routes)

// if route not found, load default error webpage in ../views/404.hbs
app.use(function (req, res) {
    res.render('404.hbs');
});



// connects to the database
db.connect()


app.listen(port, hostname, function(){
    console.log("Server running at: ")
    console.log("http://" + hostname + ":" + port)
})
