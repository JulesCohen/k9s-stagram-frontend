import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ReactHashtag from "react-hashtag";
import PostComments from "./PostComments";
import Likes from "./Likes";
import Avatar from "../../../shared/components/UIElements/Avatar";
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
      <div className="post__author">
        <Avatar
          size="small"
          img={props.post.author.image}
          alt={props.post.author.userName}
        />

        <div className="author__infos">
          <NavLink
            className="author__name"
            to={`/${props.post.author.id}/posts`}
          >
            {props.post.author.userName}
          </NavLink>

          <p className="author__location">{props.post.location}</p>
        </div>
      </div>
      {/* <div className="post-photo" onDoubleClick={changeColor}> */}
      <div className="post__photo">
        <img src={props.post.image} alt="dog"></img>
      </div>
      <div className="post__content">
        <div className="content__icons">
          <div className="content__icon">
            <Likes
              likes={props.post.likes}
              postId={props.post.id}
              handleLike={handleLike}
            />
          </div>
          <div className="content__icon">
            <button onClick={handleGoToComment} className="icon_style">
              <FontAwesomeIcon icon={["fas", "comment"]} size="2x" />
            </button>
          </div>
        </div>
        <div className="content__like">
          <p>{likesCount} Bones </p>
        </div>
        <div className="content__text">
          <NavLink
            className="content__author"
            to={`/${props.post.author.id}/posts`}
          >
            {props.post.author.userName}
          </NavLink>

          <p className="content__text">
            {/* <ReactHashtag
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
            </ReactHashtag> */}
            {props.post.description}
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
