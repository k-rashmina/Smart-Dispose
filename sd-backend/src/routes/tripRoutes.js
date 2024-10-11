const express = require("express");
const getAllTrips = require("../controllers/kalindu/getAllTrips");

const router = express.Router();

router.get("/getalltrips", (req, res) => getAllTrips(req, res));

module.exports = router;
