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
        role: {type: Number},
        employmentStatus: String,
        employmentType: String,
        dependents: Number,
        interestInPolitics: String,
        isContestInElection: String,
        positionToContest: Array,
        contestDistrict: String,
        assContestingConstituency: String,
        parContestingConstituency: String,
        typeOfContribution: Array,
        description: String,
        acceptConsent: String,
        acceptDeclaration: String,
        isPhoneNumberVerified: false
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("user", UserSchema, "user");
