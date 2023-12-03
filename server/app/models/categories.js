const mongoose = require("mongoose");

const category = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
});

const Category = mongoose.model("Category", category);

module.exports = Category;
