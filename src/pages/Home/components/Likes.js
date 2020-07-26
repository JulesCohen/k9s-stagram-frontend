import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

const Like = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest, error, clearError } = useHttpClient();
  const [isLike, setIsLike] = useState(props.likes.users.includes(auth.userId));
  const [goToLogin, setgoToLogin] = useState();

  const onLike = async () => {
    if (auth.isLoggedIn) {
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
      } catch (err) {}
    } else {
      setgoToLogin("Please login to like a post.");
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <ErrorModal
        error={goToLogin}
        onClear={() => {
          setgoToLogin(null);
        }}
      />
      <button onClick={onLike}>
        <FontAwesomeIcon
          icon={["fas", "bone"]}
          style={{ color: isLike ? "red" : "inherit" }}
          size="2x"
        />
      </button>
    </>
  );
};

export default Like;
