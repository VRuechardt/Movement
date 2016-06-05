/**
 * Created by Valentin on 05/06/2016.
 */

module.exports = function(io) {

    var rooms = {};

    return {

        init: function(socket) {

            socket.on('room', function(data) {

                socket.join(data.room);

                data.user.joined = new Date().getTime();

                if(rooms[data.room]) {
                    rooms[data.room].users.push(data.user);
                } else {
                    rooms[data.room] = {
                        users: [data.user]
                    };
                }

                socket.lobby = data.room;
                socket.user = data.user;

                io.to(data.room).emit('room users', rooms[data.room].users);

            });

            socket.on('start game', function() {
                
            });

            socket.on('disconnect', function() {

                if(socket.lobby && rooms[socket.lobby]) {

                    rooms[socket.lobby].users.splice(rooms[socket.lobby].users.indexOf(socket.user), 1);

                    io.to(socket.lobby).emit('room users', rooms[socket.lobby].users);

                }

            });

        }

    };

};