import React from "react";
import RegularCell from "./RegularCell";

const SymboticHeader = (props) => {
  const cellProps = {
    ...props,
  };

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
          <RegularCell {...cellProps} />
        </th>
        <th>
          <RegularCell {...cellProps} />
        </th>
        <th>
          <RegularCell
            {...cellProps}
            text="AIB PALLETS"
            justifyContent="center"
          />
        </th>
        <th>
          <RegularCell {...cellProps} />
        </th>
        <th>
          <RegularCell
            {...cellProps}
            text="AIB PALLETS"
            justifyContent="center"
          />
        </th>
        <th>
          <RegularCell {...cellProps} />
        </th>
        <th>
          <RegularCell
            {...cellProps}
            text="AIB PALLETS"
            justifyContent="center"
          />
        </th>
        <th>
          <RegularCell {...cellProps} />
        </th>
        <th>
          <RegularCell
            {...cellProps}
            text="AIB PALLETS"
            justifyContent="center"
          />
        </th>
      </tr>
    </>
  );
};

export default SymboticHeader;
