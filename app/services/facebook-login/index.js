/**
 * Created by Valentin on 04/06/2016.
 */

'use strict';

module.exports = [function() {

    var statusChange = function() {

        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            
        }

    };

    return {

        checkLoginState: function() {
            FB.getLoginStatus(function(response) {
                statusChange(response);
            });
        }

    };
}];