import React, { useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../../shared/context/auth-context";
import PostComments from "./PostComments";
import Likes from "./Likes";
import Avatar from "../../../shared/components/UIElements/Avatar";
import reactStringReplace from "react-string-replace";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import "./Post.css";

const Post = (props) => {
  const auth = useContext(AuthContext);
  const textArea = useRef(null);
  const [likesCount, setLikesCount] = useState(props.post.likes.count);
  const [goToLogin, setgoToLogin] = useState();

  const handleLike = (count) => {
    setLikesCount(count);
  };

  const handleGoToComment = () => {
    if (!auth.isLoggedIn) {
      setgoToLogin("Please login to comment a post.");
    } else {
      textArea.current.focus();
    }
  };

  const parseHashtag = (description) => {
    const des = reactStringReplace(description, /#(\w+)/g, (match, i) => (
      <NavLink
        to={`/explore/hashtag/${match}`}
        key={i}
        className="content__hashtags"
      >
        {" "}
        #{match}
      </NavLink>
    ));

    return des;
  };

  return (
    <div className="post" ref={props.scrollRef}>
      <ErrorModal
        error={goToLogin}
        onClear={() => {
          setgoToLogin(null);
        }}
      />
      <div className="post__header">
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
        {auth.isLoggedIn && auth.userId === props.post.author.id && (
          <div className="post__delete">
            <button onClick={() => props.onDelete(props.post.id)}>
              <FontAwesomeIcon icon={["fas", "trash-alt"]} />
            </button>
          </div>
        )}
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

          <p className="content__text content__hashtags">
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
