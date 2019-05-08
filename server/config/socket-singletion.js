const socket = require('socket.io');

module.exports.SocketSingleton = (function() {
    this.io = null;
    this.configure = function(server) {
        this.io = socket(server);
    };

    return this;
})();

