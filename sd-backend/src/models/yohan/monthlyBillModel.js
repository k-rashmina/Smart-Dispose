const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for the monthly bill
const monthlyBillSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalCostForOrganic: {
    type: Number,
    required: true,
  },
  totalCostForNonOrganic: {
    type: Number,
    required: true,
  },
  totalCostForPolythenePlastic: {
    type: Number,
    required: true,
  },
  subTotalCost: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  serviceCharge: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  totalPaybackForRecyclable: {
    type: Number,
    required: true,
  },
  monthlyCharge: {
    type: Number,
    required: true,
  },
  totalOutstandingAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("monthly_bill", monthlyBillSchema);
