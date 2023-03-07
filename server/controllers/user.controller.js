const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Joi = require("joi");
const UserColl = require("../models/user.model");
const StateColl = require("../models/states.model");
const DistColl = require("../models/districts.model");
const MandalColl = require("../models/mandals.model");
const ConstColl = require("../models/constituencies.model");

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
    let query = {status: false};
    const pageNumber = req.page || 0;
    const limit = req.count || 10;
    const result = {};
    if (req.phoneNumber) {
      query.phoneNumber =  req.phoneNumber ;
    }
    if (req.state) {
      query.state = req.state ;
    }
    if (req.district) {
      query.district =  req.district ;
    }
    if (req.mandal) {
      query.mandal = req.mandal;
    }
    const total = await UserColl.countDocuments(query).exec();
    let startIndex = (pageNumber - 1) * limit;
    result.data = await UserColl.find(query)
      .sort("-1")
      .skip(startIndex)
      .limit(limit)
      .exec();
    for (let i =0; i < result.data.length; i++) {
        await populateName(result.data[i]);
    }
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
    return res({ status: 200, message: 'User details updated successfully..!' });
  } catch (err) {
    return res({ status: 500, message: err });
  }
}

exports.getUserById = async (userId, next) => {
  try {
    const data = await UserColl.findOne({ _id: ObjectId(userId) });
    delete data.password;
    // console.log(finalData);
    next({ status: 200, data });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: err });
  }
}

exports.viewUserDetails = async (userId, next) => {
  try {
    const data = await UserColl.findOne({ _id: ObjectId(userId) });
    delete data.password;
    const finalData = await populateName(data);
    // console.log(finalData);
    next({ status: 200, data:finalData });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: err });
  }
}

exports.deleteUser = async (userId, next) => {
  try {
    await UserColl.deleteOne({ _id: ObjectId(userId) });
    next({ status: 200, message: 'User deleted successfully..!' });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: err });
  }
}

exports.updatePassword = async (userId, password, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    UserColl.findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $set: { password: hashedPassword } },
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

async function populateName (userData) {
  let state = userData.state ? await StateColl.findOne({_id: userData.state}) : {name: ''};
  const dist = userData.district ? await DistColl.findOne({_id: userData.district}) : {name: ''};
  const mand = userData.mandal ? await MandalColl.findOne({_id: userData.mandal}) : {name: ''};
  const consti = userData.contestingConstituency ? await ConstColl.findOne({_id: userData.contestingConstituency}) :{name: ''};
  userData.state = state.name;
  userData.district = dist.name;
  userData.mandal = mand.name;
  userData.contestingConstituency = consti.name;
  // console.log(userData);
  return userData;

}
