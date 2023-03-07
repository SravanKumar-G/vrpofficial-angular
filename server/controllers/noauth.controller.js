const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const StatesColl = require("../models/states.model");
const DistrictsColl = require("../models/districts.model");
const MandalsColl = require("../models/mandals.model");
const ConstituenciesColl = require("../models/constituencies.model");


exports.getAllStates = async (next) => {
    try {
        const states = await StatesColl.find({});
        if (states) {
            next({status: 200, states, message: 'Successfully fetched states data..!'});
        } else {
            next({status: 400, data: [], message: 'no data found..!'});
        }
    } catch (e) {
        console.log(e);
        next({status: 500, data: e, message: 'Error in loading States data..!'})
    }
}

exports.getAllDistricts = async (next) => {
    try {
        const districts = await DistrictsColl.find({});
        if (districts) {
            next({status: 200, districts, message: 'Successfully fetched Districts data..!'});
        } else {
            next({status: 400, data: [], message: 'no data found..!'});
        }
    } catch (e) {
        console.log(e);
        next({status: 500, data: e, message: 'Error in loading Districts data..!'})
    }
}

exports.getAllMandals = async (next) => {
    try {
        const mandals = await MandalsColl.find({});
        if (mandals) {
            next({status: 200, mandals, message: 'Successfully fetched Mandals data..!'});
        } else {
            next({status: 400, data: [], message: 'no data found..!'});
        }
    } catch (e) {
        console.log(e);
        next({status: 500, data: e, message: 'Error in loading Mandals data..!'})
    }
}

exports.getDistrictsByState = async (stateId, next) => {
    try{
        const districts = await DistrictsColl.find({stateId});
        if (districts) {
            next({status: 200, districts, message: 'Successfully fetched districts data..!'});
        } else {
            next({status: 400, data: [], message: 'no data found..!'});
        }
    }catch (e) {
        console.log(e);
        next({status: 500, data: e, message: 'Error in loading Districts data..!'})
    }
}

exports.getMandalsByDistrict = async (distId, next) => {
    try{
        const mandals = await MandalsColl.find({districtId: distId});
        if (mandals) {
            next({status: 200, mandals, message: 'Successfully fetched Mandals data..!'});
        } else {
            next({status: 400, data: [], message: 'no data found..!'});
        }
    }catch (e) {
        console.log(e);
        next({status: 500, data: e, message: 'Error in loading Mandals data..!'})
    }
}

exports.getConstByDistrict = async (distId, next) => {
    try{
        const constituencies = await ConstituenciesColl.find({districtId: distId});
        if (constituencies) {
            next({status: 200, constituencies, message: 'Successfully fetched Constituencies data..!'});
        } else {
            next({status: 400, data: [], message: 'no data found..!'});
        }
    }catch (e) {
        console.log(e);
        next({status: 500, data: e, message: 'Error in loading Constituencies data..!'})
    }
}

exports.getAllConstituencies = async ( next) => {
    try{
        const constituencies = await ConstituenciesColl.find();
        if (constituencies) {
            next({status: 200, constituencies, message: 'Successfully fetched Constituencies data..!'});
        } else {
            next({status: 400, data: [], message: 'no data found..!'});
        }
    }catch (e) {
        console.log(e);
        next({status: 500, data: e, message: 'Error in loading Constituencies data..!'})
    }
}

