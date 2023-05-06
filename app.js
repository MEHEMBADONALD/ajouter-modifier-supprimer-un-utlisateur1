const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const connexion=require('./outil/DB')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


if (app.get('env') === 'production') {
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
}


const routeUser=require('./routes/users')
app.use('',routeUser)

app.get('/create', (req, res) => {
  if (req.session.error) {
    res.locals.error=req.session.error
    req.session.error=undefined
  }
  res.render('pages/create')
})

app.get('*', (req, res) => {
  res.render('pages/error')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})