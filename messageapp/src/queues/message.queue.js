import Queue from 'bull'
const messageQueue = new Queue('message-queue')

import http from "http"

import saveMessage from "../clients/saveMessage.js"
import updateMessage from "../clients/updateMessage.js"
import updateBudget from "../clients/updateBudget.js"


// -- PROCESS

messageQueue.process(async (job, done) => {

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
            const message = await updateMessage(job.data.id, {
                destination: job.data.destination,
                body: job.data.body,
                status: postRes.statusCode === 200 ? "OK" : "ERROR",
            });

            if (postRes.statusCode !== 200) {
                await updateBudget(1)
                throw new Error('Error in the messageapp request');
            }

            console.log(`Your message ${message._id} has been send sucessfully`)


        } catch (error) {
            console.log(error.message);
        }
    });

    postReq.on("timeout", async () => {
        console.error("Timeout Exceeded!");
        postReq.abort();

        try {
            await updateMessage(job.data.id, {
                destination: job.data.destination,
                body: job.data.body,
                status: "TIMEOUT",
            });

        } catch (error) {
            console.log(error.message)
        }
    });

    postReq.on("error", (error) => {
        console.log(error.message);
    });

    postReq.write(body);
    postReq.end();

    done()
})



const saveQueueMessage = async (destination, body) => {

    const messageinDB = await saveMessage({ destination: destination, body: body, status: "QUEUED" })

    await messageQueue.add({ destination: messageinDB.destination, body: messageinDB.body, id: messageinDB._id });

    return messageinDB

};

export { saveQueueMessage } 
