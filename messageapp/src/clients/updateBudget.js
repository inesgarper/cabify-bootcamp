import { Budget, BudgetBackup } from '../models/budget.js'

export default async (change) => {

    const budget = await Budget.find()

    try {

        budget[0].amount += change

        const doc = await budget[0].save()
        console.log("Budget updated succesfully:", doc);

        const budgetBackup = await BudgetBackup.find()

        try {

            budgetBackup[0].amount += change

            const doc2 = await budgetBackup[0].save()
            console.log("Budget backup updated succesfully:", doc2)

        } catch (err) {

            console.log("Error while saving budget backup from updateBudget", err)

        }

        return doc;

    } catch (err) {
        console.log("Error while updating budget", err);
    }


}