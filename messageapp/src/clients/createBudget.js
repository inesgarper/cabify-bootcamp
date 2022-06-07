import { Budget, BudgetBackup } from '../models/budget.js'

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

            const budgetBackup = new BudgetBackup(budgetParams)

            try {
                const doc = await budgetBackup.save()

                console.log("Budget backup saved succesfully:", doc)
            } catch (err) {

                console.log("Error while saving budget backup", err)

            }

            return doc;

        } catch (err) {

            console.log("Error while saving", err);

        } finally {
            end()
        }

    }
}