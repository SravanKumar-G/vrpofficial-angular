const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const authCtrl = require('../controllers/auth.controller');
const UserColl = require('../models/user.model');
const bcrypt = require("bcrypt");

const router = express.Router();
module.exports = router;


router.post('/register', asyncHandler(register));
router.post('/login', passport.authenticate('local', { session: false }),  login);
router.get('/me', passport.authenticate('jwtLogin', { session: true }), login);

async function register(req, res, next) {
  try {
    const checkIfExists = await UserColl.findOne({ phoneNumber: req.body.phoneNumber });
    if (checkIfExists)
      next({ status: 400, message: "Mobile Number already exists" });
    const oldEmail = await UserColl.findOne({ email: req.body.email });
    if (oldEmail)
      next({ status: 400, message: "Email already exists" });
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    let user = await UserColl.create(req.body);
    // await opsMail(req.body);
    // await userMail(req.body);
    next({ status: 200, message: "User registered successfully..!" });
  } catch (err) {
    next({ status: 500, message: err });
  }
}
function login(req, res) {
  let user = { fullName: req.user.firstName + ' ' + req.user.lastName, _id: req.user._id };
  let token = authCtrl.generateToken(user);
    res.json({ token,
      phoneNumber: req.user.phoneNumber,
      _id: req.user._id,
      fullName: req.user.firstName + ' ' + req.user.lastName,
      role: req.user.role
    });
}
