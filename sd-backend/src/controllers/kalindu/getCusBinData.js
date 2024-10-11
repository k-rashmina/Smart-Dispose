const getCusBinDataService = require("../../services/kalindu/getCusBinDataService");

const getCusBinData = async (req, res) => {
  try {
    const binDetails = {
      cusId: req.query.cusID,
      btype: req.query.type,
    };

    res.status(200).json(await getCusBinDataService(binDetails));
  } catch (e) {
    console.log("Error occurred in getCusBinData: ", e);
    res.status(500).send("Error occurred");
  }
};

module.exports = getCusBinData;
