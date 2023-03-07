const express = require("express");
const passport = require("passport");
const UserController = require('../controllers/user.controller')

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

router.route('/addUser').post(function (req, res) {
  UserController.addUser(req.body, result => {
    res.status(result.status).json(result);
  });
});

// Get All Users
router.route('/getAllUsers').post(function (req, res) {
  UserController.getAllUsers(req.body, result => {
    res.status(result.status).json(result);
  });
});

// Get User by mongoId
router.route('/getUser/:userId').get(function (req, res) {
  UserController.getUserById(req.params.userId, result => {
    res.status(result.status).json(result);
  });
});

router.route('/viewUserDetails/:userId').get(function (req, res) {
  UserController.viewUserDetails(req.params.userId, result => {
    res.status(result.status).json(result);
  });
});

// Update User by ID
router.route('/updateUser/:userId').put(function (req, res) {
  UserController.updateUser(req.params.userId, req.body, req.user._id, result => {
    res.status(result.status).json(result);
  });
});

router.route('/deleteUser/:userId').delete(function (req, res) {
  UserController.deleteUser(req.params.userId, result => {
    res.status(result.status).json(result);
  });
});

router.route('/updatePassword/:userId').post(function (req, res) {
  console.log(req.params.userId, req.body);
  UserController.updatePassword(req.params.userId, req.body.password, result => {
    res.status(result.status).json(result);
  });
});
