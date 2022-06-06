import Budget from '../models/budget.js'

export default async (budgetParams) => {

    const checkIfBudget = await Budget.find()

    if (checkIfBudget.length != 0) {

        console.log("Budget already created")

    } else {

        const budget = new Budget(budgetParams);

        try {
            const doc = await budget.save();

            console.log("Budget saved succesfully:", doc);
            return doc;
        } catch (err) {
            console.log("Error while saving", err);
        }

    }
}