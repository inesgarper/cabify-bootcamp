const { saveMessage, getMessages, deleteMessages } = require("../utils")

const APIHandler = require("../services/APIHandler");
const service = new APIHandler


// CONTROLLER'S METHODS

exports.send_and_save_messages = function (req, res) {

    const { destination, message } = req.body

    const messageData = {
        destination,
        body: message
    }

    if (destination == "" || message == "") {

        res.status(422).json({ message: "Fields must not be empty" })

    } else if (!destination || !message) {

        res.status(400).json({ message: "Both keys, destination and message required" })

    } else if (typeof destination != 'string' || typeof message != 'string') {

        res.status(400).json({ message: "Fields must be filled with text" })

    } else {

        service
            .sendMessage(messageData)
            .then(() => {

                saveMessage({ destination, message, status: { sent: true, confirmed: true } })
                    .then(() => res.status(200).json({ message: "Message saved in the db" }))
                    .catch(err => res.status(500).json({ message: "Message couldn't be saved" }))

            })
            .catch(({ response }) => {

                if (response.status == 504) {

                    saveMessage({ destination, message, status: { sent: true, confirmed: false } })
                        .then(() => res.status(200).json({ message: "Message sent but not confirmed" }))
                        .catch(err => res.status(500).json({ message: "Message couldn't be saved" }))

                } else if (response.status == 500) {

                    saveMessage({ destination, message, status: { sent: false, confirmed: false } })
                        .then(() => res.status(200).json({ message: "Message saved but not sent" }))
                        .catch(err => res.status(500).json({ message: "Message couldn't be saved" }))

                }
            })
    }
}


exports.messages_list = function (req, res) {
    getMessages()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: "Couldn't get the all messages' list" }))
}


exports.delete_messages = function (req, res) {
    deleteMessages()
        .then(response => res.status(200).json({ message: "Db was successfully deleted" }))
        .catch(err => res.status(500).json({ message: "Couldn't delete the db" }))
}