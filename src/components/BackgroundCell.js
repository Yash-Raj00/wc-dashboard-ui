import React from "react";

const BackgroundCell = ({
  children,
  cellHeight = "67.2px",
  cellWidth = "277px",
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      height: cellHeight,
      width: cellWidth,
      borderRadius: "9.98px",
      backgroundColor: "rgba(53, 53, 53, 1)",
    }}
  >
    {children}
  </div>
);

export default BackgroundCell;
