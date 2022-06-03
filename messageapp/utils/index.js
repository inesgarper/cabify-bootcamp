const Message = require("../models/Message.model")

const saveMessage = messageData => Message.create(messageData)

const getMessages = () => Message.find()

module.exports = { saveMessage, getMessages }