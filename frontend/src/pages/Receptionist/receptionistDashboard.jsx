import React from "react";
import Sidebar from '../../components/receptionist/sidebar/sidebar.jsx';
import Body from "../../components/receptionist/content/Body.jsx";

export default function ReceptionistDashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <Body />
    </div>
  );
}