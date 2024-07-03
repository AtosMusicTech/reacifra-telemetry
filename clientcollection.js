class ClientCollection {
    constructor() {
        this.clients = [];
    }

    add(client) {
        this.clients.push(client);
    }

    remove(client) {
        this.clients.splice(this.clients.indexOf(client), 1);
    }

    sendAll(msg) {
        this.clients.forEach((client) => {
            client.send(msg);
        });
    }
};

module.exports = ClientCollection