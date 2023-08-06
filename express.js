/*
Use in the terminal when there is no node_modules folder:
    npm install
*/

const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT
const hostname = process.env.HOSTNAME
const local_db_url = process.env.LOCAL_DB_URL
const online_db_url = process.env.ONLINE_DB_URL

const express = require("express")

const exphbs = require("express-handlebars")

const bodyParser = require("body-parser")

const session = require("express-session")

const MongoStore = require("connect-mongo")

const bcrypt = require("bcrypt")

const routes = require("./routes/routes.js")

const db = require("./models/db.js")

const app = express()

//
app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"
}))

// view engine as hbs
app.set("view engine", "hbs")

//body parser
app.use(express.urlencoded({extended: true}))

// static files
app.use(express.static("public"))


// connects to the database
db.connect(online_db_url)

// session
app.use(session({
    "secret": "forum-session",
    "resave": false,
    "saveUninitialized": false,
    store: MongoStore.create({mongoUrl: online_db_url})
}))


// VERY IMPORTANT: this needs to be below the code for session
// routes for the webpages
app.use("/", routes)

// if route not found, load default error webpage in ../views/404.hbs
app.use(function (req, res) {
    res.render('404.hbs');
});


app.listen(port, hostname, function(){
    console.log("Server running at: ")
    console.log("http://" + hostname + ":" + port)
})

