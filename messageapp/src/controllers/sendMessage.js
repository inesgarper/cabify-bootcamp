import { saveQueueMessage } from "../queues/message.queue.js";

import getCredit from "../clients/getCredit.js";

export default async (req, res) => {

  const budget = await getCredit()

  if (budget[0].amount < 0) {

    res.statusCode = 500
    res.end("Insufficient credit error")
    return

  } else {

    const { destination, body } = req.body

    const queuedMessage = await saveQueueMessage(destination, body)

    res.end(`Your message with id ${queuedMessage?._id} is in the queue to be sent!`)

  }

}