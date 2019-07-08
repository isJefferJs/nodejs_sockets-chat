var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('El name y room son necesarios');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('enterChat', user, function(resp) {
        console.log('Users conected', resp);
        renderUsers(resp);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


//  Enviar información
// socket.emit('createMessage', {
//     message: 'Hola mundo, me he conectado'
// });

socket.on('createMessage', function(message) {
    // console.log(message);
    renderMessage(message, false);
});

// Escuchar información
socket.on('sendMessage', function(message) {

    console.log('Servidor:', message);

});

socket.on('somebodyLeftChat', function(message) {
    console.log('message: ', message);
    renderMessage(message, false);
});

socket.on('somebodyJoinedChat', function(message) {
    console.log('message: ', message);
    renderMessage(message, false);
});

// when somebody enter or left the chat
socket.on('listPeople', function(people) {
    console.log(people);
    renderUsers(people);
})

// Mensajes privados
socket.on('privateMessage', function(message) {
    console.log('Mensaje privado:', message);
});
