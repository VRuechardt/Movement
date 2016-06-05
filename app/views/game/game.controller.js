/**
 * Created by Valentin on 03/06/2016.
 */

'use strict';

module.exports = ['$scope', '$timeout', '$location', 'facebookLogin', function($scope, $timeout, $location, facebookLogin) {

    $scope.ready = false;
    $scope.colorsLocked = false;
    $scope.user = {};
    $scope.colors = ['z-depth-1', 'z-depth-1', 'z-depth-1', 'z-depth-1', 'z-depth-1', 'z-depth-1'];
    
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

        window.scrollTo(0,1);

    };

    if(!facebookLogin.isLoggedIn()) {
        $location.path('/');
    } else {
        $scope.init();
    }

    $scope.addColor = function(color) {

        var found = false;

        for(var i = 0; i < $scope.colors.length; i++) {
            if($scope.colors[i] === 'z-depth-1') {
                $scope.colors[i] = color;
                found = i;
                i = $scope.colors.length;
            }
        }

        if(found === $scope.colors.length - 1) {
            $scope.lockColors();
        }

    };

    $scope.removeColor = function(index) {

        if(!$scope.colorsLocked) {
            $scope.colors[index] = 'z-depth-1';
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