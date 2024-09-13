require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Setting default view engine
app.set("view engine", "ejs");

// Allows express to parse JSON objects.
app.use(express.json());

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

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// ----------------------------------------------------------------------------------

const postboard = client.db("postboard").collection("posts");

// Endpoint for database retrieval

app.use(express.static("public"));

app.get("/", async (req, res) => {
  await client.connect();
  const results = await postboard.find({}).toArray();
  await res.render("index", { mongoResults: results});
});

app.get("/insert",async (req, res) => {
  await client.connect();
  const results = await postboard.find({}).toArray();
  await res.render("insert", { mongoResults: results});
});

app.get("/update/:postID", async (req, res) => {
  const postIdent = req.params.postID
  await client.connect()
  const results = await postboard.find({ _id: ObjectId.createFromHexString(postIdent) }).toArray()
  const usernameStr = results[0].username
  const postStr = results[0].post
  await res.render("update", {postID: postIdent, username: usernameStr, post: postStr})
})

app.get("/delete/:postID", async (req, res) => {
  console.log("Post ID " + req.params.postID + " flagged for deletion!")
  await client.connect();
  await postboard.deleteOne({
    _id: ObjectId.createFromHexString(req.params.postID)
  });
  res.redirect('/');
})

app.post("/insert", async (req, res) => {
  await client.connect();
  const { username, post } = req.body;
  const postObj = { username: username, post: post };
  await postboard.insertOne(postObj);
  res.redirect('/')
})

app.post("/update/:postID", async (req, res) => {
  const postID = ObjectId.createFromHexString(req.params.postID)
  await client.connect()
  const {username, post} = req.body
  const filter = {_id: postID}
  const update = {
    $set: {
      username: username,
      post: post
    }
  }
  await postboard.updateOne(filter,update)
  res.redirect("/")
})

app.listen(process.env.PORT, () => {
  console.log("App started listening port %d", process.env.PORT);
});
