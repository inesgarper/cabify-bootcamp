import Budget from '../models/budget.js'

export default async (change) => {

    const budget = await Budget.find()

    if (budget[0].amount > change) {

        try {

            budget[0].amount -= change

            const doc = await budget[0].save()
            console.log("Budget updated succesfully:", doc);
            return doc;

        } catch (err) {
            console.log("Error while updating budget", err);
        }

    } else {

        console.log("Insufficient credit")

    }
}