/**
 * Created by Valentin on 04/06/2016.
 */

'use strict';

module.exports = ['$rootScope', '$location', '$timeout', function($rootScope, $location, $timeout) {

    var svc = {

        login: function() {

            loading++;
            loadingCallbacks.forEach(function(o) {
                o(loading);
            });
            FB.login(statusChange, {
                scope: 'public_profile,email',
                display: 'popup'
            });

        },

        check: function() {

            loading++;
            loadingCallbacks.forEach(function(o) {
                o(loading);
            });
            FB.getLoginStatus(function(response) {
                statusChange(response);
            });

        },

        ready: function(callback) {
            if(isLoggedIn) {
                callback();
            } else {
                loggedInCallback = callback;
            }
        },

        isLoggedIn: function() {
            return isLoggedIn;
        },

        listen: function(callback) {
            callbacks.push(callback);
        },
        listenLoading: function(callback) {
            loadingCallbacks.push(callback);
            callback(loading);
        },

        getUser: function(callback) {

            FB.api(
                "/" + authResponse.userID,
                function (response) {
                    if (response && !response.error) {
                        callback(response);
                    }
                }
            );

        }

    };

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1014621818614561',
            xfbml      : true,
            version    : 'v2.6',
            cookie     : true
        });
        svc.check();
    };

    var statusChange = function(response) {

        loading--;
        loadingCallbacks.forEach(function(o) {
            o(loading);
        });
        if(response.status === 'connected') {

            isLoggedIn = true;
            authResponse = response.authResponse;
            $timeout(function() {
                $location.path('game');
            }, 1700);
            loggedInCallback();

        } else {

            isLoggedIn = false;
            $location.path('/test');
            $rootScope.$apply();

        }

        callbacks.forEach(function(o) {
            o(response.status);
        });

    };

    var callbacks = [], loadingCallbacks = [];
    var loggedInCallback = function() {};
    var loading = 0;
    var isLoggedIn = false;
    var authResponse = {};

    return svc;
}];