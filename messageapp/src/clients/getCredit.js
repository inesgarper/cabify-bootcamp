import Budget from "../models/budget.js";

export default (conditions = {}) => Budget.find(conditions);
