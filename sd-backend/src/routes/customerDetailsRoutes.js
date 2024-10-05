const express = require("express");
const router = express.Router();
const customerDetailsController = require("../controllers/chamath/customerDetailsController");

// Get all customers
router.get("/", customerDetailsController.getAllCustomers);

// Get customer by email
router.get("/:email", customerDetailsController.getCustomerByEmail);

module.exports = router;
