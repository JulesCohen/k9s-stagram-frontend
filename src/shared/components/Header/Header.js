import React, { useContext } from "react";
import Navigation from "./Navigation/Navigation";
import NotifToast from "./NotifToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

import { AuthContext } from "../../context/auth-context";

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="header">
      <div className="header__title">
        <FontAwesomeIcon icon={["fas", "paw"]} />
        <div className="header__title-text">
          <p className="header__title-text-main ">K9'STAGRAM </p>
          <p className="header__title-text-sub ">UNLEASH YOUR PICTURES!</p>
        </div>
      </div>
      <div className="header__search">
        <div className="header__search__icon">
          <FontAwesomeIcon icon={["fas", "search"]} />
        </div>
        <input type="text" placeholder="Search..."></input>
      </div>
      <div className="top-nav">
        <Navigation />
      </div>

      {auth.isLoggedIn && auth.notification && <NotifToast />}
    </div>
  );
};

export default Header;
