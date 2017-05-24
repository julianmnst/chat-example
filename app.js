const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')))

// SETTINGS
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

// SERVER
app.get('/', function(req, res){
  res.render('index', {title: 'Chat App'})
})

io.on('connection', function(socket){
  console.log('A user connected')

  socket.broadcast.emit('logeado', 'Un usuario se ha conectado!')

  socket.on('chat message', function(msg){
   socket.broadcast.emit('chat message', msg)
    })

  socket.on('disconnect', function(){
    io.emit('logeado', 'Un usuario se ha desconectado!')
    console.log('A user DISconnected')
  })
})

// LISTEN TO
http.listen(5000, function(){
  console.log('App running on 5000 babe')
})
