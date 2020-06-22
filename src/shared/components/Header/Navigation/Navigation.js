import React, { useContext } from "react";

import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from "../../../context/auth-context";
const Navigation = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="navigation">
      {auth.isLoggedIn && (
        <NavLink to="/" exact>
          <FontAwesomeIcon icon={["fas", "home"]} size="3x" />
          <span className="info">Home</span>
        </NavLink>
      )}
      <NavLink to="/search" className="navigation__search">
        <FontAwesomeIcon icon={["fas", "search"]} size="3x" />
        <span className="info">Search</span>
      </NavLink>

      <NavLink to={`/explore/allPosts/all`} className="navigation__explore">
        <FontAwesomeIcon icon={["fas", "compass"]} size="3x" />
        <span className="info">Explore</span>
      </NavLink>
      {auth.isLoggedIn && (
        <NavLink to="/newpost">
          <FontAwesomeIcon icon={["fas", "plus-circle"]} size="3x" />
          <span className="info">Post</span>
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink to="/notification" className="notification-icon">
          <div className={"notification-icon__badge"}>6</div>
          <FontAwesomeIcon icon={["fas", "bell"]} size="3x" />
          <span className="info">Notifications</span>
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink to={`/${auth.userId}/posts`}>
          <FontAwesomeIcon icon={["fas", "user"]} size="3x" />
          <span className="info">Profile</span>
        </NavLink>
      )}
      {!auth.isLoggedIn && (
        <NavLink to="/auth" className="navigation__auth">
          <FontAwesomeIcon icon={["fas", "sign-in-alt"]} size="3x" />
          <span className="info">Auth</span>
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <button className="navigation__logout" onClick={() => auth.logout()}>
          <FontAwesomeIcon icon={["fas", "sign-out-alt"]} size="3x" />
          <span className="info">Logout</span>
        </button>
      )}
    </div>
  );
};

export default Navigation;