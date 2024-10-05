const { getCusIDForBin } = require("../../data-access/kalindu/garbageBinDB");
const {
  checkFortrips,
  addCusToTrip,
  createNewTrip,
} = require("../../services/kalindu/tripService");
const {
  getClosestCustomer,
  getSameCityCustomers,
} = require("./locationService");

module.exports = async function autoSceduleService(nearingBins) {
  try {
    let customerIds = [];

    /*getiing customer ids for the nearing bins and 
    filtering to get the customer who do not already has a trip*/
    for (let i = 0; i < nearingBins.length; i++) {
      const cus = await getCusIDForBin(nearingBins[i]);
      const trip = await checkFortrips(cus);
      !trip && customerIds.push(cus);
    }

    if (customerIds.length == 0) {
      console.log("Trips are already scheduled");
      return;
    }

    //for each customer getting the closest customers and assigning trips to them
    for (let i = 0; i < customerIds.length; i++) {
      const sameCityLocs = await getSameCityCustomers(customerIds[i]);
      let j;
      if (sameCityLocs.length > 1) {
        const sortedNearbyDistanceValues = await getClosestCustomer(
          customerIds[i],
          sameCityLocs
        );

        for (j = 0; j < sortedNearbyDistanceValues.length; j++) {
          const cus = sortedNearbyDistanceValues[j].cusID;
          const trip = await checkFortrips(cus);

          if (trip) {
            const updated = await addCusToTrip(customerIds[i], trip._id);

            break;
          } else {
            console.log("no trip cus", sortedNearbyDistanceValues[j]);
          }
        }
      }

      if (sameCityLocs.length <= 1 || j >= sortedNearbyDistanceValues.length) {
        console.log("creating new trip...");

        const created = await createNewTrip(customerIds[i]);
        console.log(created ? "create success" : "create fail");
      }

      // console.log("elems", closestCus);
    }

    // console.log("customerIds", customerIds);
  } catch (e) {
    console.log(e.message);
  }
};
