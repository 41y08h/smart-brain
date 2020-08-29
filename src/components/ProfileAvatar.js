import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

export default function ProfileAvatar({ toggleProfile }) {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  const toggleDropDown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const signOut = () => {
    sessionStorage.removeItem("token");
    setRedirectTo("/");
  };
  return (
    <Fragment>
      {redirectTo && <Redirect to={redirectTo} />}
      <div
        className={
          "dropdown is-right mt-3 mb-3 mr-3" +
          (isDropdownActive ? " is-active" : "")
        }
      >
        <div className="dropdown-trigger" onClick={toggleDropDown}>
          <figure
            className="image is-48x48"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <img
              alt="Profile Avatar"
              className="is-rounded"
              src="https://source.unsplash.com/48x48/?coding,programming"
            />
          </figure>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <button
              className="dropdown-item button no-border"
              id="viewProfile"
              onClick={() => {
                toggleProfile();
                toggleDropDown();
              }}
            >
              View Profile
            </button>
            <button
              className="dropdown-item button no-border"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
