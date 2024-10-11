const {
  checkTrip,
  addCustomer,
  createTrip,
  getTripDetails,
} = require("../../data-access/kalindu/tripsDB");
const { getLocationForCus } = require("../../data-access/kalindu/locationsDB");
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

//function to check customer in a trip
const checkFortrips = async (cusId) => {
  const trip = await checkTrip(cusId);

  return trip;
};

//function to add customer to a trip
const addCusToTrip = async (cusId, tripId) => {
  const trip = await addCustomer(cusId, tripId);

  return trip;
};

const createNewTrip = async (cusId) => {
  try {
    const tripDetails = {
      stops: [cusId],
      status: "pending",
    };

    const created = await createTrip(tripDetails);

    return created;
  } catch (e) {
    console.log(e);
  }
};

const getAllTripsService = async () => {
  try {
    //garbage collection trip origin
    const origin = { lat: 7.0161704247898875, lng: 79.93817630046519 };
    let destinations = [];
    let tripLocations = [];
    let cusLocations = [];

    const tripDetails = await getTripDetails();

    for (let i = 0; i < tripDetails.length; i++) {
      cusLocations = [];
      for (let j = 0; j < tripDetails[i].stops.length; j++) {
        cusLocations.push(await getLocationForCus(tripDetails[i].stops[j]));
      }

      const waypoints = cusLocations.map((loc) => `${loc.lat},${loc.lng}`);

      const tripDirection = await getDirectionValues(origin, waypoints);
      const optimizedOrder = tripDirection.routes[0].waypoint_order;
      const route = tripDirection.routes[0];

      // console.log(cusLocations);
      tripLocations.push({
        tripInfo: tripDetails[i],
        locationInfo: cusLocations,
        optimizedOrder: optimizedOrder,
        route: route,
      });
    }

    // tripLocations.locationInfo.forEach(loc => {
    //   de
    // });

    return tripLocations;
  } catch (e) {
    console.log(e);
  }
};

const getDirectionValues = async (origin, waypoints) => {
  try {
    const response = await client.directions({
      params: {
        origin: origin,
        destination: origin,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: "DRIVING",
        key: process.env.GOOGLE_API_KEY,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  checkFortrips,
  addCusToTrip,
  createNewTrip,
  getAllTripsService,
};
