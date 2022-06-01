const axios = require('axios')

class APIHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'http://messageapp:3000'
        })
    }

    createMessage(messageData) {
        return this.axiosApp.post('/message', messageData)
    }

}

module.exports = APIHandler