const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for the tracking device
const trackingDeviceSchema = new Schema({
  bin_Id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "garbage_bin",
  },
  waste_level: {
    type: Number,
    required: true,
    default: 0,
  },
  // create_date: {
  //   type: Date,
  //   default: () => Date.now(),
  //   immutable: true
  // },
  // update_date: {
  //   type: Date,
  //   default: () => Date.now()
  // },
});

const trackingDevice = mongoose.model("tracking_device", trackingDeviceSchema);
module.exports = trackingDevice;
