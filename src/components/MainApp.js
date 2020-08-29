import React, { useEffect, Fragment, useState } from "react";
import ProfileStatement from "./ProfileStatement";
import "../css/MainApp.css";
import URLForm from "./URLForm";
import Result from "./Result";
import { Redirect } from "react-router-dom";
import Preloader from "./Preloader/Preloader";

export default function MainApp(props) {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const [imageURL, setImageURL] = useState("");
  const [faceBoxes, setFaceBoxes] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [redirectTo, setRedirectTo] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setRedirectTo("/");
    } else {
      // Check if token is correct and fetch the user
      fetch(
        `${
          process.env.REACT_APP_LOCAL_BACKEND_URL
        }/profile/${sessionStorage.getItem("token")}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.user && !data.error) {
            // RESPONSE IS OK
            props.setUser(data.user);
            setIsUserLoading(false);
          } else if (data.error) {
            // Client's token is wrong so delete it
            sessionStorage.removeItem("token");
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
    return fetch(`${process.env.REACT_APP_LOCAL_BACKEND_URL}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: sessionStorage.getItem("token"),
        imageurl: URL,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setFaceBoxes(processFaceData(data));
          props.setUser({
            ...props.user,
            submissions: props.user.submissions + 1,
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
        <main className="dashboard has-background-warning">
          <ProfileStatement
            name={props.user.name}
            submissions={props.user.submissions}
          />
          <URLForm recogniseImage={recogniseImage} isDetecting={isDetecting} />
          {/* If there is any notification available, show to user */}
          {notification && (
            <div class="notification is-danger custom-app-notification">
              <button
                class="delete"
                onClick={() => {
                  setNotification("");
                }}
              ></button>
              {notification}
            </div>
          )}
          <Result imageURL={imageURL} faceBoxes={faceBoxes} />
        </main>
      )}
    </Fragment>
  );
}