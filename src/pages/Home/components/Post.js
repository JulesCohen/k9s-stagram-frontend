import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactHashtag from "react-hashtag";
import PostComments from "./PostComments";
import Likes from "./Likes";

import "./Post.css";

const Post = (props) => {
  const textArea = useRef(null);
  const [likesCount, setLikesCount] = useState(props.post.likes.count);

  const handleLike = (count) => {
    setLikesCount(count);
  };

  const handleGoToComment = () => {
    textArea.current.focus();
  };

  return (
    <div className="post">
      <div className="post-author">
        <div className="avatar-small">
          <img src={props.post.author.image} alt={props.post.author.userName} />
        </div>
        <div className="post-author__infos">
          <NavLink
            className="post-author__infos-name"
            to={`/${props.post.author.id}/posts`}
          >
            {props.post.author.userName}
          </NavLink>

          <p className="post-author__infos-location">{props.post.location}</p>
        </div>
      </div>
      {/* <div className="post-photo" onDoubleClick={changeColor}> */}
      <div className="post-photo">
        <img src={props.post.image} alt="dog"></img>
      </div>
      <div className="post-content">
        <div className="post-content__icons">
          <div className="post-content__icons-button">
            <Likes
              likes={props.post.likes}
              postId={props.post.id}
              handleLike={handleLike}
            />
          </div>
          <div className="post-content__icons-button">
            <button onClick={handleGoToComment} className="icon_style">
              <FontAwesomeIcon icon={["fas", "comment"]} size="2x" />
            </button>
          </div>
        </div>
        <div className="post-content__like">
          <p>{likesCount} Bones </p>
        </div>
        <div className="post-content__text">
          <NavLink
            className="post-content__text-author"
            to={`/${props.post.author.id}/posts`}
          >
            {props.post.author.userName}
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
              {props.post.description}
            </ReactHashtag>
          </p>
        </div>
        <hr />
        <PostComments
          comments={props.post.comments}
          refTA={textArea}
          // onComment={props.post.onComment}
          index={props.post.index}
          postId={props.post.id}
        />
        <div className="post-content__date">
          <p>{props.post.date}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
