import React from "react";
import { Link } from "react-router-dom";

export default function AccountButtons() {
  return (
    <div className="buttons navbar-item">
      <Link
        to="/signup"
        title="SignUp | SmartBrain"
        className="button is-danger"
      >
        <strong>Sign up</strong>
      </Link>
      <Link
        to="/"
        title="SignIn | SmartBrain"
        className="button is-dark is-outlined"
      >
        Sign in
      </Link>
    </div>
  );
}
