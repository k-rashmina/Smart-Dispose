const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for the payments
const paymentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  paymentTime: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("customer_payments", paymentSchema);
