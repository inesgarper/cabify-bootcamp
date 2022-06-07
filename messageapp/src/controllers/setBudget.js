import http from 'http'

import getCredit from '../clients/getCredit.js'
import createBudget from '../clients/createBudget.js'
import updateBudget from '../clients/updateBudget.js'

export default async (req, res) => {

    const body = JSON.stringify(req.body)

    const postOptions = {
        // host: "127.0.0.1",
        host: "localhost",
        port: 9003,
        path: "/credit",
        method: "post",
        json: true,
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body),
        },
    };

    const postReq = http.request(postOptions)

    const budget = await getCredit()

    if (budget.length == 0) {

        postReq.on("response", async (postRes) => {

            const { amount } = req.body

            try {

                await createBudget({ amount })
                res.statusCode = 200;
                res.end(postRes.body);

            } catch (error) {

                console.log(error.message);
                res.statusCode = 500;
                res.end(`Internal server error: SERVICE ERROR ${error.message}`);
            }
        })

    } else {

        postReq.on("response", async (postRes) => {

            const { amount } = req.body

            try {

                await updateBudget(amount)
                res.statusCode = 200;
                res.end(postRes.body);

            } catch (error) {

                console.log(error.message);
                res.statusCode = 500;
                res.end(`Internal server error: SERVICE ERROR ${error.message}`);
            }
        })

    }

}