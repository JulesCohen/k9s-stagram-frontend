import React from "react";

const UserInfos = ({ userInfos, length }) => {
  return (
    <div className="userpage__header">
      <div className="avatar">
        <div className="avatar-big">
          <img
            src={userInfos.image}
            alt={`${userInfos.firstName} ${userInfos.lastName}`}
          />
        </div>
      </div>
      <div className="userpage__header-content">
        <div className="userpage__header-content-user">
          <p>{userInfos.userName}</p>
          <button>Profile settings</button>
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
