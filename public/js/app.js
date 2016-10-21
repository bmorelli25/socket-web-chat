var socket = io();

socket.on('connect', () => {
  console.log('Connected to Socket.io Server');
});

socket.on('message', (message) => {
  console.log('New Message: ' + message.text);
});
