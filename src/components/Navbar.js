import React from "react";
import { Link, Route } from "react-router-dom";
import AccountButtons from "./AccountButtons";
import ProfileAvatar from "./ProfileAvatar";

function Navbar(props) {
  return (
    <nav
      className="navbar is-warning"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/app" className="navbar-item is-size-4">
          <h1>
            <span role="img" aria-label="Brain Image">
              ­🧠
            </span>
            &nbsp; SmartBrain
          </h1>
        </Link>
      </div>
      <Route exact path={["/", "/signup"]} render={() => <AccountButtons />} />
      <Route
        exact
        path="/app"
        render={() => <ProfileAvatar viewProfile={props.viewProfile} />}
      />
    </nav>
  );
}

export default Navbar;
