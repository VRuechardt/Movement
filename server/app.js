/**
 * Created by Valentin on 04/06/2016.
 */

'use strict';

var express = require('express');
var logger = require('winston');
var config = require('./config/environment');

// Setup server
var app = express();


require('./config/express')(app);
require('./routes')(app);

var server;
server = require('http').createServer(app);

// Start server
server.listen(config.port, config.ip, function(){
    logger.log('info', 'Server listing on %d, in %s mode', config.port, app.get('env'));
});
server.on('error', onError);

function onError(error) {
    logger.log('info','Server Error', error);
}

// Expose app
module.exports = app;
