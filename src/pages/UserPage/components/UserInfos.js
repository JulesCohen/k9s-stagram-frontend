import React, { useContext, useState } from "react";
import Avatar from "../../../shared/components/UIElements/Avatar";
import { AuthContext } from "../../../shared/context/auth-context";
import "./UserInfos.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const UserInfos = ({ userInfos, length }) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [followed, setfollowed] = useState(
    userInfos.followers.includes(auth.userId)
  );

  const handleFollow = async () => {
    const action = followed ? "unfollow" : "follow";

    try {
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}/${action}`,
        "PATCH",
        JSON.stringify({
          followUserId: userInfos.id,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      setfollowed(!followed);

      console.log(res.message);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="userHeader">
      <div className="userHeader__avatar">
        <Avatar size={"big"} img={userInfos.image} alt={userInfos.firstName} />
      </div>

      <div className="userHeader__content">
        <div className="content__user">
          <p>{userInfos.userName}</p>
          {auth.userId !== userInfos.id && (
            <button
              className={`user__button ${followed && "user__button--followed"}`}
              onClick={handleFollow}
            >
              {followed ? "Followed" : "Follow"}{" "}
            </button>
          )}
        </div>
        <div className="content__numbers">
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
        <div className="content__description">
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
