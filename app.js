const express = require("express");
const app = express();

// Allows express to parse JSON objects.
app.use(express.json());

// Confirmation that the app is working server-side.
console.log("App started.");

// Serves a static site from the public directory
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile("/public/index.html");
});

app.post("/", function (req, res) {
  const { message } = req.body;
  console.log(message);
  res.status(201).send({ messageRecieved: message });
  res.end();
});

app.listen(3000);

// Process for developing this functionality
// 1. Looked up "parsing JSON from response with express"
