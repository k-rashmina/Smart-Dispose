const paymentModel = require("../../models/yohan/paymentModel");

class PaymentDataAccess {
  // Save payment
  async savePayment(payment) {
    const newPayment = new paymentModel(payment);
    return await newPayment.save();
  }

  // Get payment by email
  async getPaymentByEmail(email) {
    return await paymentModel.find({ email });
  }
}

module.exports = new PaymentDataAccess();
