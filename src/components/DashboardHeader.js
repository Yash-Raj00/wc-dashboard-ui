import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { timeZoneOffset } from "../utils";

const DashboardHeader = ({ warehouse }) => {
  const navigate = useNavigate();

  const clockRef = useRef(null);

  const [currentTimeString, setCurrentTimeString] = useState("");

  const navigateToSettings = () => {
    navigate("/dashboard/settings");
  };

  // useEffect(() => {
  //   clockRef.current = setInterval(() => {
  //     const now = new Date();

  //     const currentOffset = timeZoneOffset[warehouse.timeZone] || 0;

  //     // subtract the timezone offset to get the local time
  //     // now.setMinutes(now.getMinutes() - currentOffset * 60);

  //     const hours = now.getHours();
  //     const minutes = now.getMinutes();
  //     const seconds = now.getSeconds();
  //     const month = now.getMonth() + 1;
  //     const day = now.getDate();
  //     const year = now.getFullYear();

  //     const timeString = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

  //     setCurrentTimeString(timeString);
  //   }, 1000);

  //   return () => clearInterval(clockRef.current);
  // }, []);

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-white">
        {warehouse?.warehouseName} {currentTimeString}
      </h1>

      <button
        className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-4"
        onClick={navigateToSettings}
      >
        Settings
      </button>
    </div>
  );
};

export default DashboardHeader;
