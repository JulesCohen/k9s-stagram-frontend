import React from "react";

import "./BottomNav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <button>
        <Link to="/">
          <FontAwesomeIcon
            icon={["fas", "home"]}
            style={{ color: "white" }}
            size="3x"
          />
        </Link>
      </button>
      <button>
        <Link to="/newpost">
          <FontAwesomeIcon
            icon={["fas", "plus-circle"]}
            style={{ color: "white" }}
            size="3x"
          />
        </Link>
      </button>
      <button className={"notification-icon"}>
        <Link to="/">
          <div className={"notification-icon__badge"}>6</div>
          <FontAwesomeIcon
            icon={["fas", "bell"]}
            style={{ color: "white" }}
            size="3x"
          />
        </Link>
      </button>
      <button>
        <Link to="/u1/posts">
          <FontAwesomeIcon
            icon={["fas", "user"]}
            style={{ color: "white" }}
            size="3x"
          />
        </Link>
      </button>
      <button>
        <Link to="/auth">
          <FontAwesomeIcon
            icon={["fas", "sign-in-alt"]}
            style={{ color: "white" }}
            size="3x"
          />
        </Link>
      </button>
    </div>
  );
};

export default BottomNav;
