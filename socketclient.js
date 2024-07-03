class SocketClient {

    constructor(socket) {
        this.socket = socket;
    }

    send(msg) {
        this.socket.send(JSON.stringify(msg));
    }
};

module.exports = SocketClient;