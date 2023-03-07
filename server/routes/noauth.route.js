const express = require("express");
const noAuthController = require('../controllers/noauth.controller')

const router = express.Router();
module.exports = router;

router.route('/getStates').get(function (req, res) {
    noAuthController.getAllStates(result => {
        res.status(result.status).json(result);
    });
});

router.route('/getAllDistricts').get(function (req, res) {
    noAuthController.getAllDistricts(result => {
        res.status(result.status).json(result);
    });
});

router.route('/getAllMandals').get(function (req, res) {
    noAuthController.getAllMandals(result => {
        res.status(result.status).json(result);
    });
});

router.route('/getDistrictsByStateId/:stateId').get(function (req, res) {
    noAuthController.getDistrictsByState(req.params.stateId, result => {
        res.status(result.status).json(result);
    });
});

router.route('/getMandalsByDistrict/:distId').get(function (req, res) {
    noAuthController.getMandalsByDistrict(req.params.distId, result => {
        res.status(result.status).json(result);
    });
});

router.route('/getConstituenciesByDistrict/:distId').get(function (req, res) {
    noAuthController.getConstByDistrict(req.params.distId, result => {
        res.status(result.status).json(result);
    });
});

router.route('/getAllConstituencies').get(function (req, res) {
    noAuthController.getAllConstituencies(result => {
        res.status(result.status).json(result);
    });
});

router.route('/getDistrictsByStateId/:stateId').get(function (req, res) {
    noAuthController.getDistrictsByState(req.params.stateId, result => {
        res.status(result.status).json(result);
    });
});

