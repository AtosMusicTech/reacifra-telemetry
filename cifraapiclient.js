const axios = require('axios');

class CifraApiClient {
    constructor(host) {
        this.host = host;
    }

    setTransporte(transporte) {
        try {
            axios.post(this._resolve('/transportes'), transporte, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    }

    _resolve(path) {
        return this.host + path;
    }
};

module.exports = CifraApiClient