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
app.post("/", function (req, res) {
  const { username, post } = req.body;

  // Get copy of entry onto server console
  console.log("username = %s : post = %s", username, post);

  res.send({ post: post, username: username });
  res.end();
});

app.listen(3000, () => {
  console.log("App started listening port 3000");
});
