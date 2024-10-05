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
    const { startDate, endDate } = req.query;

    let garbageCollectionRecords;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Validate date objects
      if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({ error: "Invalid date format" });
      }

      garbageCollectionRecords =
        await GarbageCollectionService.getGarbageCollectionByDateRange(
          email,
          start,
          end
        );
    } else {
      garbageCollectionRecords =
        await GarbageCollectionService.getGarbageCollectionRecordsByEmail(
          email
        );
    }
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
