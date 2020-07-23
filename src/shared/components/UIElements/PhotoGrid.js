import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PhotoGrid.css";
const PhotoGrid = (props) => {
  return (
    <div className="photogrid">
      {props.posts.map((post, index) => {
        var postStyle = {
          backgroundImage: `url(${post.image})`,
        };

        return (
          <div
            className="photogrid__post"
            key={index}
            style={postStyle}
            onClick={() => props.showPost(index)}
          >
            <div className="postoverlay" onClick={() => props.showPost(index)}>
              <div className="postoverlay__content">
                <div className="content_numbers">
                  <p>{post.likes.count}</p>
                  <FontAwesomeIcon
                    icon={["fas", "bone"]}
                    style={{ color: "white" }}
                    size="1x"
                  />
                </div>
                <div className="content_numbers">
                  <p>{post.comments.length} </p>
                  <FontAwesomeIcon
                    icon={["fas", "comment"]}
                    style={{ color: "white" }}
                    size="1x"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
