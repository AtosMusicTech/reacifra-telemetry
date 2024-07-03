const StreamNote = require('./streamnote.js');
const MidiServer = require('./midiserver.js');
const WebSocketServer = require('./websocketserver.js');
const CifraApiClient = require('./cifraapiclient.js');
const ClientCollection = require('./clientcollection.js');

const clientes = new ClientCollection();
const cifraApiClient = new CifraApiClient('http://localhost:8082');

const socketServer = new WebSocketServer(8081);
const midiServer = new MidiServer();
const stream = new StreamNote(midiServer);

socketServer.onNewClient(client => {
    clientes.add(client);
})

socketServer.onRemoveClient(client => {
    clientes.remove(client);
})

stream.onNewNote(note => {
    clientes.sendAll({
        type: 'note',
        note
    });

    cifraApiClient.setTransporte({
        posicao: note.position
    });
});

stream.onNewMusica(id => {
    clientes.sendAll({
        type: 'new:musica',
        id
    });

    cifraApiClient.setTransporte({
        musicaId: id,
        posicao: 1
    });
});

socketServer.listen();
stream.listen();