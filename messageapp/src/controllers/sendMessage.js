import http from "http";

import { saveQueueMessage, queuedMessageId } from "../queues/message.queue.js";

import saveMessage from "../clients/saveMessage.js";
import getCredit from "../clients/getCredit.js";
import getMessageId from "../clients/getMessageId.js";

export default async (req, res) => {

  const budget = await getCredit()

  if (budget[0].amount < 0) {

    res.statusCode = 500
    res.end("Insufficient credit error")
    return

  } else {

    const { destination, body } = req.body

    await saveQueueMessage(destination, body)

    console.log('ahora en el sendMessage', queuedMessageId)

    // const id = await getMessageId({ destination: destination })

    res.end(`Your message with id ${queuedMessageId} is in the queue to be sent!`)


    // const body = JSON.stringify(req.body);

    // const postOptions = {
    //   host: "localhost",
    //   // host: "messageapp",
    //   port: 3000,
    //   path: "/message",
    //   method: "post",
    //   json: true,
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Content-Length": Buffer.byteLength(body),
    //   },
    // };

    // const postReq = http.request(postOptions);

    // postReq.on("response", async (postRes) => {

    //   const { destination, body } = req.body

    //   try {
    //     await saveMessage({
    //       ...req.body,
    //       status: postRes.statusCode === 200 ? "OK" : "ERROR",
    //       queueStatus: "PENDING"
    //     });
    //     console.log('soy el postRes ------', postRes)
    //     if (postRes.statusCode !== 200) {
    //       throw new Error('Error in the messageapp request');
    //     }

    //     res.statusCode = 200;
    //     res.end(postRes.body);

    //     await saveQueueMessage(destination, body)
    //   } catch (error) {
    //     console.log(error.message);
    //     res.statusCode = 500;
    //     res.end(`Internal server error: SERVICE ERROR ${error.message}`);
    //   }
    // });

    // postReq.on("timeout", async () => {
    //   console.error("Timeout Exceeded!");
    //   postReq.abort();

    //   try {
    //     await saveMessage({
    //       ...req.body,
    //       status: "TIMEOUT",
    //     });

    //   } finally {
    //     res.statusCode = 500;
    //     res.end("Internal server error: TIMEOUT");
    //   }
    // });

    // postReq.on("error", (error) => {
    //   res.statusCode = 500;
    //   res.end(error.message);
    // });

    // postReq.write(body);
    // postReq.end();

  }

}
