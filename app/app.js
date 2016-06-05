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

var app = angular.module('movement', [

        'ngRoute',
        'luegg.directives',

        // views
        'movement.home',
        'movement.game'

    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode({
            enabled: true
        });

    }])
    .factory('facebookLogin', require('./services/facebook-login'))


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
