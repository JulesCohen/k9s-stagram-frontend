import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Avatar from "./Avatar";
import "./UsersList.css";

const UsersList = (props) => {
  let history = useHistory();
  const [users, setusers] = useState();
  const { sendRequest } = useHttpClient();

  const goToUser = (userId) => {
    history.push(`/${userId}/posts`);
  };

  useEffect(() => {
    const getFollow = async (who) => {
      try {
        const res = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${props.userId}/${who}`
        );
        setusers(res.users);
      } catch (err) {
        alert(err);
      }
    };

    getFollow(props.who);
  }, [props.userId, props.who, sendRequest]);

  return (
    <>
      <ul className="users-list">
        {users &&
          users.map((user) => (
            <li
              key={user._id}
              className="users-list__item"
              onClick={() => goToUser(user._id)}
            >
              <Avatar size="small" img={user.image} alt={user.userName} />
              <p className="suggestion__author">{user.userName}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default UsersList;
