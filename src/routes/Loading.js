import React, { useEffect, useContext, useState } from "react";
import RouteCell from "../components/RouteCell";
import PercentCell from "../components/PercentCell";
import HeaderCell from "../components/HeaderCell";
import ProgressBar from "../components/ProgressBar";
import LoadingIndicator from "../components/LoadingIndicator";
import { SocketServicesContext } from "../context/SocketServicesContext";
import Pagination from "../components/Pagination";
import { UserSessionContext } from "../context/UserSessionContext";

export default function Loading() {
  const [dashboardData, setDashboardData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const { selectedWarehouse, numberOfRowPerPage } =
    useContext(UserSessionContext);
  const { requestData, loading } = useContext(SocketServicesContext);

  useEffect(() => {
    requestData("loading", setDashboardData, selectedWarehouse);
  }, [selectedWarehouse]);

  return loading ? (
    <LoadingIndicator />
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1, overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            height: "100%",
            marginTop: 10,
          }}
        >
          <thead>
            <tr>
              <th>
                <HeaderCell title="GATE TIME" />
              </th>
              <th>
                <HeaderCell title="ROUTE" />
              </th>
              <th>
                <HeaderCell title="SELECTION" />
              </th>
              <th>
                <HeaderCell title="CROSSDOCK" />
              </th>
              <th>
                <HeaderCell title="LOADING" />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row) => (
              <tr>
                <td>
                  <RouteCell route={row.formattedDepartTime} />
                </td>
                <td>
                  <RouteCell
                    route={row.routeId}
                    backgroundColor={row.gateTimeRgba}
                  />
                </td>
                <td>
                  <PercentCell
                    backgroundColor={row.selectionRgba}
                    percent={
                      parseInt(row.totalCaseQuantity, 10) === 0
                        ? 0
                        : Math.floor(
                            (parseInt(row.completeCaseQuantity, 10) /
                              parseInt(row.totalCaseQuantity, 10)) *
                              100
                          )
                    }
                  />
                </td>

                <td>
                  <RouteCell route="" backgroundColor={row.crossdockRgba} />
                </td>
                <td>
                  <PercentCell
                    backgroundColor={row.loadingRgba}
                    percent={
                      parseInt(row.totalPallets, 10) === 0
                        ? 0
                        : Math.floor(
                            (parseInt(row.loadedPallets, 10) /
                              parseInt(row.totalPallets, 10)) *
                              100
                          )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        data={dashboardData}
        itemsPerPage={numberOfRowPerPage}
        onPageChange={setCurrentItems}
      />
      <ProgressBar timerActive={!loading} />
    </div>
  );
}
