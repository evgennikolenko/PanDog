const socketConfig = require('./socket-singletion');
const forumController = require('./../controllers/forum');

socketConfig.SocketSingleton.io.on('connection', (socket) => {

    socket.on('createSubject', (Subject) => forumController.createSubject(io, Subject));

    socket.on('disconnect', () => console.log('a user disconnected'));
});