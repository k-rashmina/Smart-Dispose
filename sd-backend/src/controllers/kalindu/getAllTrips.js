const { getAllTripsService } = require("../../services/kalindu/tripService");

const getAllTrips = async (req, res) => {
  try {
    const tripDetails = await getAllTripsService();
    res.status(200).json(tripDetails);
  } catch (e) {
    console.log("Error occurred in getCusBinData: ", e);
    res.status(500).send("Error occurred");
  }
};

module.exports = getAllTrips;
