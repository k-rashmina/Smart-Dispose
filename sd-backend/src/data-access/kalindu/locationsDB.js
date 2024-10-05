const mongoose = require("mongoose");
const locations = require("../../models/kalindu/Location");

//function for getting same city customer locations
const getSameCityLocations = async (cusId) => {
  try {
    //getting current customer city
    const cusCity = await locations.findOne({ cusID: cusId }, "city");

    //getting all the customer locations in the same city
    const sameCityLocs = await locations.find({ city: cusCity.city });

    return sameCityLocs;
  } catch (err) {
    console.log(err.message);
  }
};

//function for getting location for a given customer
const getLocationForCus = async (cusId) => {
  try {
    //getting location for customer
    const cusLoc = await locations.findOne({ cusID: cusId }, "coords");

    return cusLoc.coords;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getSameCityLocations, getLocationForCus };
