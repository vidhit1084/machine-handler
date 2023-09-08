const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  lastUpdateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Machine", machineSchema);
