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
            $timeout(function() {
                $location.path('game');
            }, 1700);
        }
        $scope.loading--;
        $scope.$apply();
    });

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1014621818614561',
            xfbml      : true,
            version    : 'v2.6',
            cookie     : true
        });
        facebookLogin.check();
        $scope.loading++;
        $scope.$apply();
    };


    $scope.login = function() {
        if($scope.loading === 0) {
            facebookLogin.login();
            $scope.loading++;
        }
    };

}];