import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHttpClient } from "../../../hooks/http-hook";
import NotificationToast from "./NotificationToast";
import SideDrawer from "../../UIElements/SideDrawer";
import Spinner from "../../UIElements/Spinner";

import "./Notifications.css";

const Notifications = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { sendRequest, isLoading } = useHttpClient();
  const [count, setcount] = useState(0);
  const [notifications, setnotifications] = useState(false);
  const [showNotif, setshowNotif] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}/notifications`
        );
        setnotifications(responseData.user.reverse());
        setcount(responseData.user.length);
      } catch (error) {}
    };

    fetchNotifications();
  }, [sendRequest, auth.userId, count]);

  const handleNotification = () => {
    setcount((prevState) => prevState + 1);
  };

  const handleShowNotif = () => {
    setshowNotif(!showNotif);
  };

  const handleReadNotif = (userId) => {
    history.push(`/${userId}/posts`);
    setshowNotif(false);
  };

  const handleDeleteNotif = async (index) => {
    const notifId = notifications[index]._id;

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}/notifications`,
        "DELETE",
        JSON.stringify({
          notifId: notifId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      let updatedNotifications = [...notifications];
      updatedNotifications = updatedNotifications.filter(
        (notif) => notif._id !== notifId
      );
      setnotifications(updatedNotifications);
      setcount(updatedNotifications.length);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="notification">
      <button className="notification__button" onClick={handleShowNotif}>
        <div className={"notification__badge"}>{count}</div>
        <FontAwesomeIcon icon={["fas", "bell"]} size="3x" />
        <span className="tooltip">Notifications</span>
      </button>

      <SideDrawer show={showNotif} onClick={handleShowNotif}>
        <div className="notifications__container">
          {notifications && (
            <ul className="notifications__list">
              {notifications.map((notif, index) => (
                <li className="notifications__item" key={index}>
                  {isLoading && <Spinner asOverlay />}
                  <div
                    className="notifications__item-content"
                    onClick={() => handleReadNotif(notif.notifCreator._id)}
                  >
                    <div className="notification__image">
                      <img src={notif.image} alt="notif" />
                    </div>
                    <div className="notification__text">
                      <p>
                        {notif.notifCreator.userName} {notif.message}
                      </p>
                    </div>
                  </div>
                  <button
                    className="notification__delete"
                    onClick={() => handleDeleteNotif(index)}
                  >
                    <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SideDrawer>

      {auth.isLoggedIn && auth.userId && (
        <NotificationToast
          userId={auth.userId}
          handleNotification={handleNotification}
        />
      )}
    </div>
  );
};

export default Notifications;
