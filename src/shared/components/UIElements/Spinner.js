import React from "react";

import "./Spinner.css";

const Spinner = (props) => {
  return (
    <div className={`${props.asOverlay && "spinner__overlay"}`}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
