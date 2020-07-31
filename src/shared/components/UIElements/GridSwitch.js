import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GridSwitch = ({ chosenPost, setchosenPost, setshowPost, startRef }) => {
  return (
    <div className="grid-switch">
      <button
        onClick={() => {
          setchosenPost(null);
          setshowPost(false);
          window.scrollTo(0, startRef.current.offsetTop - 100);
        }}
      >
        <FontAwesomeIcon icon={["fas", "th"]} size="2x" />
      </button>
      <button
        onClick={() => {
          setshowPost(true);
          !chosenPost && window.scrollTo(0, startRef.current.offsetTop - 100);
        }}
      >
        <FontAwesomeIcon icon={["fas", "portrait"]} size="2x" />
      </button>
    </div>
  );
};

export default GridSwitch;
