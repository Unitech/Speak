
/**
 * Module dependencies.
 */

require('colors');
argv = require('optimist')
    .argv;


(function() {
    if (argv.server) {
	require('./lib/server.js');
    }
    else if (argv.ip) {
	require('./lib/client.js');
    }
})();
