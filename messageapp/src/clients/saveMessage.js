import { Message, MessageBackup } from "../models/message.js";

// import updateBudget from "./updateBudget.js";

import lockedSync from "locked-sync"
const sync = lockedSync()

export default async (messageParams) => {
  const message = new Message(messageParams);

  const end = await sync()

  try {

    const doc = await message.save();
    console.log("Message saved succesfully:", doc);

    const messageBackup = new MessageBackup(messageParams)

    try {

      const doc2 = await messageBackup.save()

      console.log("Message backup saved succesfully:", doc2)

    } catch (err) {

      console.log("Error while saving budget backup from saveMessage", err)

    }

    return doc;

  } catch (err) {

    console.log("Error while saving", err);

  } finally {
    end()
  }


}
