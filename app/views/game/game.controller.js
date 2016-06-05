/**
 * Created by Valentin on 03/06/2016.
 */

'use strict';

module.exports = ['$scope', '$timeout', '$location', '$interval', 'facebookLogin', 'socket', function($scope, $timeout, $location, $interval, facebookLogin, socket) {

    console.log('$location', $location);

    $scope.ready = false;
    $scope.colorsLocked = false;
    $scope.user = {};
    $scope.colors = ['z-depth-1', 'z-depth-1', 'z-depth-1', 'z-depth-1', 'z-depth-1', 'z-depth-1'];
    
    $scope.status = 'Bitte drücke auf sechs Farben. Du spielst mit den Menschen, die auf die gleichen Farben in der gleichen Reihenfolge drücken.';

    $scope.init = function() {

        console.log('init');

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
            $scope.status = 'Jetzt können weitere Spieler beitreten indem sie den gleichen Farbcode eingeben. Warte, bis alle da sind.';
            $scope.$apply();
        }, 500);

        $scope.setupRoom();

    };

    $scope.users = [];
    $scope.inLobby = false;
    $scope.setupRoom = function() {

        var colors = ['red', 'white', 'blue', 'green', 'yellow', 'orange', 'brown', 'purple', 'black'];
        var code = '';
        $scope.colors.forEach(function(o) {
            code += colors.indexOf(o);
        });

        socket.on('room users', function(users) {
            console.log(users);
            $scope.users = users;
        });

        socket.emit('room', {
            room: code,
            user: $scope.user
        });

        $scope.inLobby = true;

        $scope.interval = $interval(function() {}, 1000, 0, true);

    };

    $scope.joinedString = function(t) {

        var delta = new Date().getTime() - t;

        var msg = '';

        if(delta < 1000 * 60) {
            msg = 'Seit ' + Math.ceil(delta / 1000) + (Math.ceil(delta / 1000) === 1 ? ' Sekunde' : ' Sekunden');
        } else if(delta < 1000 * 60 * 60) {
            msg = 'Seit ' + Math.floor(delta / (1000 * 60)) + (Math.floor(delta / (1000 * 60)) === 1 ? ' Minute' : ' Minuten');
        } else if(delta < 1000 * 60 * 60 * 24) {
            msg= 'Seit ' + Math.floor(delta / (1000 * 60 * 60)) + (Math.floor(delta / (1000 * 60 * 60)) === 1 ? ' Stunde' : ' Stunden');
        } else {
            var d = new Date();
            d.setTime(t);
            msg = 'Seit dem ' + d.getDay() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
        }

        return msg;

    };

    $scope.$on('$destroy', function() {
        $interval.cancel($scope.interval);
    });

}];