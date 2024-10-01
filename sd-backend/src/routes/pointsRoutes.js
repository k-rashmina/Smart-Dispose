const express = require("express");
const router = express.Router();
const pointsController = require("../controllers/yohan/pointsController");

router.post("/", pointsController.addPoints);

router.get("/", pointsController.getPoints);

router.get("/:email", pointsController.getPointsByEmail);

router.put("/:email", pointsController.updatePoints);

router.delete("/:email", pointsController.deletePoints);

module.exports = router;
