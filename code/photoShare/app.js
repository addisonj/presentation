
/**
 * Module dependencies.
 */

var express = require('express'),
io = require('socket.io');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.listen(3000);
var sio = io.listen(app);

sio.sockets.on('connection', function(socket) {
  console.log('someone connected');

  socket.on('new', function(data) {
    console.log('should be emitting something...');
    sio.sockets.emit('image', data);
  });
});
console.log("Express server listening on port %d", app.address().port);
