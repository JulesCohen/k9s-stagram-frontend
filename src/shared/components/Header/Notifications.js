import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotifToast from "./NotifToast";

import "./Notifications.css";

const Notifications = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <NavLink to="/notification" className="notification-icon">
        <div className={"notification-icon__badge"}>6</div>
        <FontAwesomeIcon icon={["fas", "bell"]} size="3x" />
        <span className="tooltip">Notifications</span>
        {/* <div className="notifications-list">{auth.notification}</div> */}
      </NavLink>
      {auth.isLoggedIn && auth.userId && <NotifToast userId={auth.userId} />}
    </>
  );
};

export default Notifications;
