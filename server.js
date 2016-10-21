var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); //tells node to start new server. Use express app as boilerplate
var io = require('socket.io')(http); //call socket.io with http server

//expose a folder
app.use(express.static(__dirname + '/public'));

// on lets us listen for events ('name of event', when the event happens, run callback)
io.on('connection', () => { 
  console.log('User connected via socket.io');
});

http.listen(PORT, () => {
  console.log('Server listening on Port: ' + PORT);
});
