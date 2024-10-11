import React from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import AdminHeader from "./common/AdminHeader";
import CategoryChart from "./charts/CategoryChart";
import DateChart from "./charts/DateChart";
import FloatingButton from "./charts/Button";

function inquiryReport() {
  const generateReport = async () => {
    const res = await axios.get("http://localhost:5000/inquiry/inquiryReport", {
      responseType: "blob",
    });
    saveAs(
      new Blob([res.data], { type: "application/pdf" }),
      "inquiryReport.pdf"
    );
  };

  const handleGenerateReport = () => {
    generateReport();
  };
  return (
    <div>
      <AdminHeader pageName={"Inquiry Report"} />
      <DateChart />
      <CategoryChart />

      {/* Floating Button */}
      <FloatingButton onClick={handleGenerateReport} />
    </div>
  );
}

export default inquiryReport;
