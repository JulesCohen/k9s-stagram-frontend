import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-textarea-autosize";
import ReactHashtag from "react-hashtag";
import PostComments from "./PostComments";
import "./Post.scss";

const Post = (props) => {
  const textArea = useRef(null);
  const { handleSubmit, reset, control } = useForm();
  const [likeColor, setLikeColor] = useState("black");

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

  return (
    <div className="post">
      <div className="post-author">
        <div className="avatar-small">
          <img src={props.avatar} alt={props.name} />
        </div>
        <div className="post-author__infos">
          {/* <p className="post-author__infos-name">{props.name}</p> */}

          <NavLink
            className="post-author__infos-name"
            to={`/${props.authorId}/posts`}
          >
            {props.name}
          </NavLink>

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
          <p>{props.likes.count} Bones </p>
        </div>
        <div className="post-content__text">
          <NavLink
            className="post-content__text-author"
            to={`/${props.authorId}/posts`}
          >
            {props.name}
          </NavLink>

          <p className="post-content__text-message">
            <ReactHashtag
              renderHashtag={(hashtagValue) => (
                <NavLink
                  to={`/explore/hashtag/${hashtagValue.substring(1)}`}
                  key={hashtagValue.substring(1)}
                >
                  {hashtagValue}
                </NavLink>
              )}
            >
              {props.text}
            </ReactHashtag>
          </p>
        </div>
        <hr />
        <PostComments
          comments={props.comments}
          refTA={textArea}
          // onComment={props.onComment}
          index={props.index}
          postId={props.postId}
        />
        <div className="post-content__date">
          <p>{props.date}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
