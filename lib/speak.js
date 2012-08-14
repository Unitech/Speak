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

var request = require('request');

var g_url = null;
var g_log = null;

var speak = {};
speak.speak = function(opt) {    
    var url = g_url || opt.url;
    var message = {message : opt.message, code : '9846'};
    var log = g_log || opt.log || false;

    if (log) {
	console.log('Data sent = ' + message);
	console.log('sending to url = ' + url);
    }
    request({uri : url,
	     qs : message,
	     timeout : 10000},
	    function(err, res, body) {
		if (err && log)
		    return console.log('[Server] not connected at ' + url);
		if (log )
		    return console.log('Body = ' + body);
	    });
}

speak.speak.defaults = function(def) {
    g_url = def.url || null;
    g_log = def.log || null;
}


module.exports = speak;
