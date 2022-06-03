const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema(
    {
        destination: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        status: {
            sent: Boolean,
            confirmed: Boolean
        }
    },
    {
        timestamps: true
    }
)

const Message = mongoose.model("Message", messageSchema)

module.exports = Message