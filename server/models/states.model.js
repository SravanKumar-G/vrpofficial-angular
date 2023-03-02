const mongoose = require("mongoose");

const statesSchema = new mongoose.Schema({
    name: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("states", statesSchema, "states");
