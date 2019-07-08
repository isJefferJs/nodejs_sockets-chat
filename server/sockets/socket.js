const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {
    client.on('enterChat', (user, callback) => {
        if (!user.name || !user.room) {
            return callback({
                error: true,
                message: 'el nombre o sala es necesario'
            });
        }

        client.join(user.room);

        users.addPerson( client.id, user.name, user.room );

        client.broadcast.to(user.room)
            .emit('somebodyJoinedChat', createMessage('', `${user.name} has joined`, 'Admin'));

        client.broadcast.to(user.room)
            .emit('listPeople', users.getPeopleByRoom(user.room));

        callback(users.getPeopleByRoom(user.room));
    });

    client.on('disconnect', () => {
        let removedPerson = users.removePerson(client.id);
        
        client.broadcast.to(removedPerson.room).emit('somebodyLeftChat', createMessage('', `${removedPerson.name} left the chat`, 'Admin'));

        client.broadcast.to(removedPerson.room).emit('listPeople', users.getPeopleByRoom(removedPerson.room));
    });

    client.on('createMessage', (data, callback) => {
        let person = users.getPerson(client.id);
        let message = createMessage( person.name, data.message );
        client.broadcast.to(person.room).emit('createMessage', message);

        callback(message);
    });

    //mensajes privados
    client.on('privateMessage', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage( person.name, data.message ));
    });

});