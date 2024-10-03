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
// ---------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));

// Setting default view engine
app.set("view engine", "ejs");

// Allows express to parse JSON objects.
app.use(bodyParser.json());

// Allows session support for passport
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session());

// ------------------------------ MONGO STUFF -------------------------------------

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
const title = "Postboard v7"

function isLoggedIn(req, res, next) {
  req.user ? next() : res.redirect('/login');
}

// Endpoint for database retrieval

app.use(express.static("public"));

app.get("/login", (req, res) => {
    res.render("login", { postBoardTitle: title });
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
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
  res.render("index", { mongoResults: results.reverse(), postBoardTitle: title, fullname: name });
});

app.get("/delete/:postID", isLoggedIn, async (req, res) => {
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
  const postObj = { username: name, post: post };
  await postboard.insertOne(postObj);
  res.redirect('/')
})

app.post("/update", isLoggedIn, async (req, res) => {
  await client.connect();
  const { id, username, post } = req.body;
  const updObj = {
    $set: {
      username: username,
      post: post
    }
  };
  const filter = { _id: ObjectId.createFromHexString(id) };
  await postboard.updateOne(filter, updObj);
  res.redirect('/')
});

app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.listen(PORT,
  () => {
    console.log("App started listening port %d", PORT);
});
