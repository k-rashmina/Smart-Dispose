import { React, useEffect, useState } from "react";
import AdminHeader from "./common/AdminHeader";
import axios from "axios";
import ScheduleTable from "./common/ScheduleTable";
import Map from "./Map";
import eye from "../assets/eye.png";

function Schedules() {
  const [trips, settrips] = useState([]);
  const [selectedTrips, setSelectedTrips] = useState([]);

  const handleClick = (trip) => {
    console.log("selectedt", trip);
    setSelectedTrips(trip);
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: "smooth", // Optional: Adds smooth scrolling animation
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/trips/getalltrips")
      .then((res) => settrips(res.data))
      .catch((e) => console.log(e));
  }, []);

  const tripsElems = trips.map((trip) => {
    return (
      <tr className="border-bottom ">
        <td>{trip.tripInfo._id}</td>
        <td>{trip.tripInfo.collector || "rashmina@gmail.com"}</td>
        <td>
          <ul>
            {trip.tripInfo.stops.map((stop, index) => (
              <li key={index}>{stop.cusMail}</li>
            ))}
          </ul>
        </td>
        <td>{trip.tripInfo.status}</td>
        <td
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            onClick={() => handleClick(trip)}
            style={{ cursor: "pointer" }}
            width={25}
            src={eye}
            alt="eye"
          />
        </td>
      </tr>
    );
  });

  return (
    <div>
      <AdminHeader pageName={"Schedules"} />
      <Map data={selectedTrips} />
      <div style={{ width: "100%" }}>
        <h2>Trip Information</h2>
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          className="div-shadow"
          style={{ width: "100%" }}
        >
          <thead className="">
            <tr>
              <th>Trip ID</th>
              <th>Collector ID</th>
              <th>Stops</th>
              <th>Status</th>
              <th>See Route</th>
            </tr>
          </thead>
          <tbody>{tripsElems}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedules;
