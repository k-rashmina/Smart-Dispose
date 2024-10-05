const mongoose = require("mongoose");
const trips = require("../../models/kalindu/Trip");

//function for creating a trip
const createTrip = async (tripDetails) => {
  try {
    //saving trip details
    const newTrip = new trips(tripDetails);

    await newTrip.save();

    return true;
  } catch (err) {
    console.log(err.message);
  }
};

//function for getting all sceduled trips
const getTripDetails = async () => {
  try {
    //getting sceduled trips
    const tripDetails = await trips
      .find({ status: { $ne: "inactive" } })
      .populate("stops");

    return tripDetails;
  } catch (err) {
    console.log(err.message);
  }
};

//function for checking if a customer already has a trip sceduled
const checkTrip = async (cusId) => {
  try {
    //checking customer id in a sceduled trips
    const check = await trips.exists({
      stops: { $in: [cusId] },
      status: { $ne: "inactive" },
    });

    console.log("check", check);

    return check;
  } catch (err) {
    console.log(err.message);
  }
};

//function for adding a customer to a sceduled trip
const addCustomer = async (cusId, tripId) => {
  try {
    //adding customer for a sceduled trips
    const updated = await trips.findByIdAndUpdate(
      tripId,
      { $push: { stops: cusId } },
      { new: true }
    );

    console.log("updated", updated);

    return updated;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { checkTrip, addCustomer, createTrip, getTripDetails };
