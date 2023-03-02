const mongoose = require("mongoose");

const constituenciesSchema = new mongoose.Schema({
    name: String,
    districtId: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("constituencies", constituenciesSchema, "constituencies");
