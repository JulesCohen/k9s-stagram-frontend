import React from "react";

// import Icons from "../Icons";
// import { FaSearch } from "react-icons/fa";

import "./Header.css";
import Navigation from "./Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <div className="header">
      <div className="header__title">
        <FontAwesomeIcon
          icon={["fas", "paw"]}
          // style={{ color: "black" }}
          // size="6x"
        />
        <div className="header__title-text">
          <p className="header__title-text-main ">K9'STAGRAM </p>
          <p className="header__title-text-sub ">UNLEASH YOUR PICTURES!</p>
        </div>
      </div>
      <div className="header__search">
        <div className="header__search__icon">
          <FontAwesomeIcon
            icon={["fas", "search"]}
            // style={{ color: "white" }}
            // size="2x"
          />
        </div>
        <input type="text" placeholder="Search..."></input>
      </div>
      <div className="top-nav">
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
