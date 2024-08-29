const express = require('express')
const app = express()

app.use(express.static('./'))
app.get('/', function (req, res) {
  res.sendFile('./index.html')
  res.sendFile('./scripts/')
  res.sendFile('./styles/')
})

app.listen(3000)