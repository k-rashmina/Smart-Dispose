const PaymentService = require("../../services/yohan/paymentService");

exports.savePayment = async (req, res) => {
  try {
    const payment = req.body;
    const newPayment = await PaymentService.savePayment(payment);
    res.status(200).json(newPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPaymentByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const payments = await PaymentService.getPaymentByEmail(email);
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
