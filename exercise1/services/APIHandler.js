const axios = require('axios')

class APIHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'http://localhost:3000'
        })
    }

    createMessage(destination, body) {
        return this.axiosApp.post('/message', { destination, body })
    }

}

module.exports = APIHandler