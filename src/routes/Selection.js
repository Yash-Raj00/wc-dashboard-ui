import React, { useEffect, useContext, useState } from "react";
import SelectionHeader from "../components/SelectionHeader";
import RouteCell from "../components/RouteCell";
import PercentCell from "../components/PercentCell";
import RegularCell from "../components/RegularCell";
import ProgressBar from "../components/ProgressBar";
import LoadingIndicator from "../components/LoadingIndicator";
import Pagination from "../components/Pagination";
import { SocketServicesContext } from "../context/SocketServicesContext";
import { UserSessionContext } from "../context/UserSessionContext";

export default function Selection() {
  const [dashboardData, setDashboardData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const { selectedWarehouse, numberOfRowPerPage, screenWidth } =
    useContext(UserSessionContext);
  const { requestData, loading } = useContext(SocketServicesContext);

  useEffect(() => {
    requestData("selection", setDashboardData, selectedWarehouse);
  }, [selectedWarehouse]);

  // calculate column width based on screen width 7 columns
  const columnWidth = (screenWidth - 65) / 7;

  return loading ? (
    <LoadingIndicator />
  ) : (
    <div
      style={{
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "5px",
          marginTop: 10,
        }}
      >
        <thead>
          <SelectionHeader />
        </thead>
        <tbody>
          {currentItems.map((row, index) => (
            <tr key={index}>
              <td>
                <RouteCell
                  cellWidth={columnWidth}
                  route={row.routeId}
                  backgroundColor={row.gateTimeRgba}
                />
              </td>
              <td>
                <PercentCell
                  cellWidth={columnWidth}
                  backgroundColor={row.selectionSymRgba}
                  percent={
                    parseInt(row.totalSymCaseQty, 10) === 0 &&
                    parseInt(row.completeSymCaseQty, 10) === 0
                      ? ` `
                      : `${Math.floor(
                          (parseInt(row.completeSymCaseQty, 10) /
                            parseInt(row.totalSymCaseQty, 10)) *
                            100
                        )}`
                  }
                />
              </td>
              <td>
                <PercentCell
                  cellWidth={columnWidth}
                  backgroundColor={row.selectionConvRgba}
                  percent={
                    parseInt(row.totalConvCaseQty, 10) === 0 &&
                    parseInt(row.completeConvCaseQty, 10) === 0
                      ? ` `
                      : `${Math.floor(
                          (parseInt(row.completeConvCaseQty, 10) /
                            parseInt(row.totalConvCaseQty, 10)) *
                            100
                        )}`
                  }
                />
              </td>
              <td>
                <RegularCell
                  cellWidth={columnWidth}
                  backgroundColor={row.reselectRgba}
                  text={
                    parseInt(row.totalReselectCaseQty, 10) < 1
                      ? ` `
                      : parseInt(row.totalReselectCaseQty, 10)
                  }
                />
              </td>
              <td>
                <PercentCell
                  cellWidth={columnWidth}
                  backgroundColor={row.palletselectRgba}
                  percent={
                    parseInt(row.totalPalletselectCaseQty, 10) === 0 &&
                    parseInt(row.completePalletselectCaseQty, 10) === 0
                      ? ` `
                      : `${Math.floor(
                          (parseInt(row.completePalletselectCaseQty, 10) /
                            parseInt(row.totalPalletselectCaseQty, 10)) *
                            100
                        )}`
                  }
                />
              </td>
              <td>
                <PercentCell
                  cellWidth={columnWidth}
                  backgroundColor={row.repackRgba}
                  percent={
                    parseInt(row.totalRepackCaseQty, 10) === 0 &&
                    parseInt(row.completeRepackCaseQty, 10) === 0
                      ? ` `
                      : `${Math.floor(
                          (parseInt(row.completeRepackCaseQty, 10) /
                            parseInt(row.totalRepackCaseQty, 10)) *
                            100
                        )}`
                  }
                />
              </td>
              <td>
                <PercentCell
                  cellWidth={columnWidth}
                  backgroundColor={row.tobaccoRgba}
                  percent={
                    parseInt(row.totalTobaccoCaseQty, 10) === 0 &&
                    parseInt(row.completeTobaccoCaseQty, 10) === 0
                      ? ` `
                      : `${Math.floor(
                          (parseInt(row.completeTobaccoCaseQty, 10) /
                            parseInt(row.totalTobaccoCaseQty, 10)) *
                            100
                        )}`
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        data={dashboardData}
        itemsPerPage={numberOfRowPerPage}
        onPageChange={setCurrentItems}
      />
      <ProgressBar timerActive={!loading} />
    </div>
  );
}
