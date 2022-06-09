import Queue from 'bull'
const messageQueue = new Queue('message-queue')

import http from "http"
import saveMessage from "../clients/saveMessage.js"

let queuedMessageId

messageQueue.process(async (job, done) => {
    console.log('Esto es lo que entra en la cola:', job.data)

    const body = JSON.stringify(job.data);

    const postOptions = {
        host: "localhost",
        // host: "messageapp",
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
            const queuedMessage = await saveMessage({
                destination: job.data.destination,
                body: job.data.body,
                status: postRes.statusCode === 200 ? "OK" : "ERROR",
                queueStatus: "QUEUED"
            });

            console.log('MENSAJE ENCOLADO EN EL PROCESO', queuedMessage)

            queuedMessageId = queuedMessage._id

            console.log('SOY EL ID', queuedMessageId)


            if (postRes.statusCode !== 200) {
                throw new Error('Error in the messageapp request');
            }


        } catch (error) {
            console.log(error.message);
            // res.statusCode = 500;
            // res.end(`Internal server error: SERVICE ERROR ${error.message}`);
        }
    });

    postReq.on("timeout", async () => {
        console.error("Timeout Exceeded!");
        postReq.abort();

        try {
            const queuedMessage = await saveMessage({
                destination: job.data.destination,
                body: job.data.body,
                status: "TIMEOUT",
            });

        } catch (error) {
            console.log(error.message)
        }
    });

    postReq.on("error", (error) => {
        //   res.statusCode = 500;
        console.log(error.message);
    });

    postReq.write(body);
    postReq.end();

    done()
})



const saveQueueMessage = async (destination, body) => {
    await messageQueue.add({ destination, body });
};

export { saveQueueMessage, queuedMessageId } 
