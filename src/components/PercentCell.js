import React from "react";
import BackgroundCell from "./BackgroundCell";
import chroma from "chroma-js";

const PercentCell = ({ cellWidth, percent, backgroundColor }) => (
  <BackgroundCell cellWidth={cellWidth}>
    {percent > 0 && (
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          paddingLeft: "10px",
          height: "100%",
          width: `${percent < 18 && percent > 0 ? 18 : percent}${
            percent > 0 ? `%` : ``
          }`,
          borderRadius: "9.98px",
          backgroundColor: backgroundColor || "rgba(53, 53, 53, 1)",
          fontWeight: "bold",
          fontSize: "1rem",
          color: chroma.contrast(backgroundColor, "#fff") > 5 ? "#fff" : "#000",
        }}
      >
        {percent}
        {percent > 0 ? `%` : ``}
      </div>
    )}
  </BackgroundCell>
);

export default PercentCell;
