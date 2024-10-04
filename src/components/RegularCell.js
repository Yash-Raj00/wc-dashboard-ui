import React from "react";
import BackgroundCell from "./BackgroundCell";
import chroma from "chroma-js";

const RegularCell = ({
  backgroundColor,
  text,
  justifyContent = "flex-end",
  cellHeight,
  cellWidth,
  style,
}) => (
  <BackgroundCell cellHeight={cellHeight} cellWidth={cellWidth}>
    <div
      style={{
        display: "flex",
        justifyContent: justifyContent,
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
        ...style,
      }}
    >
      {text}
    </div>
  </BackgroundCell>
);

export default RegularCell;
