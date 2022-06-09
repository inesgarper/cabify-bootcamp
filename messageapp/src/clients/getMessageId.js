import { Message } from "../models/message.js";

export default async (conditions) => {

    const message = await Message.findOne(conditions)

    try {

        console.log(message)

        const { _id } = message
        return _id

    } catch (err) {

        console.log(err)

    }

}
