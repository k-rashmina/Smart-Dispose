const { Client } = require("@googlemaps/google-maps-services-js");
const {
  getSameCityLocations,
} = require("../../data-access/kalindu/locationsDB");

const client = new Client({});

const getClosestCustomer = async (cus, nearbyLocs) => {
  try {
    let originCusLoc;
    let destinations = [];
    let nearbyDistanceValues = [];

    // console.log("nearbyLocs before", nearbyLocs);

    nearbyLocs = nearbyLocs.filter((loc) => {
      if (String(loc.cusID) == String(cus)) {
        originCusLoc = loc;
        return false;
      } else {
        destinations.push({
          lat: loc.coords.lat,
          lng: loc.coords.lng,
        });
        return true;
      }
    });

    // console.log("nearbyLocs after", nearbyLocs);
    // console.log("originCusLoc", originCusLoc);

    const origin = [
      {
        lat: originCusLoc.coords.lat,
        lng: originCusLoc.coords.lng,
      },
    ];

    // console.log("origin", origin);
    // console.log("destinations", destinations);

    const elems = await getDistanceValues(origin, destinations);

    for (let i = 0; i < nearbyLocs.length && i < elems.length; i++) {
      nearbyDistanceValues.push({
        coords: nearbyLocs[i].coords,
        _id: nearbyLocs[i]._id,
        cusID: nearbyLocs[i].cusID,
        city: nearbyLocs[i].city,
        distance: elems[i].distance,
        duration: elems[i].duration,
      });
    }

    nearbyDistanceValues.sort((a, b) => a.distance.value - b.distance.value);

    // console.log("nearbyLocs after after", nearbyDistanceValues);
    return nearbyDistanceValues;
  } catch (e) {
    console.log(e.message);
  }
};

const getSameCityCustomers = async (cus) => {
  try {
    const sameCityLocs = await getSameCityLocations(cus);
    return sameCityLocs;
  } catch (e) {
    console.log(e.message);
  }
};

const getDistanceValues = async (origin, destinations) => {
  try {
    const response = await client.distancematrix({
      params: {
        origins: origin,
        destinations: destinations,
        travelMode: "DRIVING",
        key: process.env.GOOGLE_API_KEY,
      },
    });

    return response.data.rows[0].elements;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getClosestCustomer, getSameCityCustomers };
