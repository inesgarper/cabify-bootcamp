const Message = require("../models/Message.model")

const saveMessage = (messageData, res, resMessage) => {

    Message
        .create(messageData)
        .then(() => res.status(200).json({ message: resMessage }))
        .catch(err => res.status(500).json({ message: "Message couldn't be saved" }))

}

const getMessages = () => Message.find()

const deleteMessages = () => Message.deleteMany()

module.exports = { saveMessage, getMessages, deleteMessages }