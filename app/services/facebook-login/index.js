/**
 * Created by Valentin on 04/06/2016.
 */

'use strict';

module.exports = [function() {

    var statusChange = function(response) {

        callbacks.forEach(function(o) {
            o(response.status);
        });

    };

    var callbacks = [];

    return {

        login: function() {

            FB.login(statusChange, {
                scope: 'public_profile,email',
                display: 'popup'
            });

        },

        check: function() {

            FB.getLoginStatus(function(response) {
                statusChange(response);
            });

        },

        listen: function(callback) {
            callbacks.push(callback);
        }

    };
}];