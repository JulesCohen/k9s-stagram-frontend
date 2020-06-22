import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PhotoGrid = (props) => {
  return (
    <div className="userpage__grid">
      {props.posts.map((post, index) => (
        <div className="userpage__grid-post" key={index}>
          <div
            className="post-overlay"
            onClick={() => props.handleDelete(post.id)}
          >
            <div className="post-overlay-content">
              <p>{post.likes.count}</p>
              <FontAwesomeIcon
                icon={["fas", "bone"]}
                style={{ color: "white" }}
                size="1x"
              />
            </div>
            <div className="post-overlay-content">
              <p>{post.comments.length} </p>
              <FontAwesomeIcon
                icon={["fas", "comment"]}
                style={{ color: "white" }}
                size="1x"
              />
            </div>
          </div>
          <img src={post.image} alt="post" />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
