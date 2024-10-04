const monthlyBillModel = require("../../models/yohan/monthlyBillModel");

class MonthlyBillDataAccess {
  // Save monthly bill
  async saveMonthlyBill(monthlyBill) {
    const newMonthlyBill = new monthlyBillModel(monthlyBill);
    return await newMonthlyBill.save();
  }

  // Get existing monthly bill by email and date range
  async getexistingMonthlyBillsByEmailAndDateRange(email, startDate, endDate) {
    return await monthlyBillModel.findOne({
      email,
      startDate,
      endDate,
    });
  }

  // Get unpaid monthly bills by email
  async getUnpaidMonthlyBillsByEmail(email) {
    return await monthlyBillModel.find({ email, status: false });
  }

  //Update monthly bill
  async updateMonthlyBill(bill) {
    return await monthlyBillModel.updateOne(
      { _id: bill._id },
      { status: bill.status }
    );
  }
}

module.exports = new MonthlyBillDataAccess();
