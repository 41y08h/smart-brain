import React, { useState } from "react";
import InputField from "./InputField";
import "../css/ProfileModal.css";

export default function ProfileModal({ user, setUser, toggleProfile }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserUpdating, setIsUserUpdating] = useState(false);
  const [notification, setNotification] = useState("");

  const updateUser = () => {
    setIsUserUpdating(true);
    if (!name && !email && !password) {
      setNotification("Please fill at least one field!");
      setIsUserUpdating(false);
    } else {
      fetch(
        `${
          process.env.REACT_APP_LOCAL_BACKEND_URL
        }/profile/${sessionStorage.getItem("token")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...(name && { name }),
            ...(email && { email }),
            ...(password && { password }),
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.error && data.user) {
            // Update successful
            setIsUserUpdating(false);
            // Load updated user
            setUser({ ...user, ...data.user });
            // Close modal
            toggleProfile();
          } else if (data.error) {
            // Error updating user
            // Show notification
            setNotification(data.error);
            setIsUserUpdating(false);
          }
        });
    }
  };

  return (
    <div className="modal has-text-centered is-active" id="profileModal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="card">
          <header className="card-header">
            <figure
              className="image is-48x48 mx-3 my-2"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <img
                alt="Profile Avatar"
                className="is-rounded"
                src="https://source.unsplash.com/48x48/?coding,programming"
              />
            </figure>
            <p className="card-header-title is-size-4">{user.name}</p>
          </header>
          <div className="card-content">
            <div className="content">
              <p className="is-size-3 has-text-black">
                Member since: {new Date(user.joined).toLocaleDateString()}
              </p>
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
              <InputField
                id="name"
                name="name"
                classes="input is-medium has-background-black has-text-white no-border"
                type="text"
                placeholder="Name"
                icon="fas fa-question"
                required={true}
                onChange={setName}
              />
              <InputField
                id="email"
                name="email"
                classes="input is-medium has-background-black has-text-white no-border"
                type="email"
                placeholder="Email"
                icon="fas fa-envelope"
                required={true}
                onChange={setEmail}
              />
              <InputField
                id="password"
                name="password"
                classes="input is-medium has-background-black has-text-white no-border"
                type="password"
                placeholder="Password"
                icon="fas fa-lock"
                required={true}
                minLength="6"
                onChange={setPassword}
              />
            </div>
          </div>
          <footer className="card-footer">
            <button
              className={
                "button is-light is-medium card-footer-item no-border-radius no-border" +
                (isUserUpdating ? " is-loading" : "")
              }
              onClick={updateUser}
            >
              Save
            </button>
            <div
              className="button is-light is-medium card-footer-item no-border-radius no-border"
              onClick={toggleProfile}
            >
              Close
            </div>
          </footer>
        </div>
      </div>
      <button
        className="modal-close modalToggle is-large"
        aria-label="close"
        onClick={toggleProfile}
      ></button>
    </div>
  );
}
