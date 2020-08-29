import React from "react";
import { Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function AccountForms(props) {
  return (
    <section className="hero is-fullheight is-warning is-bold">
      <div className="hero-body">
        <div className="container">
          <Route
            exact
            path="/"
            render={() => (
              <SignIn title="SignIn | SmartBrain" setUser={props.setUser} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <SignUp title="SignUp | SmartBrain" setUser={props.setUser} />
            )}
          />
        </div>
      </div>
    </section>
  );
}
