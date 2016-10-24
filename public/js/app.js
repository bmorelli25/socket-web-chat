var name = getQueryVariable('name');
var room = getQueryVariable('room');
var socket = io();

console.log(`${name} wants to join ${room}`);

socket.on('connect', () => {
  console.log('Connected to Socket.io Server');
});

// Called everytime a message is received
socket.on('message', (message) => {
  var momentTimestamp = moment.utc(message.timestamp).local().format("h:mma");
  console.log('New Message: ' + message.text);

  // to target class you use a period
  jQuery('.messages').append(`<p><strong>${momentTimestamp}:</strong> ${message.text}</p>`);
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
