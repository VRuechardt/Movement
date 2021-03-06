/**
 * Created by Valentin on 03/06/2016.
 */

'use strict';

var $ = require('jquery');
var Materialize = require('materialize');

var angular = require('angular');
require('angular-route');
require('angular-scroll-glue');

// views
require('./views/home');
require('./views/game');

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();

var angularApp = angular.module('movement', [

        'ngRoute',
        'luegg.directives',

        // views
        'movement.home',
        'movement.game'

    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode({
            enabled: false
        });

    }])
    .factory('facebookLogin', require('./services/facebook-login'))
    .factory('socket', require('./services/socket'))


    .run(['$route', '$rootScope', '$location', function($route, $rootScope, $location) {

        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };

    }]);
