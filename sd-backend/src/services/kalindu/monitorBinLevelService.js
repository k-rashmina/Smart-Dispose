const cron = require("node-cron");
const {
  monitorBinLevel,
  updateBinLevels,
} = require("../../data-access/kalindu/garbageBinDB");
const autoSceduleService = require("./autoSceduleService");

module.exports = function monitorBinLevelService() {
  try {
    cron.schedule("* */0.5 * * *", async () => {
      console.log("hi");
      const binMaxCapacity = 360;
      const binThresholdPerc = 80;
      let toBeUpdatedBins = [];
      let nearingBins = [];

      const allBinLevels = await monitorBinLevel();

      for (let i = 0; i < allBinLevels.length; i++) {
        const binLevelPerc =
          (allBinLevels[i].waste_level / binMaxCapacity) * 100;

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

        binLevelPerc >= binThresholdPerc &&
          nearingBins.push(allBinLevels[i].bin_Id);
      }

      //updating bin levels and status
      // console.log(toBeUpdatedBins);
      const msg = await updateBinLevels(toBeUpdatedBins);

      // console.log("nearingBins", nearingBins);
      await autoSceduleService(nearingBins);
    });
  } catch (e) {
    console.log(e.message);
  }
};
