import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Modal from "./components/Modal";
import ProfileModal from "./components/ProfileModal";
import Navbar from "./components/Navbar";
import AccountForms from "./components/AccountForms";
import MainApp from "./components/MainApp";

export default function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const viewProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  return (
    <Fragment>
      <Router>
        {isProfileOpen && (
          <Modal>
            <ProfileModal
              viewProfile={viewProfile}
              user={user}
              setUser={setUser}
            />
          </Modal>
        )}
        <Navbar viewProfile={viewProfile} />
        <Route exact path={["/", "/signup"]} render={() => <AccountForms />} />
        <Route
          exact
          path="/app"
          render={() => (
            <MainApp title="Smart Brain" user={user} setUser={setUser} />
          )}
        />
      </Router>
    </Fragment>
  );
}
