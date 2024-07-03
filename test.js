/**
 * Created by jack-russel on 22.03.14.
 */

const converter = require('./notemidiconverter');

console.log(converter.midiToNote({cmd: 144, note: 69}));