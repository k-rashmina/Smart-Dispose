const monthlyBillService = require("../../services/yohan/monthlyBillService");

// Generate monthly bill
exports.generateMonthlyBill = async (req, res) => {
  const email = req.params.email;
  try {
    const monthlyBill = await monthlyBillService.generateMonthlyBill(email);
    res.status(200).json(monthlyBill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark all unpaid bills as paid
exports.markBillsAsPaid = async (req, res) => {
  const email = req.params.email;
  try {
    const result = await monthlyBillService.markBillsAsPaid(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
