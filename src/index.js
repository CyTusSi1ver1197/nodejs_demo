"use strict"

const express = require('express')
const app = express()
const handlebars  = require('express-handlebars');
const path = require('path')
const morgan = require('morgan')
const port = 5550
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 100 }
  
}))
app.engine('hbs', handlebars({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'))
console.log(path.join(__dirname,'resources/views'));
app.use(express.static(path.join(__dirname,'public')))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))
app.get('/', (req, res) => {
  res.render('home')
})
app.get('/tinh-toan', (req, res) => {
  res.send('Hello!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

