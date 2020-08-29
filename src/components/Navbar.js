import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <Fragment>
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
        {props.children}
      </nav>
    </Fragment>
  );
}

export default Navbar;
