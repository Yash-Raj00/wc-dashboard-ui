import React, { useRef, useEffect, useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import { UserSessionContext } from "../context/UserSessionContext";
import { SocketServicesContext } from "../context/SocketServicesContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const timerRef = useRef(null);

  const {
    selectedWarehouse,
    currentPageNo,
    totalPageNo,
    autoTabSwitch,
    pageChangeIntervalInMs,
    selectionPage,
    loadingPage,
    crossdockPage,
    symboticPage,
  } = useContext(UserSessionContext);

  const { loading } = useContext(SocketServicesContext);

  useEffect(() => {
    if (
      !loading &&
      autoTabSwitch &&
      currentPageNo === totalPageNo &&
      pageChangeIntervalInMs > 0
    ) {
      const currentPath = window.location.pathname;

      const navigateToNextTab = () => {
        if (currentPath.includes("selection")) {
          if(loadingPage) navigate(`/dashboard/loading`);
          else if(crossdockPage) navigate(`/dashboard/crossdock`);
          else if(symboticPage) navigate(`/dashboard/symbotic`);
        } else if (currentPath.includes("loading")) {
          if(crossdockPage) navigate(`/dashboard/crossdock`);
          else if(symboticPage) navigate(`/dashboard/symbotic`);
          else if(selectionPage) navigate(`/dashboard/selection`);          
        } else if (currentPath.includes("crossdock")) {
          if(symboticPage) navigate(`/dashboard/symbotic`);
          else if(selectionPage) navigate(`/dashboard/selection`);
          else if(loadingPage) navigate(`/dashboard/loading`);
        } else if (currentPath.includes("symbotic")) {
          if(selectionPage) navigate(`/dashboard/selection`);
          else if(loadingPage) navigate(`/dashboard/loading`);
          else if(crossdockPage) navigate(`/dashboard/crossdock`);
        }
        else navigate(`/dashboard/${currentPath.split("/").pop()}`);
      };

      timerRef.current = setTimeout(
        navigateToNextTab,
        pageChangeIntervalInMs * 1000
      );

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [
    currentPageNo,
    totalPageNo,
    loading,
    autoTabSwitch,
    pageChangeIntervalInMs,
    navigate,
  ]);

  return (
    <div className="flex flex-col">
      <DashboardHeader warehouse={selectedWarehouse} />

      {/* Conditional Tabs */}
      {selectedWarehouse && (
        <div className="flex space-x-4 mb-4">
          {selectionPage && (
            <NavLink
              to="selection"
              className={({ isActive }) =>
                isActive
                  ? "px-8 py-2 rounded-lg bg-green-600 text-white font-bold"
                  : "px-8 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700"
              }
            >
              SELECTION
            </NavLink>
          )}
          {loadingPage && (
            <NavLink
              to="loading"
              className={({ isActive }) =>
                isActive
                  ? "px-8 py-2 rounded-lg bg-green-600 text-white font-bold"
                  : "px-8 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700"
              }
            >
              LOADING
            </NavLink>
          )}
          {crossdockPage && (
            <NavLink
              to="crossdock"
              className={({ isActive }) =>
                isActive
                  ? "px-8 py-2 rounded-lg bg-green-600 text-white font-bold"
                  : "px-8 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700"
              }
            >
              CROSSDOCK
            </NavLink>
          )}
          {symboticPage && (
            <NavLink
              to="symbotic"
              className={({ isActive }) =>
                isActive
                  ? "px-8 py-2 rounded-lg bg-green-600 text-white font-bold"
                  : "px-8 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700"
              }
            >
              SYMBOTIC
            </NavLink>
          )}
        </div>
      )}
      {/* Outlet for Tab Screens */}
      <div className="w-full">
        <Outlet /> {/* Render the selected tab's content */}
      </div>
    </div>
  );
};

export default Dashboard;
