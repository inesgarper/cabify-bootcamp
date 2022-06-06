import mongoose from "mongoose";

import database from "../database.js";

const budgetSchema = new mongoose.Schema({
  amount: Number
});

export default database.model("Budget", budgetSchema);