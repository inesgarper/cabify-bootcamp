const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema(
    {
        destination: String,
        message: String,
        number: Number,
        sent: Boolean,
        confirmed: Boolean
    },
    {
        timestamps: true
    }
)

const Message = mongoose.model("Message", messageSchema)

module.exports = Message