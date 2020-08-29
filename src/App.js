import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AccountForms from "./components/AccountForms";
import MainApp from "./components/MainApp";

export default function App() {
  return (
    <Fragment>
      <Router>
        <Route exact path={["/", "/signup"]} component={AccountForms} />
        <Route
          exact
          path="/app"
          render={() => <MainApp title="Smart Brain" />}
        />
      </Router>
    </Fragment>
  );
}
