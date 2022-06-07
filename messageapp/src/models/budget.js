import mongoose from "mongoose";

import database from "../database.js";
import databaseBackup from "../databaseBackup.js"

const budgetSchema = new mongoose.Schema({
  amount: Number
});

const Budget = database.model("Budget", budgetSchema)
const BudgetBackup = databaseBackup.model("BudgetBackup", budgetSchema)

export { Budget, BudgetBackup }