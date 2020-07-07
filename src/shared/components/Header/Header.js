import React from "react";
import Navigation from "./Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";

import Search from "./Search";
import "./Header.css";

const Header = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1100px)" });

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
      {/* {!isTabletOrMobile && <Search />} */}
      <Search />
      <Navigation />
    </div>
  );
};

export default Header;
