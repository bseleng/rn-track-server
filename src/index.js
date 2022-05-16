require('./models/User')
const express = require('express');
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const bodyParser = require('body-parser')
const requireAuth = require('./middlewares/requireAuth')

const app = express();

app.use(bodyParser.json());
app.use(authRoutes)

const username = 'admin'
const password = encodeURIComponent("p@$$word1");
const mongoUri =
  `mongodb+srv://${username}:${password}@cluster0.mqcvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(mongoUri)

mongoose.connection.on('connected', () => {
  console.log('connected to DB ')
})

mongoose.connection.on('error', (err) => {
  console.error('connection error DB', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () =>{
  console.log('listening on port 3000')
})