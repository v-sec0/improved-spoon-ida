require('dotenv').config()
const express = require("express");
const app = express();

// Setting default view engine
app.set("view engine", "ejs");

// Allows express to parse JSON objects.
app.use(express.json());

// Serves a static site from the public directory
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.render("index", { username: "{empty username}", post: "{empty post}" });
  res.end();
});

// Taking request from client and echoing to console and sending it back to be displayed on website.
// app.post("/", function (req, res) {
//   const { username, post } = req.body;

//   // Get copy of entry onto server console
//   console.log("username = %s : post = %s", username, post);

//   res.send({ post: post, username: username });
//   res.end();
// });

// ------------------------------ MONGO STUFF -------------------------------------

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Endpoint for database retrieval
app.get("/mongo", async (req, res) => {
  await client.connect();
  const results = await client.db("postboard").collection("posts").find({}).toArray();
  res.render("index", {mongoResults: results})
});

app.listen(process.env.PORT, () => {
  console.log("App started listening port %d", process.env.PORT);
});
