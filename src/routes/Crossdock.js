import React, { useEffect, useContext, useState } from "react";
import RouteCell from "../components/RouteCell";
import RegularCell from "../components/RegularCell";
import HeaderCell from "../components/HeaderCell";
import LoadingIndicator from "../components/LoadingIndicator";
import ProgressBar from "../components/ProgressBar";
import { SocketServicesContext } from "../context/SocketServicesContext";
import Pagination from "../components/Pagination";
import { UserSessionContext } from "../context/UserSessionContext";

export default function Crossdock() {
  const [dashboardData, setDashboardData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const { requestData, loading } = useContext(SocketServicesContext);
  const { selectedWarehouse, numberOfRowPerPage } =
    useContext(UserSessionContext);

  useEffect(() => {
    requestData("crossdock", setDashboardData, selectedWarehouse);
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
                <HeaderCell title="ROUTE" />
              </th>
              <th>
                <HeaderCell title="SENDING WAREHOUSE" />
              </th>
              <th>
                <HeaderCell title="DISPATCH TIME" />
              </th>
              <th>
                <HeaderCell title="DISPATCHED" />
              </th>
              <th>
                <HeaderCell title="DUE TIME" />
              </th>
              {/* <th>
								<HeaderCell
									title="ARRIVAL TIME"
								/>
							</th> */}
              <th>
                <HeaderCell title="RECEIVED" />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row) => (
              <tr>
                <td>
                  <RouteCell
                    route={row.routeId}
                    backgroundColor={row.gateTimeRgba}
                  />
                </td>
                <td>
                  <RegularCell text={row.origin} />
                </td>
                <td>
                  <RegularCell text={row.dispatchEnd} />
                </td>
                <td>
                  <RegularCell
                    text={row.dispatchTim}
                    backgroundColor={row.outgoingDispatchRgba}
                  />
                </td>
                <td>
                  <RegularCell text={row.arrivalEnd} />
                </td>
                {/* <td>
									<RegularCell
										text= {row.arrivalEnd} 
									/>
								</td> */}
                <td>
                  <RegularCell
                    text={row.received}
                    backgroundColor={row.receivedStatusRgba}
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
