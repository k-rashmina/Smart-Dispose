const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for the customer location
const locationSchema = new Schema({
  coords: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  cusID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "customerProfile",
  },
  city: {
    type: String,
    required: true,
  },
  // update_date: {
  //   type: Date,
  //   default: () => Date.now()
  // },
});

const locations = mongoose.model("locations", locationSchema);
module.exports = locations;
