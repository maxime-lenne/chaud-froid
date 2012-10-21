// including libraries
var http = require('http');
var static = require('node-static');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);
io.set("origins","*");
// define port
var port = 8080;
 
// make html, js & css files accessible
var files = new static.Server('./');
 
// serve files on request
function handler(request, response) {
    request.addListener('end', function() {
        files.serve(request, response);
    });
}

 
// listen for incoming connections from client
io.sockets.on('connection', function (socket) {
 
  //position par défault de la souris
  socket.emit('load:coordsMouse', { user: 'max', type: 'mouse', lat: "50.6331543", lng: "3.0433570000000145"});
  
  socket.on('send:coordsMouse', function(data) {
  	console.log(data);
  	socket.broadcast.emit('load:coordsMouse', data);
  });
  
  // start listening for coords
  socket.on('send:coords', function (data) {
 	console.log(data);
    // broadcast your coordinates to everyone except you
    socket.broadcast.emit('load:coords', data);
    socket.emit('load:coords', data);
  });
  
  
});
 
// starts app on specified port
app.listen(port);
console.log('Your server goes on localhost:' + port);


