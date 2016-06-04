/**
 * Created by Valentin on 03/06/2016.
 */

'use strict';

angular.module('movement.game', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'game/game.html',
            controller: 'GameController'
        });
    }])

    .controller('GameController', require('./game.controller'));