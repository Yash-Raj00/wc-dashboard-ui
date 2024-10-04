import React from "react";

const HeaderCell = ({ title }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      lineHeight: "1.5rem",
      fontSize: "20px",
      fontWeight: "bold",
      paddingBottom: "25px",
    }}
  >
    {title}
  </div>
);

export default HeaderCell;
