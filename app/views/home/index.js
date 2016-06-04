/**
 * Created by Valentin on 03/06/2016.
 */

'use strict';

angular.module('movement.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', require('./home.controller'));