import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PhotoGrid.css";
const PhotoGrid = (props) => {
  return (
    <div className="photoGrid">
      {props.posts.map((post, index) => (
        <div className="photoGrid__post" key={index}>
          <div
            className="postOverlay"
            onClick={() => props.handleDelete(post.id)}
          >
            <div className="postOverlay__content">
              <p>{post.likes.count}</p>
              <FontAwesomeIcon
                icon={["fas", "bone"]}
                style={{ color: "white" }}
                size="1x"
              />
            </div>
            <div className="postOverlay__content">
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
