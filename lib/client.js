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
// Client (to activate on the computer who speak, who has HP)
//


var io = require('socket.io-client');
var ip = argv.ip;
var socket = io.connect(ip + ':30001');

var request = require('request');

console.log('Launching speak ' + '[client] '.blue + ' connecting to IP = ' + argv.ip);

function speak(message) {    
    var request = require('request');
    var fs = require('fs');
    var play = require('play');

    var data = {
	prot_vers: 2,
	jsoncallback : '',
	cl_login: "EXAMPLE_ID",
	cl_app: "EXAMPLE_APP",
	cl_pwd: "x0hzls5cqs",
	req_voice:"heather22k",
	req_text:message
    };

    request({
	method : 'GET',
	uri : "http://vaas.acapela-group.com/webservices/1-32-01-JSON/synthesizer.php",
	qs : data
    }, function(err, res, body) {
	var sound_url = JSON.parse(body.replace('(', '').replace(')', '')).snd_url;
	var output = fs.createWriteStream('./test.mp3');
	
	request(sound_url).pipe(output);

	output.addListener('close', function() {	
	    play.sound({
		file : './test.mp3'
	    }, function() {
		console.log('end');
	    });
	    
	});

    });
}


socket.on('connect', function (data) {
    console.log('[Connected]'.blue + ' client connected to ' + argv.ip);
});

socket.on('disconnect', function() {
    console.log('Server disconnected'.red);
});

socket.on('msg', function (data) {
    console.log(data);
    speak(data);
});


