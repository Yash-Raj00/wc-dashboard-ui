import React from "react";
import HeaderCell from "../components/HeaderCell";

const SelectionHeader = (props) => (
  <tr>
    <th>
      <HeaderCell title="ROUTE" />
    </th>
    <th>
      <HeaderCell title="SYMBOTIC" />
    </th>
    <th>
      <HeaderCell title="CONVENTIONAL" />
    </th>
    <th>
      <HeaderCell title="RESELECTS" />
    </th>
    <th>
      <HeaderCell title="FULL PALLET" />
    </th>
    <th>
      <HeaderCell title="REPACK" />
    </th>
    <th>
      <HeaderCell title="TOBACCO" />
    </th>
  </tr>
);

export default SelectionHeader;
