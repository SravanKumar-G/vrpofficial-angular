const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Joi = require("joi");
const UserColl = require("../models/user.model");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().regex(/^[1-9][0-9]{9}$/)
});

exports.addUser = async (body, next) => {
  try {
    const checkIfExists = await UserColl.findOne({ phoneNumber: body.phoneNumber });
    if (checkIfExists)
      next({ status: 400, message: "Mobile Number already exists" });
    const oldEmail = await UserColl.findOne({ email: body.email });
    if (oldEmail)
      next({ status: 400, message: "Email already exists" });
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    let user = await UserColl.create(body);
    // await opsMail(req.body);
    // await userMail(req.body);
    next({ status: 200, message: "User registered successfully..!" });
  } catch (err) {
    next({ status: 500, message: err });
  }
};

exports.getAllUsers = async (req, next) => {
  try {
    console.log('re', req);
    let query = {};
    const pageNumber = req.page || 0;
    const limit = req.count || 10;
    const result = {};
    if (req.phoneNumber) {
      query.phoneNumber = { "phoneNumber": { $regex: new RegExp("^" + req.phoneNumber, "i") } };
    }
    const total = await UserColl.countDocuments(query).exec();
    let startIndex = (pageNumber - 1) * limit;
    result.data = await UserColl.find(query)
      .sort("-1")
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.count = limit;
    result.total = total;
    result.page = pageNumber;
    next({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: "Something went wrong" });
  }
};

exports.updateUser = async (userId, body, updatedBy, res) => {
  try {
    body.updatedBy = updatedBy.toString();
    let user = await UserColl.updateOne({ _id: ObjectId(userId) }, { $set: body });
    return res({ status: 200, message: user });
  } catch (err) {
    return res({ status: 500, message: err });
  }
}

exports.getUserById = async (userId, next) => {
  try {
    const data = await UserColl.findOne({ _id: ObjectId(userId) });
    next({ status: 200, data: data });
  } catch (err) {
    next({ status: 500, message: err });
  }
}

async function updatePassword(id, password, next) {
  let newPassword = password;
  const salt = await bcrypt.genSalt(10);
  newPassword = await bcrypt.hash(newPassword, salt);
  try {
    UserColl.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { password: newPassword } },
      { new: true },
      async (err, user) => {
        if (err) throw err;
        if (!user) {
          next({ status: 400, message: "user not found" });
        } else {
          next({ status: 200, message: "password updated successfully" });
        }
      }
    );
  } catch (err) {
    next({ status: 500, message: err });
  }
}

async function deleteClientUser(id, next) {
  try {
    await UserColl.deleteOne({ _id: ObjectId(userId) });
    return next({ status: 200, message: "User deleted Successfully..!" });
  } catch (err) {
    return next({ status: 500, message: "Something went wrong" });
  }
}
