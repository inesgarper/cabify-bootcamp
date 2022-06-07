import Message from "../models/message.js";

import updateBudget from "./updateBudget.js";

export default async (messageParams) => {
  const message = new Message(messageParams);

  if (message.status == 'OK') {

    try {

      await updateBudget(-1)

      const doc = await message.save();

      console.log("Message saved succesfully:", doc);
      return doc;
    } catch (err) {
      console.log("Error while saving", err);
    }
  }

}
