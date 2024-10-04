import React from "react";
import BackgroundCell from "./BackgroundCell";
import chroma from "chroma-js";

const RouteCell = ({ cellWidth, backgroundColor, route }) => (
  <BackgroundCell cellWidth={cellWidth}>
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        width: "100%",
        borderRadius: "9.98px",
        backgroundColor: backgroundColor || "rgba(53, 53, 53, 1)",
        fontWeight: "bold",
        paddingRight: "10px",
        fontSize: "1.25rem",
        color: !backgroundColor
          ? "#fff"
          : chroma.contrast(backgroundColor, "#fff") >= 5
          ? "#fff"
          : "#000",
      }}
    >
      {route}
    </div>
  </BackgroundCell>
);

export default RouteCell;
