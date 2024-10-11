const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for the customer location
const collectorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  vehicle_no: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["booked", "free"],
    required: true,
  },
  // update_date: {
  //   type: Date,
  //   default: () => Date.now()
  // },
});

const collector = mongoose.model("collector", collectorSchema);
module.exports = collector;
