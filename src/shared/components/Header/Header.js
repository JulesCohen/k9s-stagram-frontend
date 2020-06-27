import React from "react";
import Navigation from "./Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__title">
        <div className="header__logo">
          <FontAwesomeIcon icon={["fas", "paw"]} />
        </div>
        <div className="title__text">
          <p className="title__text-main ">K9'STAGRAM </p>
          <p className="title__text-sub ">UNLEASH YOUR PICTURES!</p>
        </div>
      </div>
      <div className="header__search">
        <div className="search__icon">
          <FontAwesomeIcon icon={["fas", "search"]} />
        </div>
        <input
          className="search__input"
          type="text"
          placeholder="Search..."
        ></input>
      </div>
      <Navigation />
    </div>
  );
};

export default Header;
