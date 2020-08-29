import React, { Fragment, useEffect, useState } from "react";
import InputField from "./InputField";
import "../css/SignIn.css";
import { Redirect } from "react-router-dom";

export default function SignIn(props) {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signInUser = (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    fetch(`${process.env.REACT_APP_LOCAL_BACKEND_URL}/api/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data.token && data.user) {
          // Signin successful, store token
          sessionStorage.setItem("token", data.token);
          setIsSigningIn(false);
        } else if (data.error) {
          // Error signing in user
          // Show notification with the error
          setNotification(data.error);
          setIsSigningIn(false);
        }
      });
  };

  return (
    <Fragment>
      {/* If token already exists, then redirect to /app route */}
      {sessionStorage.getItem("token") && <Redirect to="/app" />}

      <h1 className="title">Sign In</h1>
      <h2 className="subtitle">To use SmartBrain App</h2>
      <div className="container">
        {/* If there is any notification available, show to user */}
        {notification && (
          <div className="notification is-danger">
            <button
              className="delete"
              onClick={() => {
                setNotification("");
              }}
            ></button>
            {notification}
          </div>
        )}
        <form onSubmit={signInUser}>
          <InputField
            id="email"
            name="email"
            classes="input is-medium has-background-dark has-text-white no-border"
            type="email"
            placeholder="Email"
            icon="fas fa-envelope"
            required={true}
            onChange={setEmail}
          />
          <InputField
            id="password"
            name="password"
            classes="input is-medium has-background-dark has-text-white no-border"
            type="password"
            placeholder="Password"
            icon="fas fa-lock"
            required={true}
            minLength="6"
            onChange={setPassword}
          />
          <button
            id="signinButton"
            className={
              "button is-link is-medium" + (isSigningIn ? " is-loading" : "")
            }
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </Fragment>
  );
}
