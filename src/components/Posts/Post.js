import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import "./Post.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-textarea-autosize";

const Post = (props) => {
  const textArea = useRef(null);
  const { handleSubmit, reset, control } = useForm();
  const [likeColor, setLikeColor] = useState("black");
  const [showComment, setshowComment] = useState(false);

  const changeColor = () => {
    if (likeColor === "red") {
      setLikeColor("black");
      props.onDislike(props.index);
    } else {
      setLikeColor("red");
      props.onLike(props.index);
    }
  };

  const handleGoToComment = () => {
    textArea.current.focus();
  };

  const handleShowComment = () => {
    setshowComment(!showComment);
  };

  const onSubmit = (data) => {
    props.onComment(props.index, data.comment);
    reset();
    if (showComment === false) {
      handleShowComment();
    }
    console.log(data);
  };

  const handleHoverComment = () => {};

  return (
    <div className="post">
      <div className="post-author">
        <div className="post-author__icon">
          <FontAwesomeIcon
            icon={["fas", "camera"]}
            style={{ color: "black" }}
            size="3x"
          />
        </div>
        <div className="post-author__infos">
          <p className="post-author__infos-name">{props.name}</p>
          <p className="post-author__infos-location">{props.location}</p>
        </div>
      </div>
      <div className="post-photo" onDoubleClick={changeColor}>
        <img src={props.image} alt="dog"></img>
      </div>
      <div className="post-content">
        <div className="post-content__icons">
          <div className="post-content__icons-button">
            <button onClick={changeColor}>
              <FontAwesomeIcon
                icon={["fas", "bone"]}
                style={{ color: likeColor }}
                size="2x"
              />
            </button>
          </div>
          <div className="post-content__icons-button">
            <button onClick={handleGoToComment} className="icon_style">
              <FontAwesomeIcon icon={["fas", "comment"]} size="2x" />
            </button>
          </div>
        </div>
        <div className="post-content__like">
          <p>{props.likes} Bones </p>
        </div>
        <div className="post-content__text">
          <p className="post-content__text-author">{props.name}</p>
          <p className="post-content__text-message">
            {props.text} <span className="hashtags"> {props.hashtags}</span>
          </p>
        </div>
        <hr />
        <div className="post-comments">
          <div className="post-comments-count">
            <p>
              Comments ({props.comments.length}){" "}
              {props.comments.length > 0 && (
                <span
                  className="post-comments-show"
                  onClick={handleShowComment}
                >
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
            props.comments.map((comment) => {
              return (
                <div
                  className="post-comment"
                  key={Math.random()}
                  onMouseEnter={handleHoverComment}
                >
                  <p className="post-content__text-author">{comment.author}</p>
                  <p className="post-content__text-message">
                    {comment.comment}
                  </p>
                </div>
              );
            })}

          <form onSubmit={handleSubmit(onSubmit)} className={"comment-form"}>
            <Controller
              as={
                <TextareaAutosize
                  placeholder="Please leave a comment..."
                  ref={textArea}
                />
              }
              control={control}
              rules={{ required: true }}
              name="comment"
              defaultValue=""
            />

            <button>
              <FontAwesomeIcon
                icon={["fas", "paper-plane"]}
                style={{ color: "black" }}
                size="lg"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;