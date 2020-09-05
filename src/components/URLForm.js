import React, { useState } from "react";

export default function URLForm({ recogniseImage, isDetecting }) {
  const [URL, setURL] = useState("");
  return (
    <div className="field has-addons image-url-field">
      <div className="control">
        <input
          className="input is-medium"
          type="text"
          placeholder="Enter an image url"
          onChange={(e) => {
            setURL(e.target.value);
          }}
        />
      </div>
      <div className="control">
        <button
          className={
            "button is-dark is-medium" + (isDetecting ? " is-loading" : "")
          }
          onClick={() => {
            recogniseImage(URL);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
