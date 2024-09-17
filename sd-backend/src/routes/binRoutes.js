const express = require("express");

const getCusBinData = require("../controllers/kalindu/getCusBinData");

const router = express.Router();

router.get("/getcusbindata", (req, res) => getCusBinData(req, res));

module.exports = router;
