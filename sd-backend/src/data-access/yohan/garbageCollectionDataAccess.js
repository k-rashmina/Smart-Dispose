const garbageCollectionModel = require("../../models/yohan/garbageCollectionModel");

class GarbageCollectionDataAccess {
  //function for create garbage collection record
  async createGarbageCollectionRecord(data) {
    const garbageCollectionRecord = new garbageCollectionModel(data);
    return await garbageCollectionRecord.save();
  }

  //function for getting garbage collection records by email
  async getGarbageCollectionRecordsByEmail(email) {
    return await garbageCollectionModel.find({ email });
  }

  //function for getting garbage collection records by email and range of dates
  async getGarbageCollectionByDateRange(email, startDate, endDate) {
    return await garbageCollectionModel.find({
      email,
      collectionDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  }

  //function for getting all garbage collection records
  async getAllGarbageCollectionRecords() {
    return await garbageCollectionModel.find();
  }
}

module.exports = new GarbageCollectionDataAccess();
