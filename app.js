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

// SOCKET.IO

var users= []

io.on('connection', function(socket){
  console.log('A user connected')

// Validation
  socket.on('logged', function(userName, callback){
    var userNameToLow = userName.toLowerCase()
    if (users.indexOf(userNameToLow) === -1){
      callback(true)
      users.push(userNameToLow)
      socket.nickname = userName
      socket.broadcast.emit('chat message', {message: 'se ha conectado', username: socket.nickname})
    } else {
      callback(false)
    }
  })

  socket.on('chat message', function(msg){
   socket.broadcast.emit('chat message', {message: msg, username: socket.nickname})
    })

  socket.on('disconnect', function(){
    if (!socket.nickname){
      return
    } else {
      users.splice(users.indexOf(socket.nickname), 1)
    }
    console.log('A user DISconnected')
  })
})

// LISTEN TO
http.listen(5000, function(){
  console.log('App running on 5000 babe')
})
