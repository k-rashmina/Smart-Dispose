const garbageCollectionDataAccess = require("../../data-access/yohan/garbageCollectionDataAccess");

class GarbageCollectionService {
  //function for create garbage collection record
  async createGarbageCollectionRecord(data) {
    try {
      return await garbageCollectionDataAccess.createGarbageCollectionRecord(
        data
      );
    } catch (err) {
      throw new Error(
        `Unable to create garbage collection record: ${err.message}`
      );
    }
  }

  //function for getting garbage collection records by email
  async getGarbageCollectionRecordsByEmail(email) {
    try {
      return await garbageCollectionDataAccess.getGarbageCollectionRecordsByEmail(
        email
      );
    } catch (err) {
      throw new Error(
        `Unable to fetch garbage collection records: ${err.message}`
      );
    }
  }

  //function for getting all garbage collection records
  async getAllGarbageCollectionRecords() {
    try {
      return await garbageCollectionDataAccess.getAllGarbageCollectionRecords();
    } catch (err) {
      throw new Error(
        `Unable to fetch garbage collection records: ${err.message}`
      );
    }
  }
}

module.exports = new GarbageCollectionService();
