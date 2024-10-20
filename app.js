// Constants and Requirements
require("dotenv").config();

// Express, bodyParser
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// Personal
require('./auth');
const passport = require('passport');
const session = require('express-session');
const createDOMPurify = require('dompurify');
const {JSDOM} = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function sanitizeData(data) {
    data = data.replace(/&nbsp;/g, ' ');
    data = data.replace(/\s+/g, ' ');
    data = data.trim();
    data = DOMPurify.sanitize(data);
    return data
}

// ---------------------------------------------------
app.use(bodyParser.urlencoded({extended: true}));

// Setting default view engine
app.set("view engine", "ejs");

// Allows express to parse JSON objects.
app.use(bodyParser.json());

// Allows session support for passport
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cooke: {
        maxAge: 6000
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// ------------------------------ MONGO STUFF -------------------------------------

const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// ----------------------------------------------------------------------------------

const postboard = client.db("postboard").collection("posts");
const title = "Postboard v10"

function isLoggedIn(req, res, next) {
    req.user ? next() : res.redirect('/login');
}

// Endpoint for database retrieval

app.use(express.static("public"));

app.get("/login", (req, res) => {
    res.render("login", {postBoardTitle: title});
})

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
);

app.get("/", isLoggedIn, async (req, res) => {
    await client.connect();
    const results = await postboard.find({}).toArray();
    const name = req.user.name.givenName
    res.render("index", {mongoResults: results.reverse(), postBoardTitle: title, fullname: name});
});

app.delete("/delete/:postID", isLoggedIn, async (req, res) => {
    console.log("Post ID " + req.params.postID + " flagged for deletion!")
    await client.connect();
    await postboard.deleteOne({
        _id: ObjectId.createFromHexString(req.params.postID)
    });
    res.redirect('/');
})

app.post("/insert", isLoggedIn, async (req, res) => {
    await client.connect();
    let post = req.body.post;
    let name = req.user.name.givenName
    const postObj = {username: sanitizeData(name), post: sanitizeData(post)};
    await postboard.insertOne(postObj);
    res.redirect('/')
})

app.put("/update", isLoggedIn, async (req, res) => {
    await client.connect();
    const {id, username, post} = req.body;
    const updObj = {
        $set: {
            username: sanitizeData(username),
            post: sanitizeData(post)
        }
    };
    const filter = {_id: ObjectId.createFromHexString(id)};
    await postboard.updateOne(filter, updObj);
    res.redirect('/')
});

app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

app.listen(PORT,
    () => {
        console.log("App started listening port %d", PORT);
    });
