const mongoose = require("mongoose");
const garbageBin = require("../../models/kalindu/Garbagebin");
const trackingDevice = require("../../models/kalindu/TrackingDevice");
const customerDetails = require("../../models/chamath/customerDetails");

//function for creating garbage bins for new customers
const createGarbageBin = async (customerID) => {
  const binTypes = ["r", "no", "o"];

  try {
    //creating 3 garbage bins per customer
    for (let i = 0; i < binTypes.length; i++) {
      const newBin = new garbageBin({
        cusID: customerID,
        status: "low",
        current_capacity: 0,
        bin_type: binTypes[i],
        maximum_capacity: 360,
      });

      //saving the garbage bin details in the db
      const savedBin = await newBin.save();

      //creating a waste tracking device for the waste bin
      const newTrackingDevice = new trackingDevice({
        bin_Id: savedBin._id,
        waste_level: 0,
      });

      //saving the waste tracking device in the db
      const savedDevice = await newTrackingDevice.save();
    }

    return "Bins Added";
  } catch (err) {
    console.log(err.message);
  }
};

//function for getting garbage bins details
const getCusBinData = async (binDetails) => {
  try {
    const cusId = await getCusID(binDetails.cusId);
    //getting customer garbage bin data
    const cusBin = await garbageBin.findOne({
      cusID: cusId,
      bin_type: binDetails.btype,
    });

    return cusBin;
  } catch (err) {
    console.log(err.message);
  }
};

//function for monitoring waste levels in garbage bins
const monitorBinLevel = async () => {
  try {
    //getting all the waste levels
    const allBinLevels = await trackingDevice.find();

    return allBinLevels;
  } catch (err) {
    console.log(err.message);
  }
};

//function for updating waste levels in the garbage bins
const updateBinLevels = async (toBeUpdatedBins) => {
  try {
    //for loop to loop through bins
    for (let i = 0; i < toBeUpdatedBins.length; i++) {
      //finding relevant gabage bin and updating the values
      await garbageBin.findByIdAndUpdate(
        toBeUpdatedBins[i].bin_Id,
        {
          current_capacity: toBeUpdatedBins[i].waste_level,
          status: toBeUpdatedBins[i].status,
        },
        { new: true, runValidators: true }
      );
    }

    return "updated successful";
  } catch (err) {
    console.log(err.message);
  }
};

//function for deleting garbage bins
const deleteGarbageBins = async (customerEmail) => {
  const cusId = await getCusID(customerEmail);

  try {
    //deleting 3 garbage bins per customer
    const deleted = await garbageBin.deleteMany({ cusID: cusId });

    for (let i = 0; i < deleted.length; i++) {
      const deletedDevices = await trackingDevice.deleteMany({
        bin_Id: deleted[i]._id,
      });
    }

    return "Bins deleted";
  } catch (err) {
    console.log(err.message);
  }
};

const getCusID = async (cusEmail) => {
  try {
    //getting customer garbage bin data
    const cusID = await customerDetails.findOne(
      {
        cusMail: cusEmail,
      },
      "cusID"
    );

    return cusID;
  } catch (err) {
    console.log(err.message);
  }
};

//function for cus id
const getCusIDForBin = async (binId) => {
  try {
    //getting customer id for given garbage bin id
    const cusId = await garbageBin.findOne(
      {
        _id: binId,
      },
      "cusID"
    );

    return cusId.cusID;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createGarbageBin,
  getCusBinData,
  monitorBinLevel,
  updateBinLevels,
  deleteGarbageBins,
  getCusID,
  getCusIDForBin,
};
