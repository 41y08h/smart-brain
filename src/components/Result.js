import React from "react";
import "../css/Result.css";

export default function Result({ imageURL, faceBoxes }) {
  return (
    <div className="result-box">
      <img id="resultImage" src={imageURL} width="380px" height="auto" alt="" />
      {faceBoxes.map((box) => {
        return (
          <div
            key={box.top_row * box.right_col}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
              fontSize: "8rem",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          ></div>
        );
      })}
    </div>
  );
}
