import React from "react";
import eye from "../../assets/eye.png";
import { Link } from "react-router-dom";

export default function ScheduleTable({ tripDetails }) {
  const tripsElems = tripDetails.map((trip) => {
    return (
      <tr className="">
        <td>{trip._id}</td>
        <td>{trip.collector}</td>
        <td>
          <ul>
            {trip.stops.map((stop, index) => (
              <li key={index}>{stop}</li>
            ))}
          </ul>
        </td>
        <td>{trip.status}</td>
      </tr>
    );
  });

  const tripData = {
    _id: "66ff725d23287af988c7373b",
    collector: "66ff815a376bb6390b494bbc",
    stops: [
      "66fec76cb3bd8a98c9628ba3",
      "66fec873b3bd8a98c9628bbf",
      "66fec7e5b3bd8a98c9628bb1",
      "66fe7ec700255149ac7e368c",
    ],
    status: "ongoing",
  };

  return (
    <div style={{ width: "100%" }}>
      <h2>Trip Information</h2>
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        className="div-shadow"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Collector ID</th>
            <th>Stops</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{tripsElems}</tbody>
      </table>
    </div>
  );
}
