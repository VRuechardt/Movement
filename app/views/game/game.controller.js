/**
 * Created by Valentin on 03/06/2016.
 */

'use strict';

module.exports = ['$scope', '$timeout', '$location', 'facebookLogin', function($scope, $timeout, $location, facebookLogin) {

    $scope.ready = false;

    facebookLogin.ready(function() {
        $timeout(function() {
            $scope.ready = true;
        }, 10);

    });

}];