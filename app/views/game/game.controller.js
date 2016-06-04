/**
 * Created by Valentin on 03/06/2016.
 */

'use strict';

module.exports = ['$scope', '$timeout', '$location', 'facebookLogin', function($scope, $timeout, $location, facebookLogin) {

    $scope.ready = false;
    $scope.user = {};
    $scope.colors = [];

    facebookLogin.ready(function() {

        $scope.init();

    });

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

    $scope.addColor = function(color) {

        if($scope.colors.length < 6) {
            $scope.colors.push(color);
        }

    };

    $scope.removeColor = function(index) {
        $scope.colors.splice(index, 1);
    };

}];