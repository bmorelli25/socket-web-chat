var PORT = process.env.PORT || 3000;
var express = require('express'); //makes http request easier to use
var app = express();
var http = require('http').Server(app); //tells node to start new server. Use express app as boilerplate
var io = require('socket.io')(http); //call socket.io with http server

var moment = require('moment');

//expose a folder
app.use(express.static(__dirname + '/public'));

// on lets us listen for events ('name of event', when the event happens, run callback)
io.on('connection', (socket) => {
  console.log('User connected via socket.io');

  socket.on('message', (message) => {
    console.log('Message received: ' + message.text);

    message.timestamp = moment().valueOf();
    io.emit('message', message); // To send to everyone except the person who sent it use socket.broadcast.emit :: To send to everyone use io.emit
  });

  socket.emit('message', {
    name: 'System',
    text: 'Welcome to the chat application',
    timestamp: moment().valueOf()
  });
});

http.listen(PORT, () => {
  console.log('Server listening on Port: ' + PORT);
});
