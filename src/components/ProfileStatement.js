import React from "react";
import "../css/ProfileStatement.css";

export default function ProfileStatement({ name, submissions }) {
  return (
    <h1 className="has-text-centered is-size-3 has-text-black statement">
      {name}, your image submissions are {submissions}!
    </h1>
  );
}
