const express = require('express');
const mongoose = require('mongoose')

const app = express();

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

app.get('/', (req, res) => {
  res.send('Hi there!')
})

app.listen(3000, () =>{
  console.log('listening on port 3000')
})