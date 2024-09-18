const cron = require("node-cron");
const {
  monitorBinLevel,
  updateBinLevels,
} = require("../../data-access/kalindu/garbageBinDB");

module.exports = function monitorBinLevelService() {
  cron.schedule("* */3 * * *", async () => {
    const binMaxCapacity = 360;
    const binThresholdPerc = 80;
    let toBeUpdatedBins = [];

    const allBinLevels = await monitorBinLevel();

    for (let i = 0; i < allBinLevels.length; i++) {
      const binLevelPerc = (allBinLevels[i].waste_level / binMaxCapacity) * 100;

      toBeUpdatedBins.push({
        bin_Id: allBinLevels[i].bin_Id,
        waste_level: allBinLevels[i].waste_level,
        status:
          allBinLevels[i].waste_level == binMaxCapacity
            ? "full"
            : binLevelPerc >= binThresholdPerc
            ? "nearing"
            : "low",
      });
    }

    //updating bin levels and status
    // console.log(toBeUpdatedBins);
    const msg = await updateBinLevels(toBeUpdatedBins);

    // console.log(msg);
  });
};
