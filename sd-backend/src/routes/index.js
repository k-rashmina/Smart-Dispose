const express = require("express");
const path = require("path");

const router = express.Router();

// Define a route to serve static files (like images)


const customerRoutes = require("./customerRoutes");
router.use("/customer", customerRoutes);

const inquiryRoutes = require("./inquiryRoutes");
router.use("/inquiry", inquiryRoutes);

module.exports = router;
