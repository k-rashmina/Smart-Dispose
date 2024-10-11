import React from "react";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  // Define common card style as an object
  const cardStyle = {
    width: "400px",
    height: "250px",
    backgroundColor: "#1DB954",
    color: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  // Define hover effect with a scaling popup
  const hoverStyle = {
    transform: "scale(1.1)", // Slightly scale the card
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)", // Add a larger shadow
  };

  return (
    <div className="adminPanelImg">
      {/* Header */}
      <div
        className="row me-5 ps-5 pe-5"
        style={{
          position: "relative",
          backgroundColor: "#1DB954",
          width: "100%",
          height: "70px",
          textAlign: "center",
          color: "#fff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          fontSize: "36px",
        }}
      >
        <h1>Smart Dispose - Admin Portal</h1>
      </div>

      {/* Cards */}
      <div className="d-flex flex-wrap justify-content-between ps-5 pe-5 ms-5 me-5 pt-5">
        <Link to={"inquiry/report"} style={{ textDecoration: "none" }}>
          <div
            className="card div-shadow"
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h1 style={{ fontSize: "56px" }}>Inquiry</h1>
          </div>
        </Link>

        <Link to={"bin/customers"} style={{ textDecoration: "none" }}>
          <div
            className="card div-shadow"
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h1 style={{ fontSize: "56px" }}>Bins</h1>
          </div>
        </Link>

        <Link to={"profile/report"} style={{ textDecoration: "none" }}>
          <div
            className="card div-shadow"
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h1 style={{ fontSize: "56px" }}>Profile</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
