const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
  id: Number,
  title: String,
  descreption: String,
});

module.exports = mongoose.models.Todos || mongoose.model("Todos", TodosSchema);
