import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import TextareaAutosize from "react-textarea-autosize";
import "./PostComments.css";
import Spinner from "../../../shared/components/UIElements/Spinner";

const PostComments = (props) => {
  const auth = useContext(AuthContext);
  const [comments, setcomments] = useState(props.comments);
  const { isLoading, sendRequest } = useHttpClient();
  const { handleSubmit, reset, control } = useForm();
  const [showComment, setshowComment] = useState(false);

  const handleShowComment = () => {
    setshowComment(!showComment);
  };

  const onSubmit = async (data) => {
    try {
      const res = await sendRequest(
        `http://localhost:5000/api/posts/${props.postId}/comments`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
          comment: data.comment,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      let updatedComments = [...comments];
      updatedComments.push(res.comment);
      setcomments(updatedComments);
      reset();
    } catch (err) {
      alert(err);
    }
    if (showComment === false) {
      handleShowComment();
    }
    console.log(data);
  };

  const onCommentDelete = async (commentId) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${props.postId}/comments`,
        "DELETE",
        JSON.stringify({
          commentId: commentId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      let updatedComments = [...comments];
      updatedComments = updatedComments.filter(
        (comment) => comment.id !== commentId
      );
      setcomments(updatedComments);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="comments">
      <div className="comments__count">
        <p>
          Comments ({comments.length})
          {comments.length > 0 && (
            <span className="comments__show" onClick={handleShowComment}>
              {showComment ? "See less.." : "See more.."}
              {showComment ? (
                <FontAwesomeIcon
                  icon={["fas", "arrow-up"]}
                  style={{ color: "black" }}
                  size="sm"
                />
              ) : (
                <FontAwesomeIcon
                  icon={["fas", "arrow-down"]}
                  style={{ color: "black" }}
                  size="sm"
                />
              )}
            </span>
          )}
        </p>
      </div>

      {showComment &&
        comments.map((comment) => {
          return (
            <div className="comments__comment" key={Math.random()}>
              {auth.userId === comment.author.id && (
                <button
                  className="comments__delete"
                  onClick={() => onCommentDelete(comment.id)}
                >
                  <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                </button>
              )}
              <p className="comments__author">{comment.author.userName}</p>
              <p className="comments__message">{comment.comment}</p>
            </div>
          );
        })}

      <form onSubmit={handleSubmit(onSubmit)} className={"comments__form"}>
        <Controller
          as={
            <TextareaAutosize
              placeholder="Please leave a comment..."
              ref={props.refTA}
            />
          }
          control={control}
          rules={{ required: true }}
          name="comment"
          defaultValue=""
        />

        {isLoading ? (
          <Spinner asOverlay />
        ) : (
          <button>
            <FontAwesomeIcon icon={["fas", "paper-plane"]} size="lg" />
          </button>
        )}
      </form>
    </div>
  );
};

export default PostComments;
