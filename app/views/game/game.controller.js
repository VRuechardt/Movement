/**
 * Created by Valentin on 03/06/2016.
 */

'use strict';

module.exports = ['$scope', '$timeout', '$location', 'facebookLogin', function($scope, $timeout, $location, facebookLogin) {

    facebookLogin.init();

    $scope.ready = false;
    $scope.colorsLocked = false;
    $scope.user = {};
    $scope.colors = [];
    
    $scope.status = 'Bitte drücke auf sechs Farben. Du spielst mit den Menschen, die auf die gleichen Farben in der gleichen Reihenfolge drücken.';

    $scope.init = function() {

        $timeout(function() {
            $scope.ready = true;
        }, 10);

        facebookLogin.getUser(function(user) {
            $scope.user = user;
            $scope.user.firstname = $scope.user.name.split(' ')[0];
            $scope.$apply();
        });

    };

    facebookLogin.ready(function() {

        $scope.init();

    });

    $scope.addColor = function(color) {

        if($scope.colors.length < 6) {
            $scope.colors.push(color);
        }

        if($scope.colors.length === 6) {
            $scope.lockColors();
        }

    };

    $scope.removeColor = function(index) {

        if(!$scope.colorsLocked) {
            $scope.colors.splice(index, 1);
        }

    };

    $scope.lockColors = function() {

        $timeout(function() {
            $scope.colorsLocked = true;
            $scope.$apply();
        }, 10);

        $timeout(function() {
            $scope.status = 'Jetzt können weitere Spieler beitreten. Warte, bis alle da sind.';
            $scope.$apply();
        }, 500);

    };

}];