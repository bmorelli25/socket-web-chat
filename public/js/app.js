var socket = io();

socket.on('connect', () => {
  console.log('Connected to Socket.io Server');
});

socket.on('message', (message) => {
  console.log('New Message: ' + message.text);
});

// Handle submitting of new message
var $form = jQuery('#message-form'); // use # to select by id

$form.on('submit', (event) => { // built in browser event is called submit
  event.preventDefault(); // stops a refresh of the page

  var $message = $form.find('input[name=message]');

  socket.emit('message', {
    text: $message.val()
  });

  $message.val("");   // clear form field after submit
});
