const express = require("express");
const path = require("path");

const customerRoutes = require("./customerRoutes");
const inquiryRoutes = require("./inquiryRoutes");
const binRoutes = require("./binRoutes");
const paymentRoutes = require("./paymentRoutes");

const router = express.Router();

router.use("/customer", customerRoutes); //customer routes
router.use("/inquiry", inquiryRoutes); //inquiry routes
router.use("/bin", binRoutes);
router.use("/payments", paymentRoutes);

router.get("/test", (req, res) => {
  res.status(200).json({
    message1: "Hello World",
    message2: "my name kalindu rashmina",
  });
});

module.exports = router;
