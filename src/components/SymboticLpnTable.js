import React from "react";

import RegularCell from "./RegularCell";
import SymboticLpnHeader from "./SymboticLpnHeader";

function SymboticLpnTable({ data }) {
  const sortedData = data?.sort((a, b) => a?.priority - b?.priority);

  return (
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
              <SymboticLpnHeader />
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index} style={{ display: "block" }}>
                <td>
                  <RegularCell text={row.lpn} justifyContent="center" />
                </td>
                <td>
                  <RegularCell
                    text={row.itemDescription}
                    justifyContent="center"
                    cellWidth={"554px"}
                  />
                </td>
                <td>
                  <RegularCell
                    text={row.replenPallets}
                    justifyContent="center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SymboticLpnTable;
