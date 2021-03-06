var PORT = process.env.PORT || 3000;
var express = require('express'); //makes http request easier to use
var app = express();
var http = require('http').Server(app); //tells node to start new server. Use express app as boilerplate
var io = require('socket.io')(http); //call socket.io with http server

var moment = require('moment');

//expose a folder
app.use(express.static(__dirname + '/public'));

//using to save client info so we can look up the data later
var clientInfo = {};

// Sends current users to provided Socket
function sendCurrentUsers(socket) {
  var info = clientInfo[socket.id];
  var users = [];

  if (typeof info === 'undefined') return;

  Object.keys(clientInfo).forEach((socketId) => {
    var userInfo = clientInfo[socketId];

    if (info.room === userInfo.room) {
      users.push(userInfo.name);
    };
  });

  socket.emit('message', {
    name: 'System',
    text: `Current users: ${users.join(', ')}`,
    timestamp: moment().valueOf()
  });

};

// on lets us listen for events ('name of event', when the event happens, run callback)
io.on('connection', (socket) => {
  console.log('User connected via socket.io');

  socket.on('disconnect', () => {
    var userData = clientInfo[socket.id];
    if (typeof userData !== 'undefined') {
      socket.leave(userData.room);
      io.to(userData.room).emit('message', {
        name: 'System',
        text: `${userData.name} has left the room`,
        timestamp: moment().valueOf()
      });
      delete clientInfo[socket.id];
    };
  });

  socket.on('joinRoom', (req) => {
    clientInfo[socket.id] = req; //when a user connects, their data is stored in clientInfo.theirUniqueID
    socket.join(req.room);

    //send a message to everyone exept the user, in the current room
    socket.broadcast.to(req.room).emit('message', {
      name: 'System',
      text: `${req.name} has joined the chat.`,
      timestamp: moment().valueOf()
    });
  });

  socket.on('message', (message) => {
    console.log('Message received: ' + message.text);

    if (message.text === '@currentUsers') {
      sendCurrentUsers(socket);
    } else {
      message.timestamp = moment().valueOf();
      //only emits message to people who are in the same room as the current user
      io.to(clientInfo[socket.id].room).emit('message', message);
    };
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
