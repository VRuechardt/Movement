/**
 * Created by Valentin on 03/06/2016.
 */

'use strict';

module.exports = ['$scope', '$timeout', '$location', 'facebookLogin', function($scope, $timeout, $location, facebookLogin) {

    $scope.loggedIn = false;
    $scope.loading = 0;

    facebookLogin.listen(function(status) {
        if(status === 'connected') {
            $scope.loggedIn = true;
        }
        $scope.loading--;
        $scope.$apply();
    });

    facebookLogin.listenLoading(function(loading) {
        $scope.loading = loading;
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    });



    $scope.login = function() {
        if($scope.loading === 0) {
            facebookLogin.login();
            $scope.loading++;
        }
    };

    $scope.offline = function() {

        $scope.openingOffline = true;

    };

    window.facebookCallback = function() {
        facebookLogin.check();
    };

}];