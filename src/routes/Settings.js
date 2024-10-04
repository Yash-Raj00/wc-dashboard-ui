import React, { useContext, useEffect, useState, useRef } from "react";
import { UserSessionContext } from "../context/UserSessionContext";
import { ApiContext } from "../context/ApiContext";
import Select from "react-dropdown-select";
import { allTabs, INTERVAL_OPTIONS } from "../constants";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const [countdown, setCountdown] = useState(5);
  const [launchTimeout, setLaunchTimeout] = useState(false);
  // const [selectedTabs, setSelectedTabs] = useState(
  //   new Map([
  //     ["Selection", true],
  //     ["Loading", true],
  //     ["Crossdock", true],
  //     ["Symbotic", true],
  //   ])
  // );
  const [selectionTab, setSelectionTab] = useState(true);
  const [loadingTab, setLoadingTab] = useState(true);
  const [crossdockTab, setCrossdockTab] = useState(true);
  const [symboticTab, setSymboticTab] = useState(true);

  const {
    selectedWarehouse,
    setSelectedWarehouse,
    setNumberOfRowPerPage,
    pageChangeIntervalInMs,
    setPageChangeIntervalInMs,
    // setSelectedTabsToDisplay,
    setAutoTabSwitch,
    saveSettingsToLocalStorage,
    setSelection,
    setLoading,
    setCrossdock,
    setSymbotic,
  } = useContext(UserSessionContext);

  const { warehouses } = useContext(ApiContext);
  const [tempSelectedWarehouse, setTempSelectedWarehouse] =
    useState(selectedWarehouse);
  const [tempRowNumber, setTempRowNumber] = useState(5);
  const [tempPageChangeInterval, setTempPageChangeInterval] = useState(
    pageChangeIntervalInMs
  );

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings"));
    if (settings && settings.selectedWarehouse) {
      setTempSelectedWarehouse(settings.selectedWarehouse);
      setTempPageChangeInterval(settings.pageChangeIntervalInMs);
      setTempRowNumber(settings.numberOfRowPerPage);
      // setSelectedTabs(settings.selectedTabsToDisplay);
      setSelectionTab(settings.selectionPage);
      setLoadingTab(settings.loadingPage);
      setCrossdockTab(settings.crossdockPage);
      setSymboticTab(settings.symboticPage);
    }
  }, []);

  const handleWarehouseChange = (selectedWhDcId) => {
    const warehouse = warehouses.find((wh) => wh.value === selectedWhDcId);
    setTempSelectedWarehouse(warehouse);
  };

  // Submit settings and navigate to the dashboard
  const navigateToDashboard = () => {
    // let firstSelectedTab;
    // for (const [tab, selected] of selectedTabs) {
    //   if (selected) {
    //     firstSelectedTab = tab;
    //     break;
    //   }
    // }
    navigate(`/dashboard/${selectionTab ? "selection" : loadingTab ? "loading" : crossdockTab ? "crossdock" : symboticTab ? "symbotic" : "selection"}`);
  };

  const handleSubmit = () => {
    if (!tempSelectedWarehouse) {
      alert("Please select a warehouse");
      return;
    }

    const autoTabSwitch = tempPageChangeInterval > 0;

    if (!selectionTab && !loadingTab && !crossdockTab && !symboticTab) {
      alert("Please select at least one tab to display");
      return;
    }
    // setSelectedTabsToDisplay(selectedTabs);
    setNumberOfRowPerPage(tempRowNumber);
    setPageChangeIntervalInMs(tempPageChangeInterval);
    setSelectedWarehouse(tempSelectedWarehouse);
    setAutoTabSwitch(autoTabSwitch);
    
    setSelection(selectionTab),
    setLoading(loadingTab),
    setCrossdock(crossdockTab),
    setSymbotic(symboticTab),

    saveSettingsToLocalStorage({
      selectedWarehouse: tempSelectedWarehouse,
      pageChangeIntervalInMs: tempPageChangeInterval,
      numberOfRowPerPage: tempRowNumber,
      autoTabSwitch,
      // selectedTabsToDisplay: selectedTabs,
      selectionPage: selectionTab,
      loadingPage: loadingTab,
      crossdockPage: crossdockTab,
      symboticPage: symboticTab,
    });

    navigateToDashboard();
  };

  useEffect(() => {
    if (tempSelectedWarehouse) {
      setLaunchTimeout(true);
      setCountdown(5);

      intervalRef.current = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            handleSubmit();
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      setLaunchTimeout(false);
    };
  }, [tempSelectedWarehouse]);

  useEffect(() => {
    if (launchTimeout) {
      const cancelAutoLaunch = () => {
        clearInterval(intervalRef.current);
        setLaunchTimeout(false);
        setCountdown(5);
      };

      window.addEventListener("mousemove", cancelAutoLaunch);
      window.addEventListener("mousedown", cancelAutoLaunch);
      window.addEventListener("keydown", cancelAutoLaunch);

      return () => {
        window.removeEventListener("mousemove", cancelAutoLaunch);
        window.removeEventListener("mousedown", cancelAutoLaunch);
        window.removeEventListener("keydown", cancelAutoLaunch);
      };
    }
  }, [launchTimeout]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Warehouse Selection */}
      <div className="relative ml-4 mt-5 w-1/3">
        Warehouse:
        <Select
          searchable={false}
          values={tempSelectedWarehouse ? [tempSelectedWarehouse] : []}
          options={warehouses}
          labelField="text"
          valueField="value"
          onChange={(values) => handleWarehouseChange(values?.[0]?.value)}
          placeholder="Select Warehouse"
          style={{
            color: "black",
            backgroundColor: "#fff",
            minWidth: 180,
            height: 50,
            paddingRight: 8,
            paddingLeft: 8,
            paddingTop: 12,
            paddingBottom: 12,
            borderRadius: ".25rem",
          }}
        />
      </div>

      {/* Rows Input */}
      <div className="relative ml-4 mt-5">
        Number of Rows to display:
        <input
          id="rows-input"
          type="number"
          className="block w-1/3 p-2 border rounded text-black pr-8"
          value={tempRowNumber}
          onChange={(e) => {
            if (e.target.value < 1) return;
            setTempRowNumber(e.target.value);
          }}
          placeholder="Rows"
        />
      </div>

      {/* Interval Input */}
      <div className="relative ml-4 mt-5 w-1/3">
        Page rotation interval:
        <Select
          searchable={false}
          options={INTERVAL_OPTIONS}
          values={[
            INTERVAL_OPTIONS.find(
              (item) => item.value == pageChangeIntervalInMs
            ),
          ]}
          labelField="text"
          valueField="value"
          onChange={(values) => setTempPageChangeInterval(values?.[0]?.value)}
          placeholder="Select Interval"
          style={{
            color: "black",
            backgroundColor: "#fff",
            minWidth: 180,
            height: 50,
            paddingRight: 8,
            paddingLeft: 8,
            paddingTop: 12,
            paddingBottom: 12,
            borderRadius: ".25rem",
          }}
        />
      </div>

      {/* Tabs Selection */}
      <div className="relative ml-4 mt-5 w-1/3">
        Select Tabs:
        <div className="flex gap-5">
            <span>
              <input
                className="cursor-pointer"
                type="checkbox"
                id={"Selection"}
                checked={selectionTab}
                onChange={() => setSelectionTab(!selectionTab)}
              />
              <label className="ml-1 cursor-pointer" htmlFor={"Selection"}>
                {"Selection"}
              </label>
            </span>
            <span>
              <input
                className="cursor-pointer"
                type="checkbox"
                id={"Loading"}
                checked={loadingTab}
                onChange={() => setLoadingTab(!loadingTab)}
              />
              <label className="ml-1 cursor-pointer" htmlFor={"Loading"}>
                {"Loading"}
              </label>
            </span>
            <span>
              <input
                className="cursor-pointer"
                type="checkbox"
                id={"Crossdock"}
                checked={crossdockTab}
                onChange={() => setCrossdockTab(!crossdockTab)}
              />
              <label className="ml-1 cursor-pointer" htmlFor={"Crossdock"}>
                {"Crossdock"}
              </label>
            </span>
            <span>
              <input
                className="cursor-pointer"
                type="checkbox"
                id={"Symbotic"}
                checked={symboticTab}
                onChange={() => setSymboticTab(!symboticTab)}
              />
              <label className="ml-1 cursor-pointer" htmlFor={"Symbotic"}>
                {"Symbotic"}
              </label>
            </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-4 mt-5"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {/* Countdown message */}
      {launchTimeout && countdown > 0 && (
        <p className="ml-4 mt-2 text-gray-600">
          App will launch in {countdown} second{countdown > 1 ? "s" : ""} unless
          you interact...
        </p>
      )}
    </div>
  );
};

export default Settings;




                // onChange={(e) => {
                //   setSelectedTabs((prev) => {
                //     const newMap = new Map(prev);
                //     newMap.set(tab, e.target.checked);
                //     return newMap;
                //   });
                // }}