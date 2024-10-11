const express = require("express");
const router = express.Router();
const pointsController = require("../controllers/yohan/pointsController.js");

//Create customer points
router.post("/", pointsController.addPoints);

//Get customer points by email
router.get("/:email", pointsController.getPointsByEmail);

//Update customer points by email
router.put("/:email", pointsController.updatePointsByEmial);

module.exports = router;
