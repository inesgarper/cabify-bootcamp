import { Message, MessageBackup } from "../models/message.js";

import updateBudget from "./updateBudget.js";

import lockedSync from "locked-sync"
const sync = lockedSync()

export default async (messageID, messageParams) => {

    const message = await Message.findByIdAndUpdate(messageID, messageParams)

    console.log('SOY EL MENSAJE A ACTUALIZAR----- ', message)

    const end = await sync()

    try {

        await updateBudget(-1)

        const doc = await message.save();
        console.log("Message updated succesfully:", doc);

        return doc;

    } catch (err) {
        await updateBudget(1)
        console.log("Error while saving budget backup from saveMessage", err)

        console.log("Error while saving", err);

    } finally {
        end()
    }


}