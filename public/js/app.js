var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(`${name} wants to join ${room}`);
jQuery('.room-title').text(room);

socket.on('connect', () => {
  console.log('Connected to Socket.io Server');

  // right after the user connects, they emit a custom event to the server saying they want to join a room
  socket.emit('joinRoom', {
    name,
    room
  });
});

// Called everytime a message is received
socket.on('message', (message) => {
  var momentTimestamp = moment.utc(message.timestamp).local().format("h:mma");
  console.log('New Message: ' + message.text);

  // to target class you use a period
  //NEED TO FIX THIS. THERE IS A PERIOD SHOWING BETWEEN EACH. 
  jQuery('.messages')
    .append(`<li class="list-group-item"><strong>${message.name} </strong>${momentTimestamp}:<p>${message.text}</p><li>`);
});

// Handle submitting of new message
var $form = jQuery('#message-form'); // use # to select by id

$form.on('submit', (event) => { // built in browser event is called submit
  event.preventDefault(); // stops a refresh of the page

  var $message = $form.find('input[name=message]');

  socket.emit('message', {
    name,
    text: $message.val()
  });

  $message.val("");   // clear form field after submit
});
