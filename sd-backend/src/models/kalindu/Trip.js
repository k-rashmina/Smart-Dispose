const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for the customer location
const tripSchema = new Schema({
  collector_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "collector",
    default: null,
  },
  stops: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "customerProfile",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "ongoing", "inactive"],
    required: true,
  },
  // update_date: {
  //   type: Date,
  //   default: () => Date.now()
  // },
});

const trips = mongoose.model("trips", tripSchema);
module.exports = trips;
