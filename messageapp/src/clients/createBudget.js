import Budget from '../models/budget.js'

import lockedSync from "locked-sync"
const sync = lockedSync()

export default async (budgetParams) => {

    const checkIfBudget = await Budget.find()

    if (checkIfBudget.length != 0) {

        console.log("Budget already created")

    } else {

        const budget = new Budget(budgetParams);

        const end = await sync()

        try {
            const doc = await budget.save();

            console.log("Budget saved succesfully:", doc);
            return doc;

        } catch (err) {

            console.log("Error while saving", err);

        } finally {
            end()
        }

    }
}