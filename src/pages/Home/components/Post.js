import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ReactHashtag from "react-hashtag";
import PostComments from "./PostComments";
import Likes from "./Likes";
import Avatar from "../../../shared/components/UIElements/Avatar";
import "./Post.css";
// import parse from "html-react-parser";
import reactStringReplace from "react-string-replace";
const Post = (props) => {
  const textArea = useRef(null);
  const [likesCount, setLikesCount] = useState(props.post.likes.count);

  const handleLike = (count) => {
    setLikesCount(count);
  };

  const handleGoToComment = () => {
    textArea.current.focus();
  };

  const parseHashtag = (description) => {
    // const reHash = /(?:\s|^)?#[A-Za-z0-9\-\.\_]+(?:\s|$)/g;

    const des = reactStringReplace(description, /#(\w+)/g, (match, i) => (
      <NavLink to={`/explore/hashtag/${match}`} key={i}>
        {" "}
        #{match}
      </NavLink>
    ));

    return des;
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
            <button onClick={handleGoToComment}>
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
            {parseHashtag(props.post.description)}
          </p>
        </div>
        <hr />
        <PostComments
          comments={props.post.comments}
          refTA={textArea}
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
