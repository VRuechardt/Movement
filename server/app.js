/**
 * Created by Valentin on 04/06/2016.
 */

'use strict';

var express = require('express');
var logger = require('winston');
var config = require('./config/environment');

// Setup server
var app = express();

var socketIOServer = new require('socket.io')();
app.set('socketIOServer', socketIOServer);

socketIOServer.on('connection', function(socket){
    socket.on('room', function(room) {
        socket.join(room);
    });
});

require('./config/express')(app);
require('./routes')(app);

var server;
server = require('http').createServer(app);

// Start server
server.listen(config.port, config.ip, function(){
    logger.log('info', 'Server listing on %d, in %s mode', config.port, app.get('env'));
    socketIOServer.attach(server);
});
server.on('error', onError);

function onError(error) {
    logger.log('info','Server Error', error);
}

// Expose app
module.exports = app;
