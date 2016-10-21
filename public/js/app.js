var socket = io();

socket.on('connect', () => {
  console.log('Connected to Socket.io Server');
});
