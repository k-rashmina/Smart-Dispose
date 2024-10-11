import React from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import AdminHeader from "./common/AdminHeader";
import "./styles/profileReport.css";

function ProfileReport() {
  const generateReport = async () => {
    try {
      const res = await axios.get("http://localhost:5000/customer/customerReport", {
        responseType: "blob",
      });
      saveAs(new Blob([res.data], { type: "application/pdf" }), "customerReport.pdf");
    } catch (error) {
      console.error("Error generating report", error);
    }
  };

  const handleGenerateReport = () => {
    generateReport();
  };

  return (
    <div>
      <AdminHeader pageName={"Profile Report"} />
      
      {/* Updated Header */}
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        Generate Customer Report Here:
      </h2>

      {/* Custom Button with CSS Class */}
      <button className="f-btn" onClick={handleGenerateReport}>
        Generate Customer Report
      </button>
    </div>
  );
}

export default ProfileReport;
