const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for the garbage bin
const garbageBinSchema = new Schema({
  cusID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "customerProfile",
  },
  status: {
    type: String,
    enum: ["low", "nearing", "full"],
    required: true,
  },
  current_capacity: {
    type: Number,
    required: true,
    default: 0,
  },
  bin_type: {
    type: String,
    enum: ["r", "no", "o"],
    required: true,
  },
  maximum_capacity: {
    type: Number,
    required: true,
    default: 360,
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

const garbageBin = mongoose.model("garbage_bin", garbageBinSchema);
module.exports = garbageBin;
