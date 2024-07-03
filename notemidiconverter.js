class NoteMidiConverter {
    static midiToNote({ cmd, note }) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        if (cmd == 144) {
            return notes[(note - 36) % notes.length];
        }

        return null;
    }
};

module.exports = NoteMidiConverter;