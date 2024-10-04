import React, { createContext, useState } from "react";
import axios from "axios";

export const ApiContext = createContext();

const dummyWarehouseData = [
  {
    dcId: 1,
    warehouseId: 1,
    warehouseName: "Brattleboro GDC",
    schemaName: "gg_exe_brat",
    timeZone: "est",
    suiFacility: "1",
    wcWarehouseId: "1",
    hasSymbotic: "N",
  },
  {
    dcId: 25,
    warehouseId: 1,
    warehouseName: "RR GDC & GMHBC",
    schemaName: "gg_exe_houst",
    timeZone: "cst",
    suiFacility: "2501",
    wcWarehouseId: "2501",
    hasSymbotic: "N",
  },
  {
    dcId: 96,
    warehouseId: 1,
    warehouseName: "Plant City FDC",
    schemaName: "gg_exe_pcity",
    timeZone: "est",
    suiFacility: "9601",
    wcWarehouseId: "82",
    hasSymbotic: "N",
  },
  {
    dcId: 1,
    warehouseId: 2,
    warehouseName: "Brattleboro FDC",
    schemaName: "gg_exe_brat",
    timeZone: "est",
    suiFacility: "1",
    wcWarehouseId: "2",
    hasSymbotic: "N",
  },
  {
    dcId: 25,
    warehouseId: 2,
    warehouseName: "Holcomb PDC FDC",
    schemaName: "gg_exe_houst",
    timeZone: "cst",
    suiFacility: "2502",
    wcWarehouseId: "2502",
    hasSymbotic: "N",
  },
  {
    dcId: 25,
    warehouseId: 3,
    warehouseName: "Coppell PDC",
    schemaName: "gg_exe_houst",
    timeZone: "cst",
    suiFacility: "2503",
    wcWarehouseId: "2503",
    hasSymbotic: "N",
  },
  {
    dcId: 13,
    warehouseId: 13,
    warehouseName: "Westfield FDC",
    schemaName: "gg_exe_wfd",
    timeZone: "est",
    suiFacility: "8",
    wcWarehouseId: "08",
    hasSymbotic: "N",
  },
  {
    dcId: 14,
    warehouseId: 14,
    warehouseName: "North Hatfield",
    schemaName: "gg_exe_nhat",
    timeZone: "est",
    suiFacility: "14",
    wcWarehouseId: "14",
    hasSymbotic: null,
  },
  {
    dcId: 23,
    warehouseId: 23,
    warehouseName: "Aberdeen",
    schemaName: "gg_exe_aber",
    timeZone: "est",
    suiFacility: "23",
    wcWarehouseId: "23",
    hasSymbotic: "N",
  },
  {
    dcId: 24,
    warehouseId: 24,
    warehouseName: "Windsor GDC",
    schemaName: "gg_exe_wlk",
    timeZone: "est",
    suiFacility: "20",
    wcWarehouseId: "20",
    hasSymbotic: "Y",
  },
  {
    dcId: 96,
    warehouseId: 40,
    warehouseName: "Plant City GDC",
    schemaName: "gg_exe_pcity",
    timeZone: "est",
    suiFacility: "9640",
    wcWarehouseId: "59",
    hasSymbotic: "N",
  },
  {
    dcId: 78,
    warehouseId: 78,
    warehouseName: "NEMD",
    schemaName: "gg_exe_nemd",
    timeZone: "est",
    suiFacility: "78",
    wcWarehouseId: "78",
    hasSymbotic: "N",
  },
  {
    dcId: 96,
    warehouseId: 87,
    warehouseName: "Plant City PDC",
    schemaName: "gg_exe_pcity",
    timeZone: "est",
    suiFacility: "9687",
    wcWarehouseId: "80",
    hasSymbotic: "N",
  },
  {
    dcId: 22,
    warehouseId: 88,
    warehouseName: "BETH IV GMHBC",
    schemaName: "beth_exebeth",
    timeZone: "est",
    suiFacility: "88",
    wcWarehouseId: "88",
    hasSymbotic: "N",
  },
  {
    dcId: 84,
    warehouseId: 91,
    warehouseName: "PNW(TDALE)GD PD",
    schemaName: "gg_exe_tdale",
    timeZone: "pst",
    suiFacility: "8491",
    wcWarehouseId: "8491",
    hasSymbotic: "N",
  },
  {
    dcId: 84,
    warehouseId: 92,
    warehouseName: "PNW (MIL) FDC",
    schemaName: "gg_exe_tdale",
    timeZone: "pst",
    suiFacility: "8492",
    wcWarehouseId: "8492",
    hasSymbotic: "N",
  },
];

export const ApiContextProvider = ({ children }) => {
  const baseUri = window?.__ENV?.SERVER_URL || process.env.SERVER_URL;

  const [warehouses, setWarehouses] = useState([]);

  const getWarehouses = async () => {
    try {
      const response = await axios.get(`${baseUri}/wc/dashboard/v1/warehouses`);
      console.log("🚀 ~ getWarehouses ~ response:", response);
      if (response.data.success) {
        const warehouses = response.data.data.map((wh) => ({
          ...wh,
          timeZone: wh.timeZone.toUpperCase(),
          text: `${wh.warehouseName} (${wh.timeZone.toUpperCase()})`,
          value: `${wh.warehouseId}-${wh.dcId}`,
        }));

        // sort warehouses by warehouseName
        setWarehouses(
          warehouses.sort((a, b) =>
            a.warehouseName.localeCompare(b.warehouseName)
          )
        );
      } else {
        setWarehouses([]);
        console.error("Failed to fetch warehouses");
      }
    } catch (error) {
      setWarehouses(
        dummyWarehouseData.map((wh) => ({
          ...wh,
          text: `${wh.warehouseName} (${wh.timeZone.toUpperCase()})`,
          value: `${wh.warehouseId}-${wh.dcId}`,
        }))
      );
      console.error("Error fetching warehouses:", error.message || error);
    }
  };

  return (
    <ApiContext.Provider value={{ warehouses, getWarehouses }}>
      {children}
    </ApiContext.Provider>
  );
};
