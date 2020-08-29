import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Navbar from "./Navbar";
import AccountButtons from "./AccountButtons";

export default function AccountForms(props) {
  return (
    <Fragment>
      <Navbar>
        <AccountButtons />
      </Navbar>
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
    </Fragment>
  );
}
