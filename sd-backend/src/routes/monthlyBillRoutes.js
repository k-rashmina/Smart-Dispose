const express = require("express");
const router = express.Router();
const monthlyBillController = require("../controllers/yohan/monthlyBillController");

//Generate monthly bill
router.get("/generate/:email", monthlyBillController.generateMonthlyBill);

//Mark all unpaid bills as paid
router.put("/mark-paid/:email", monthlyBillController.markBillsAsPaid);

module.exports = router;
