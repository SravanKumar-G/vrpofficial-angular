const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    fatherFirstName: String,
    fatherLastName: String,
    motherFirstName: String,
    motherLastName: String,
    gender: String,
    maritalStatus: String,
    dateOfBirth: Date,
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    state: String,
    district: String,
    mandal: String,
    constituency: String,
    address: String,
    createdBy: {
      type: String
    },
    updatedBy: {
      type: String
    },
    status: {
      type: Boolean,
      default: false
    },
    role: { type: Number },
    employmentStatus: String,
    employmentType: String,
    dependents: Number,
    isPolitics: String,
    isContestInElections: String,
    electionType: String,
    contestingConstituency: String,
    typeOfContribution: String,
    description: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("user", UserSchema, "user");
