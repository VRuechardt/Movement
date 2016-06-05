
'use strict';

module.exports = ['$rootScope', '$timeout', function($rootScope, $timeout) {

    var socket = require('socket.io-client')();


    return {

        on: function (eventName, callback) {

            console.log('socket event', eventName);

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