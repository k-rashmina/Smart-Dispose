const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for the garbage collection
const garbageCollectionSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  garbageType: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  collectionDate: {
    type: Date,
    required: true,
  },
  collectionTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("garbage_collection", garbageCollectionSchema);
