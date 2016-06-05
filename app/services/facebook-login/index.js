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
            facebookConnectPlugin.login(['public_profile','email'], function(response) {
                statusChange(response);
            });

        },

        check: function() {

            loading++;
            loadingCallbacks.forEach(function(o) {
                o(loading);
            });
            facebookConnectPlugin.getLoginStatus(function(response) {
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

            console.log('isLoggedIn', isLoggedIn);

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

            console.log('getting user');

            facebookConnectPlugin.api(
                "/" + authResponse.userID, [],
                function (response) {
                    console.log('getUser response', response);
                    if (response && !response.error) {
                        callback(response);
                    }
                }
            );

        }

    };

    var statusChange = function(response) {

        console.log('statusChange response', response);
        loading--;
        loadingCallbacks.forEach(function(o) {
            o(loading);
        });
        if(response.status === 'connected') {

            isLoggedIn = true;
            authResponse = response.authResponse;
            $timeout(function() {
                $location.path('game');
            }, 1200);
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