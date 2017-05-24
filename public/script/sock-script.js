var socket = io();
$(function () {
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#messages').append($('<li class="list-group-item list-group-item-success">').text($('#m').val()))
    $('#m').val('');
    $('#chat').scrollTop($('#chat')[0].scrollHeight)
    return false;
  });

  socket.on('logeado', function(log){
    $('#messages').append($('<li class="list-group-item list-group-item-info">').text(log))
    $('#chat').scrollTop($('#chat')[0].scrollHeight)
  })

  socket.on('chat message', function(msg){
  $('#messages').append($('<li class="list-group-item">').text(msg));
  $('#chat').scrollTop($('#chat')[0].scrollHeight)
});
});
