import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostComments from "../../../pages/Home/components/PostComments";
import Likes from "../../../pages/Home/components/Likes";
import Avatar from "./Avatar";
import reactStringReplace from "react-string-replace";
import "./PostModal.css";

const PostModal = (props) => {
  const textArea = useRef(null);
  const [likesCount, setLikesCount] = useState(props.post.likes.count);

  const handleLike = (count) => {
    setLikesCount(count);
  };

  const handleGoToComment = () => {
    textArea.current.focus();
  };

  const parseHashtag = (description) => {
    const des = reactStringReplace(description, /#(\w+)/g, (match, i) => (
      <NavLink to={`/explore/hashtag/${match}`} key={i}>
        {" "}
        #{match}
      </NavLink>
    ));

    return des;
  };

  return (
    <div className="postmodal">
      <div className="postmodal__photo-container">
        <div className="postmodal__photo">
          <img src={props.post.image} alt="dog"></img>
        </div>
      </div>

      <div className="postmodal__content">
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

        <div className="contentmodal__text">
          <NavLink
            className="content__author"
            to={`/${props.post.author.id}/posts`}
          >
            {props.post.author.userName}
          </NavLink>

          <p className="contentmodal__text">
            {parseHashtag(props.post.description)}
          </p>
        </div>

        <div className="postmodal__infos">
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
        </div>

        <div className="postmodal__footer">
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
    </div>
  );
};

export default PostModal;
