const GarbageCollectionService = require("../../services/yohan/garbageCollectionService");

//function for create garbage collection record
exports.createGarbageCollection = async (req, res) => {
  try {
    const data = req.body;
    const garbageCollectionRecord =
      await GarbageCollectionService.createGarbageCollectionRecord(data);
    res.status(200).json(garbageCollectionRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//function for getting garbage collection records by email
exports.getGarbageCollectionRecordsByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const garbageCollectionRecords =
      await GarbageCollectionService.getGarbageCollectionRecordsByEmail(email);
    res.status(200).json(garbageCollectionRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//function for getting all garbage collection records
exports.getAllGarbageCollectionRecords = async (req, res) => {
  try {
    const garbageCollectionRecords =
      await GarbageCollectionService.getAllGarbageCollectionRecords();
    res.status(200).json(garbageCollectionRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
