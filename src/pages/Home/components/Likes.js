import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const Like = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [isLike, setIsLike] = useState(props.likes.users.includes(auth.userId));

  const onLike = async () => {
    setIsLike(!isLike);

    try {
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${props.postId}/likes`,
        "PATCH",
        JSON.stringify({
          likeAction: isLike ? "sub" : "add",
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setIsLike(!isLike);
      props.handleLike(res.count);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <button onClick={onLike}>
      <FontAwesomeIcon
        icon={["fas", "bone"]}
        style={{ color: isLike ? "red" : "inherit" }}
        size="2x"
      />
    </button>
  );
};

export default Like;
