import React, { createContext, useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { INTERVAL_OPTIONS } from "../constants";

export const UserSessionContext = createContext();

export const UserSessionContextProvider = ({ children }) => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const [totalPageNo, setTotalPageNo] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [dashboardData, setDashboardData] = useState([]);
  const [autoTabSwitch, setAutoTabSwitch] = useState(true);
  const [pageChangeIntervalInMs, setPageChangeIntervalInMs] = useState(INTERVAL_OPTIONS[5].value);
  const [numberOfRowPerPage, setNumberOfRowPerPage] = useState(5);
  const [selectedTabsToDisplay, setSelectedTabsToDisplay] = useState(["Selection", "Loading", "Crossdock", "Symbotic"]);

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings"));
    if (settings) {
      console.log("settings loaded", settings);
      setSelectedWarehouse(settings.selectedWarehouse);
      setAutoTabSwitch(settings.autoTabSwitch);
      setPageChangeIntervalInMs(settings.pageChangeIntervalInMs);
      setNumberOfRowPerPage(settings.numberOfRowPerPage);
    }
  }, []);

  const saveSettingsToLocalStorage = (settingsToSave) => {
    localStorage.setItem("settings", JSON.stringify(settingsToSave));
  };

  return (
    <UserSessionContext.Provider
      value={{
        selectedWarehouse,
        setSelectedWarehouse,
        totalPageNo,
        setTotalPageNo,
        currentPageNo,
        setCurrentPageNo,
        dashboardData,
        setDashboardData,
        autoTabSwitch,
        setAutoTabSwitch,
        pageChangeIntervalInMs,
        setPageChangeIntervalInMs,
        numberOfRowPerPage,
        setNumberOfRowPerPage,
        selectedTabsToDisplay,
        setSelectedTabsToDisplay,
        saveSettingsToLocalStorage,
        screenHeight,
        screenWidth,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};
