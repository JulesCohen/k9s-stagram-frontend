import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Avatar from "../../../shared/components/UIElements/Avatar";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import Modal from "../../../shared/components/UIElements/Modal";
import UsersList from "../../../shared/components/UIElements/UsersList";
import Button from "../../../shared/components/FormElements/Button";
import "./UserInfos.css";

const UserInfos = ({ userInfos, length }) => {
  const auth = useContext(AuthContext);
  const { sendRequest, error, clearError } = useHttpClient();
  const [followed, setfollowed] = useState(
    userInfos.followers.includes(auth.userId)
  );
  const [showUserList, setshowUserList] = useState(false);
  const [followList, setfollowList] = useState();
  const [nbFollowers, setnbFollowers] = useState(userInfos.followers.length);

  const handleFollow = async () => {
    const action = followed ? "unfollow" : "follow";

    try {
      await sendRequest(
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
      setnbFollowers((prevState) => (followed ? prevState - 1 : prevState + 1));
    } catch (err) {
      alert(err);
    }
  };

  const handleShowUserList = (who) => {
    setfollowList(who);
    setshowUserList(true);
  };

  useEffect(() => {
    setfollowed(userInfos.followers.includes(auth.userId));
    setnbFollowers(userInfos.followers.length);
  }, [userInfos, auth.userId]);

  return (
    <div className="userHeader">
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showUserList}
        onCancel={() => {
          setshowUserList(false);
        }}
        header={""}
        footer={
          <Button
            onClick={() => {
              setshowUserList(false);
            }}
          >
            CLOSE
          </Button>
        }
      >
        <UsersList userId={userInfos.id} who={followList} />
      </Modal>
      <div className="userHeader__avatar">
        <Avatar size={"big"} img={userInfos.image} alt={userInfos.firstName} />
      </div>

      <div className="userHeader__content">
        <div className="content__user">
          <p>{userInfos.userName}</p>
          {auth.isLoggedIn && auth.userId !== userInfos.id && (
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
          <p
            className="button__show-list"
            onClick={() => handleShowUserList("followers")}
          >
            <span>{nbFollowers}</span> followers
          </p>
          <p
            className="button__show-list"
            onClick={() => handleShowUserList("followings")}
          >
            <span>{userInfos.followings.length}</span> following
          </p>
        </div>
        <div className="content__description">
          <p>
            {userInfos.firstName} {userInfos.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfos;
