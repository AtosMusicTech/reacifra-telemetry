const NoteMidiConverter = require('./notemidiconverter.js');

class StreamNote {
    fnNewNote = null;
    fnNewMusica = null;
    note = [];
    lastCmd = null;
    positions = [];

    constructor(server) {
        this.server = server;
    }

    onNewNote(fn) {
        this.fnNewNote = fn;
    }

    onNewMusica(fn) {
        this.fnNewMusica = fn;
    }

    listen() {
        this.server.onReceiveData(msg => {
            const midi = { cmd: msg[0], note: msg[1], position: msg[2] };
            const note = NoteMidiConverter.midiToNote(midi);

            if (midi. cmd == 144 && midi.note == 0) {
                this.note = [];
                if (this.fnNewMusica) {
                    this.fnNewMusica(midi.position);
                    return;
                }
            }

            if (note != null) {
                if (this.note.length == 0) {
                    this.note.push(note);
                    this.positions.push(midi.position);
                } else if (this.note[this.note.length - 1] != note) {
                    this.note.push(note);
                    this.positions.push(midi.position);
                }
            }

            if (this.lastCmd != 128 && midi.cmd == 128) {
                if (this.note.length > 0 && this.fnNewNote) {
                    this.fnNewNote({
                        note: this.note.join('/'),
                        position: this._getPosition()
                    });
                }

                this.note = [];
                this.positions = [];
            }

            this.lastCmd = midi.cmd;
        });

        this.server.listen();
    }

    _getPosition() {
        for (let i = 0; i < this.positions.length; i++) {
            const position = this.positions[i];
            if (position > 0) {
                return position;
            }
        }

        return 0;
    }
};

module.exports = StreamNote;