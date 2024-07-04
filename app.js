const WebSocketServer = require('./websocketserver.js');
const ClientCollection = require('./clientcollection.js');

const clientes = new ClientCollection();

const socketServer = new WebSocketServer(8081);

socketServer.onNewClient(client => {
    clientes.add(client);
})

socketServer.onRemoveClient(client => {
    clientes.remove(client);
})

socketServer.onMessage((message, client) => {
    clientes.sendAll(message, client);
})

socketServer.listen();