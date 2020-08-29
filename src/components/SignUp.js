import React, { Fragment, useEffect, useState } from "react";
import InputField from "./InputField";
import { Redirect } from "react-router-dom";

export default function SignUp(props) {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  const signUpUser = (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    fetch(`${process.env.REACT_APP_LOCAL_BACKEND_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSigningUp(false);
        if (!data.error && data.token && data.user) {
          // Signup successful, store token
          sessionStorage.setItem("token", data.token);
          setIsSigningUp(false);
          setRedirectTo("/app");
        } else if (data.error) {
          // Error in signing up user
          // Show notification with the error
          setNotification(data.error);
          setIsSigningUp(false);
        }
      });
  };

  return (
    <Fragment>
      {/* If token already exists, then redirect to /app route */}
      {redirectTo && <Redirect to={redirectTo} />}
      {sessionStorage.getItem("token") && <Redirect to="/app" />}

      <h1 className="title">Sign Up</h1>
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

        <form onSubmit={signUpUser}>
          <InputField
            id="name"
            name="name"
            classes="input is-medium has-background-dark has-text-white no-border"
            type="text"
            placeholder="Name"
            icon="fas fa-question"
            required={true}
            onChange={setName}
          />
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
              "button is-link is-medium" + (isSigningUp ? " is-loading" : "")
            }
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </Fragment>
  );
}
