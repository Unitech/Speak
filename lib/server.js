//
//    _____                  __       _     
//   / ___/____  ___  ____ _/ /__    (_)____
//   \__ \/ __ \/ _ \/ __ `/ //_/   / / ___/
//  ___/ / /_/ /  __/ /_/ / ,< _   / (__  ) 
// /____/ .___/\___/\__,_/_/|_(_)_/ /____/  
//     /_/                     /___/        
//
// by Strzelewicz Alexandre
// Tue 14 Aug 2012 05:16:49 PM CEST
//
// Server (to put on the remote server)
//

console.log('Launching speak ' + '[server]'.blue);

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 30000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var io = require('socket.io').listen(30001);

var client = null;

io.sockets.on('connection', function (socket) {
    console.log('[Connect]'.blue + ' Speak client');
    client = socket;
    
    socket.on('disconnect', function () {
	console.log('[Disconnected]'.red + ' Speak client');
	client = null;
    });
});

app.get('/', function(req, res) {
    var message = req.param('message', null);
    var code = req.param('code', null)
    if (message == "" || code == "") {
	return res.send({success : false,
			 error : 'param not present'});
    }
    if (code != '9846')
	return res.send({success : false,
			 error : 'Auth failure'});
    if (client == null) {
	return res.send({success : false,
			 error : 'Client not connected'});
    }
    
    console.log('[Message]'.orange + ' received');
    client.emit('msg', message);    
    res.send({
	'success' : true,
	msg : message
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
