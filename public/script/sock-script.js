$(function () {
  var user = {}
  $('#chat').hide()
  $('#footer').hide()
  var socket = io(),
      $nameForm = $('#name-form'),
      $nameInput = $('#name-input'),
      $name = $('#name'),
      $chat = $('#chat'),
      $warn = $('#warn'),
      $messages = $('#messages'),
      $chatForm = $('#chat-form'),
      $m = $('#m'),
      $laWarning = $('<label class="label label-warning">'),
      myName = ""

  $('#login-btn').click(function(){
    socket.emit('logged', $nameInput.val(), function(res){
      if (res){
        $name.hide()
        $chat.show()
        $('#footer').show()
        myName = $nameInput.val()
        $messages.append($('<div class="ui success message">').html('Te has conectado como: ' + $nameInput.val()))
      } else {
        $warn.html($laWarning.html('The username you entered is already being used by someone else. <br> Please try again with another.'))
      }
    })
  })

  $chatForm.submit(function(e){
    e.preventDefault();
    socket.emit('chat message', $m.val());
    $messages.append($('<div class="ui message">')
              .html('<div class="header"><strong>' + myName + ' </strong> says:</div><p>' + $m.val() + '</p>'))
    $m.val('');
    $('#chat').scrollTop($('#chat')[0].scrollHeight);
    console.log($('#chat')[0].scrollHeight)
  });


  socket.on('chat message', function(msg){
    $messages.append($('<div class="ui message">')
              .html('<div class="header"><strong>' + msg.username + ' </strong> says:</div><p>'+ msg.message + '</p>'));
              $('#chat').scrollTop($('#chat')[0].scrollHeight);
    console.log($('#chat')[0].scrollHeight)
  });

});
