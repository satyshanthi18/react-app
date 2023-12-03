const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: {type: Number, required: true},
  year: {type: Number, required: true}
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
