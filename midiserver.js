const rtpmidi = require('./index');

class MidiServer {
    newData = null;

    constructor(name = 'Session 1', port = 5006) {
        this.port = port;
        this.session = rtpmidi.manager.createSession({
            localName: name,
            bonjourName: 'Cifra MidiServer',
            port: port
        });
    }

    onReceiveData(fn) {
        this.newData = fn;
    }

    listen() {
        this.session.on('ready', () => {

        });

        this.session.on('message', (deltaTime, message) => {
            if (this.newData) this.newData(message);
        });

        this.session.connect({ address: '127.0.0.1', port: 5004 });
    }
};

module.exports = MidiServer;