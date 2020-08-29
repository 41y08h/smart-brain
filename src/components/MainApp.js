import React, { useEffect, Fragment, useState } from "react";
import ProfileStatement from "./ProfileStatement";
import "../css/MainApp.css";
import URLForm from "./URLForm";
import Result from "./Result";
import { Redirect } from "react-router-dom";
import Preloader from "./Preloader/Preloader";
import Navbar from "./Navbar";
import ProfileAvatar from "./ProfileAvatar";
import Modal from "./Modal";
import ProfileModal from "./ProfileModal";

export default function MainApp(props) {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [faceBoxes, setFaceBoxes] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [user, setUser] = useState(null);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setRedirectTo("/");
    } else {
      // Check if token is correct and fetch the user
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/profile/${localStorage.getItem(
          "token"
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.user && !data.error) {
            // RESPONSE IS OK
            setUser(data.user);
            setIsUserLoading(false);
          } else if (data.error) {
            // Client's token is wrong so delete it
            localStorage.removeItem("token");
            setRedirectTo("/");
          }
        });
    }
  }, [props]);

  const recogniseImage = (URL) => {
    setIsDetecting(true);
    setFaceBoxes([]);
    setImageURL(URL);
    detectFaceLocations(URL);
  };

  const processFaceData = (data) => {
    const processedData = [];
    try {
      data.outputs[0].data.regions.forEach((dataItem) => {
        const image = document.getElementById("resultImage");
        const height = Number(image.height);
        const width = Number(image.width);
        const clarifaiFace = dataItem.region_info.bounding_box;

        processedData.push({
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
        });
      });
    } catch {
      return [];
    }

    return processedData;
  };

  const detectFaceLocations = (URL) => {
    if (!URL) {
      setIsDetecting(false);
      setTimeout(() => {
        setNotification("");
      }, 3000);
      return setNotification("Please submit image URL!");
    }
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        imageurl: URL,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setFaceBoxes(processFaceData(data));
          setUser({
            ...user,
            submissions: user.submissions + 1,
          });
        } else if (data.error) {
          setNotification(data.error);
          setTimeout(() => {
            setNotification("");
          }, 3000);
        }
        setIsDetecting(false);
      });
  };

  return (
    <Fragment>
      {redirectTo && <Redirect to={redirectTo} />}
      {isUserLoading ? (
        <Preloader />
      ) : (
        <Fragment>
          {isProfileOpen && (
            <Modal>
              <ProfileModal
                toggleProfile={toggleProfile}
                user={user}
                setUser={setUser}
              />
            </Modal>
          )}
          <Navbar>
            <ProfileAvatar toggleProfile={toggleProfile} />
          </Navbar>
          <main className="dashboard has-background-warning">
            <ProfileStatement name={user.name} submissions={user.submissions} />
            <URLForm
              recogniseImage={recogniseImage}
              isDetecting={isDetecting}
            />
            {/* If there is any notification available, show to user */}
            {notification && (
              <div className="notification is-danger custom-app-notification">
                <button
                  className="delete"
                  onClick={() => {
                    setNotification("");
                  }}
                ></button>
                {notification}
              </div>
            )}
            <Result imageURL={imageURL} faceBoxes={faceBoxes} />
          </main>
        </Fragment>
      )}
    </Fragment>
  );
}
