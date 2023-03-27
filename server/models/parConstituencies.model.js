const mongoose = require("mongoose");

const parConSchema = new mongoose.Schema({
    name: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("parconstituencies", parConSchema, "parconstituencies");
