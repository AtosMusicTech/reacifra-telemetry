// server.js
const WebSocket = require('ws');
const SocketClient = require('./socketclient.js');

class WebSocketServer {

    fnNewClient = null;
    fnRemoveClient = null;

    constructor(port) {
        this.port = port;
        this.server = new WebSocket.Server({ port: port });
    }

    onNewClient(fn) {
        this.fnNewClient = fn;
    }

    onRemoveClient(fn) {
        this.fnRemoveClient = fn;
    }

    onMessage(fn) {
        this.fnMessage = fn;
    }

    listen() {
        this.server.on('connection', socket => {
            const client = new SocketClient(socket);

            if (this.fnNewClient) {
                this.fnNewClient(client);
            }

            // Recebe mensagens do cliente
            socket.on('message', message => {
                if (this.fnMessage) {
                    this.fnMessage(message, client);
                }
            });

            // Lida com a desconexão do cliente
            socket.on('close', () => {
                if (this.fnRemoveClient) {
                    this.fnRemoveClient(client);
                }
            });
        });

        console.log('Servidor WebSocket rodando na porta ' + this.port);
    }
};

module.exports = WebSocketServer;
