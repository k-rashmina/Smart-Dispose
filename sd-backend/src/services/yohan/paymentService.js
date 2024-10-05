const paymentDataAccess = require("../../data-access/yohan/paymentDataAccess");

class PaymentService {
  // Save payment
  async savePayment(payment) {
    try {
      return await paymentDataAccess.savePayment(payment);
    } catch (err) {
      throw new Error(`Unable to save payment: ${err.message}`);
    }
  }

  // Get payment by email
  async getPaymentByEmail(email) {
    try {
      return await paymentDataAccess.getPaymentByEmail(email);
    } catch (err) {
      throw new Error(`Unable to get payment of ${email}: ${err.message}`);
    }
  }
}

module.exports = new PaymentService();
