const mongoose = require("mongoose");

const mandalSchema = new mongoose.Schema({
    name: String,
        districtId: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("mandals", mandalSchema, "mandals");
