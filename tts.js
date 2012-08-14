

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
    req_text:"All companies have been scanned. Shutdown the system."
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
