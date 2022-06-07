import http from "http";


import saveMessage from "../clients/saveMessage.js";
import updateBudget from "../clients/updateBudget.js";
import getCredit from "../clients/getCredit.js";

export default async (req, res) => {

  const budget = await getCredit()

  if (budget[0].amount < 0) {

    res.statusCode = 500
    res.end("Insufficient credit error")
    return

  } else {

    const body = JSON.stringify(req.body);

    const postOptions = {
      // host: "127.0.0.1",
      host: "messageapp",
      port: 3000,
      path: "/message",
      method: "post",
      json: true,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const postReq = http.request(postOptions);

    postReq.on("response", async (postRes) => {
      try {
        await saveMessage({
          ...req.body,
          status: postRes.statusCode === 200 ? "OK" : "ERROR",
        });
        if (postRes.statusCode !== 200) {
          throw new Error('Error in the messageapp request');
        }

        res.statusCode = 200;
        res.end(postRes.body);
      } catch (error) {
        console.log(error.message);
        res.statusCode = 500;
        res.end(`Internal server error: SERVICE ERROR ${error.message}`);
      }
    });

    postReq.on("timeout", async () => {
      console.error("Timeout Exceeded!");
      postReq.abort();

      try {
        await saveMessage({
          ...req.body,
          status: "TIMEOUT",
        });

      } finally {
        res.statusCode = 500;
        res.end("Internal server error: TIMEOUT");
      }
    });

    postReq.on("error", (error) => {
      res.statusCode = 500;
      res.end(error.message);
    });

    postReq.write(body);
    postReq.end();

  }

}
