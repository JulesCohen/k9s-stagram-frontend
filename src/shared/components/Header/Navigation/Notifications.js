import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationToast from "./NotificationToast";
import { CSSTransition } from "react-transition-group";

import "./Notifications.css";
// import { cssTransition } from "react-toastify";
import { useHttpClient } from "../../../hooks/http-hook";

const Notifications = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [count, setcount] = useState(0);
  const [notifications, setnotifications] = useState(false);
  const [showNotif, setshowNotif] = useState(false);

  // const listRef = useRef(
  //   <div className="notification__list">{auth.notification}</div>
  // );

  useEffect(() => {
    console.log("LOAD NOTIF");
    const fetchNotifications = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}/notifications`
        );
        setnotifications(responseData.user);
        setcount(responseData.user.length);
        console.log(responseData.user);
      } catch (error) {}
    };

    fetchNotifications();
  }, [sendRequest, auth.userId, count]);

  const handleNotification = () => {
    setcount((prevState) => prevState + 1);
  };

  const handleShowNotif = () => {
    console.log("SHOW NOTIF");
    setshowNotif(!showNotif);
  };

  return (
    <div className="notification">
      <button className="notification__button" onClick={handleShowNotif}>
        <div className={"notification__badge"}>{count}</div>
        <FontAwesomeIcon icon={["fas", "bell"]} size="3x" />
        <span className="tooltip">Notifications</span>
      </button>

      <CSSTransition
        in={showNotif}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="notifications__container"
      >
        {/* {listRef.current} */}
        <div className="notifications__container">
          {notifications && (
            <ul className="notifications__list">
              {notifications.map((notif) => (
                <li className="notifications__item">
                  <div className="notification__image">
                    <img src={notif.image} alt="notif" />
                  </div>

                  <div className="notification__text">
                    <NavLink
                      // className="notification__author"
                      to={`/${notif.notifCreator._id}/posts`}
                    >
                      {notif.notifCreator.userName}
                    </NavLink>
                    <p>{notif.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CSSTransition>

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
