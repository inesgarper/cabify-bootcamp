const Message = require("../models/Message.model")

const saveMessage = (messageData) => Message.create(messageData)

const getMessages = () => Message.find()

const deleteMessages = () => Message.deleteMany()

module.exports = { saveMessage, getMessages, deleteMessages }