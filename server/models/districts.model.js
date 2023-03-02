const mongoose = require("mongoose");

const districtsSchema = new mongoose.Schema({
    name: String,
    stateId: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("districts", districtsSchema, "districts");
