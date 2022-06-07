import getCredit from '../clients/getCredit.js'
import createBudget from '../clients/createBudget.js'
import updateBudget from '../clients/updateBudget.js'

export default async (req, res) => {

    const budget = await getCredit()

    if (budget.length == 0) {

        const { amount } = req.body

        try {

            await createBudget({ amount })
            res.statusCode = 200;
            res.end();

        } catch (error) {

            console.log(error.message);
            res.statusCode = 500;
            res.end(`Internal server error: SERVICE ERROR ${error.message}`);
        }

    } else {

        const { amount } = req.body

        try {

            await updateBudget(amount)
            res.statusCode = 200;
            res.end();

        } catch (error) {

            res.statusCode = 500;
            res.end(`Internal server error: SERVICE ERROR ${error.message}`);
        }

    }
}