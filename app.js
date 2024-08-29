const express = require('express')
const app = express()

console.log("App started.")
app.set('view engine', 'ejs')

app.use(express.static('./public/'))
app.get('/', function (req, res) {
  res.sendFile('./public/index.html')
})

app.get('/ejs', function (req, res) {
  res.render('index', {
    myServerVariable : "something"
  });

})

app.listen(3000)