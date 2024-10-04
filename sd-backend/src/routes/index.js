const express = require("express");
const path = require("path");

const customerRoutes = require("./customerRoutes");
const inquiryRoutes = require("./inquiryRoutes");
const binRoutes = require("./binRoutes");
const paymentRoutes = require("./paymentRoutes");
const pointsRoutes = require("./pointsRoutes");
const garbageCollectionRoutes = require("./garbageCollectionRoutes");
const monthlyBillRoutes = require("./monthlyBillRoutes");
const router = express.Router();

// Define a route to serve static files (like images)
router.use(
  "/assets",
  express.static(path.join(__dirname, "../../../sd-admin", "src", "assets"))
);

router.use("/customer", customerRoutes); //customer routes
router.use("/inquiry", inquiryRoutes); //inquiry routes
router.use("/bin", binRoutes);
router.use("/payments", paymentRoutes);
router.use("/points", pointsRoutes);
router.use("/garbageCollection", garbageCollectionRoutes);
router.use("/monthlyBill", monthlyBillRoutes);

router.get("/test", (req, res) => {
  res.status(200).json({
    message1: "Hello World",
    message2: "my name kalindu rashmina",
  });
});

module.exports = router;
