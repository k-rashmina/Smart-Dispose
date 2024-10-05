const express = require("express");
const router = express.Router();
const GarbageCollectionController = require("../controllers/yohan/garbageCollectionController");

// Create a new garbage collection record
router.post("/", GarbageCollectionController.createGarbageCollection);

// Get garbage collection records by email or email with date range
router.get(
  "/:email",
  GarbageCollectionController.getGarbageCollectionRecordsByEmail
);

// Get all garbage collection records
router.get("/", GarbageCollectionController.getAllGarbageCollectionRecords);

module.exports = router;
