require("dotenv").config();
const express = require("express");
const app = express();

// Setting default view engine
app.set("view engine", "ejs");

// Allows express to parse JSON objects.
app.use(express.json());

// ------------------------------ MONGO STUFF -------------------------------------

const { MongoClient, ServerApiVersion } = require("mongodb");
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

// Endpoint for database retrieval
app.use(express.static("public"));
app.get("/mongo", async (req, res) => {
  await client.connect();
  const results = await client
    .db("postboard")
    .collection("posts")
    .find({})
    .toArray();
  res.render("index", { mongoResults: results });
});

app.post("/mongo", async (req, res) => {
  await client.connect();
  const postboard = client.db("postboard").collection("posts");
  const { username, post } = req.body;
  const postObj = { username: username, post: post };
  postboard.insertOne(postObj);
});

app.delete("/mongo", async (req, res) => {
  await client.connect();
  const postboard = client.db("postboard").collection("posts");
  const { username, post } = req.body;
  const postObj = { username: username, post: post };
  postboard.deleteMany(postObj);
});

app.listen(process.env.PORT, () => {
  console.log("App started listening port %d", process.env.PORT);
});
