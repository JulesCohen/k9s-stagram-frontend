import React from "react";

import "./Avatar.css";
const Avatar = ({ size, img, alt }) => {
  return (
    <div className="avatar">
      <div className={`avatar-${size}`}>
        <img src={img} alt={alt} />
      </div>
    </div>
  );
};

export default Avatar;
