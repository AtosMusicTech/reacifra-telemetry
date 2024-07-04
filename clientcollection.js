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

    sendAll(msg, except = null) {
        this.clients.forEach((client) => {
            if(client === except) {
                return;
            }
            client.send(msg);
        });
    }
};

module.exports = ClientCollection