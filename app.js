const express = require('express')
const app = express()

app.use(express.static('./public/'))
app.get('/', function (req, res) {
  res.sendFile('./public/index.html')
})

app.listen(3000)