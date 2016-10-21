var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); //tells node to start new server. Use express app as boilerplate

//expose a folder
app.use(express.static(__dirname + '/public'));

http.listen(PORT, () => {
  console.log('Server listening on Port: ' + PORT);
});
