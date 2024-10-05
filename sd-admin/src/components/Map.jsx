import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const Map = ({ data }) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const fetchOptimizedRoute = async () => {
    try {
      const waypoints = data.optimizedOrder.map((index) => ({
        location: data.route.legs[index].end_address,
        stopover: true,
      }));

      const directionsRequest = {
        origin: data.route.legs[0].start_address,
        destination: data.route.legs[0].start_address,
        waypoints: waypoints,
        travelMode: "DRIVING",
        optimizeWaypoints: true,
      };

      setDirectionsResponse(directionsRequest);
    } catch (error) {
      console.error("Error fetching optimized route:", error);
    }
  };

  return (
    <LoadScript googleMapsApiKey={"AIzaSyB9jM4BanCgPocT6KcrCcEsuYvE_yfdyYU"}>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        zoom={12}
        center={{ lat: 6.978025547572488, lng: 79.92658020964355 }}
      >
        {directionsResponse && (
          <DirectionsService
            options={directionsResponse}
            callback={(response) => {
              if (response !== null && response.status === "OK") {
                setDirectionsResponse(response);
              }
            }}
          />
        )}

        {directionsResponse && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
            }}
          />
        )}
      </GoogleMap>
      <button onClick={fetchOptimizedRoute}>Get Optimized Route</button>
    </LoadScript>
  );
};

export default Map;
