import React from "react";
import { NavLink } from "react-router-dom";
// import { AuthContext } from "../../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Notifications.css";

const Notifications = () => {
  return (
    <>
      <NavLink to="/notification" className="notification-icon">
        <div className={"notification-icon__badge"}>6</div>
        <FontAwesomeIcon icon={["fas", "bell"]} size="3x" />
        <span className="tooltip">Notifications</span>
        {/* <div className="notifications-list">{auth.notification}</div> */}
      </NavLink>
    </>
  );
};

export default Notifications;
