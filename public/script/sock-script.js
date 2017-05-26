$(function () {
  var user = {}
  $('#chat').hide()
  var socket = io(),
      $nameForm = $('#name-form'),
      $nameInput = $('#name-input'),
      $name = $('#name'),
      $chat = $('#chat'),
      $warn = $('#warn'),
      $messages = $('#messages'),
      $chatForm = $('#chat-form'),
      $m = $('#m'),
      $liInfo = $('<li class="list-group-item list-group-item-info">'),
      $laWarning = $('<label class="label label-warning">'),
      myName = ""

  $nameForm.submit(function(e){
    e.preventDefault()
    socket.emit('logged', $nameInput.val(), function(res){
      if (res){
        $name.hide()
        $chat.show()
        myName = $nameInput.val()
        $messages.append($('<li class="list-group-item list-group-item-success">').html('Te has conectado como: ' + $nameInput.val()))
      } else {
        $warn.html($laWarning.html('El nombre que intentas usar ya esta ocupado.<br> Prueba con otro por favor.'))
      }
    })
  })

  $chatForm.submit(function(e){
    e.preventDefault()
    socket.emit('chat message', $m.val());
    $messages.append($('<li class="list-group-item list-group-item-success">').html('<strong>' + myName + ': </strong>' + $m.val()))
    $m.val('');
    $chat.scrollTop($chat[0].scrollHeight)
  })

  socket.on('chat message', function(msg){
  $messages.append($('<li class="list-group-item">').html('<strong>' + msg.username + ': </strong>'+ msg.message));
  $chat.scrollTop($chat[0].scrollHeight)
});
});
