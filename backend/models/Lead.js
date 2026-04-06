const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: String,
  status: {
    type: String,
    enum: ["New", "Contacted", "Closed"],
    default: "New"
  },
  value: Number
});

module.exports = mongoose.model("Lead", leadSchema);