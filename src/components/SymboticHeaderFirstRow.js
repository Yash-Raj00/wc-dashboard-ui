import React from "react";
import RegularCell from "./RegularCell";

const SymboticHeaderFirstRow = (props) => {
  const cellProps = {
    ...props,
  };
  const cellWidth = "200px";
  const doubleCellWidth = "402.5px";
  return (
    <>
      <style>
        {`
          .SelectionHeader_container {
            display: flex;
            justify-content: start;
            width: 100%;
            align-items: center;
            padding: 25px 0 25px 10px;
          }
          .SelectionHeader_hr {
            width: 100%;
            height: 0px;
            top: 90px;
            gap: 0px;
            border: 1px 0px 0px 0px;
            opacity: 0px;
            border: 1px solid rgba(80, 80, 80, 1);
          }
        `}
      </style>
      <tr>
        <th>
          <RegularCell cellWidth={cellWidth} />
        </th>
        <th>
          <RegularCell
            {...cellProps}
            text="PUTAWAYS"
            justifyContent="center"
            cellWidth={doubleCellWidth}
          />
        </th>
        <th>
          <RegularCell
            {...cellProps}
            text="REPLENISHMENT"
            justifyContent="center"
            cellWidth={doubleCellWidth}
          />
        </th>
        <th>
          <RegularCell
            {...cellProps}
            text="FORECAST REPLENISHMENT"
            justifyContent="center"
            cellWidth={doubleCellWidth}
          />
        </th>
        <th>
          <RegularCell
            {...cellProps}
            text="MOVEMENT"
            justifyContent="center"
            cellWidth={doubleCellWidth}
          />
        </th>
      </tr>
    </>
  );
};

export default SymboticHeaderFirstRow;
