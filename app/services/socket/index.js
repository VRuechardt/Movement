
'use strict';

module.exports = ['$rootScope', '$timeout', function($rootScope, $timeout) {

    var socket = require('socket.io-client')();


    return {

        subscribe: function(channel) {
            socket.emit('room', channel);
        },
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }

    };

}];