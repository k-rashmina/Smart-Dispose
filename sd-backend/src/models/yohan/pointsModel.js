const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for the points
const pointsSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("customer_points", pointsSchema);
