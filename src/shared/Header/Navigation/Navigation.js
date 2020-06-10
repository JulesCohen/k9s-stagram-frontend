import React from "react";

import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink to="/" exact>
        <FontAwesomeIcon icon={["fas", "home"]} size="3x" />
      </NavLink>
      <NavLink to="/search" className="navigation__search">
        <FontAwesomeIcon icon={["fas", "search"]} size="3x" />
      </NavLink>
      <NavLink to="/newpost">
        <FontAwesomeIcon icon={["fas", "plus-circle"]} size="3x" />
      </NavLink>
      <NavLink to="/notification" className="notification-icon">
        <div className={"notification-icon__badge"}>6</div>
        <FontAwesomeIcon icon={["fas", "bell"]} size="3x" />
      </NavLink>
      <NavLink to="/u1/posts">
        <FontAwesomeIcon icon={["fas", "user"]} size="3x" />
      </NavLink>

      <NavLink to="/auth" className="navigation__auth">
        <FontAwesomeIcon icon={["fas", "sign-in-alt"]} size="3x" />
      </NavLink>
    </div>
  );
};

export default Navigation;
