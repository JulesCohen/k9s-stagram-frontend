import React, { useContext } from "react";
import Avatar from "../../../shared/components/UIElements/Avatar";

import { AuthContext } from "../../../shared/context/auth-context";
import "./UserInfos.css";
const UserInfos = ({ userInfos, length }) => {
  const auth = useContext(AuthContext);

  return (
    <div className="userpage__header">
      <div className="userpage__header-avatar">
        <Avatar size={"big"} img={userInfos.image} alt={userInfos.firstName} />
      </div>

      <div className="userpage__header-content">
        <div className="userpage__header-content-user">
          <p>{userInfos.userName}</p>
          {auth.userId === userInfos.id ? (
            <button>Profile settings</button>
          ) : (
            <button>Follow</button>
          )}
        </div>
        <div className="userpage__header-content-numbers">
          <p>
            <span>{length} </span>
            posts
          </p>
          <p>
            <span>{userInfos.followers.length}</span> followers
          </p>
          <p>
            <span>{userInfos.followings.length}</span> following
          </p>
        </div>
        <div className="userpage__header-content-description">
          <p>
            {userInfos.firstName} {userInfos.lastName}
          </p>
          <p>Dog Lover !!</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfos;
