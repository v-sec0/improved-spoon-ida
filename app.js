const express = require('express')
const app = express()

app.use(express.static('./public/'))
app.get('/', function (req, res) {
  res.sendFile('./public/index.html')
})

console.log("App started.")

app.listen(3000)