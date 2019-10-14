const express = require('express')
const db = require('./config/db')
const consign = require('consign')

const port = 3333

const app = express()
const server = app.listen(port, () => console.log(`Server running on port ${port}`))
const io = require('socket.io').listen(server)

consign()
  .include('./config/middlewares.js')
  .then('./controllers')
  .then('./config/routes.js')
  .into(app)

// declare variable driver into app
app.db = db

app.get('/', (req, res) => {
  res.status(404).send('Not found')
})

io.set('origins', '*:*')

io.on('connection', socket => {
  console.log('Nova conexão', socket.id)
})
