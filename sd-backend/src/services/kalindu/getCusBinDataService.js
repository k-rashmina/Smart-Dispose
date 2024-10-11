const { getCusBinData } = require("../../data-access/kalindu/garbageBinDB");

module.exports = async function getCusBinDataService(binDetails) {
  //getting customer garbage bin data
  const cusBin = await getCusBinData(binDetails);

  return cusBin;
};
