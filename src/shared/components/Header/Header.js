import React from "react";
import { useHistory } from "react-router-dom";

import Navigation from "./Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Search from "./Search";
import "./Header.css";

const Header = () => {
  let history = useHistory();

  const goToExplore = () => {
    history.push(`/explore/allPosts/all`);
  };

  return (
    <div className="header">
      <div className="header__title" onClick={goToExplore}>
        <div className="header__logo">
          <FontAwesomeIcon icon={["fas", "paw"]} />
        </div>
        <div className="title__text">
          <p className="title__text-main ">K9'STAGRAM </p>
          <p className="title__text-sub ">UNLEASH YOUR PICTURES!</p>
        </div>
      </div>
      <Search />
      <Navigation />
    </div>
  );
};

export default Header;
