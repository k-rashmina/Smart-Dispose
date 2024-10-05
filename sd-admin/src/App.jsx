import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AdminLayout from "./components/common/AdminLayout";
import AdminPanel from "./components/common/AdminPanel";
import InquiryReport from "./components/inquiryReport";
import ProfileReport from "./components/profileReport";
import Customers from "./components/Customers";
import Schedules from "./components/Schedules";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route
          element={
            <AdminLayout page={"Inquiry"} menu={["Report"]}></AdminLayout>
          }
        >
          <Route path="admin/inquiry/report" element={<InquiryReport />} />
        </Route>

        <Route
          element={
            <AdminLayout
              page={"Bin"}
              menu={["Customers", "Schedules"]}
            ></AdminLayout>
          }
        >
          <Route path="admin/bin/customers" element={<Customers />} />
          <Route path="admin/bin/schedules" element={<Schedules />} />
        </Route>

        <Route
          element={
            <AdminLayout page={"Profile"} menu={["Report"]}></AdminLayout>
          }
        >
          <Route path="admin/profile/report" element={<ProfileReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
