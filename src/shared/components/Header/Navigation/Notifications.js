import React, { useState, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotifToast from "./NotifToast";
import { CSSTransition } from "react-transition-group";

import "./Notifications.css";
import { cssTransition } from "react-toastify";

const Notifications = () => {
  const auth = useContext(AuthContext);

  const [count, setcount] = useState(0);
  const [showNotif, setshowNotif] = useState(false);

  const listRef = useRef(
    <div className="notification__list">{auth.notification}</div>
  );

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
        classNames="notification__list"
      >
        {listRef.current}
      </CSSTransition>

      {auth.isLoggedIn && auth.userId && (
        <NotifToast
          userId={auth.userId}
          handleNotification={handleNotification}
        />
      )}
    </div>
  );
};

export default Notifications;
