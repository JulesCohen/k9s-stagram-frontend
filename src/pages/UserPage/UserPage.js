import React from "react";
import { useParams } from "react-router-dom";

import DUMMY_POSTS from "../../DUMMY_POST";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./UserPage.css";

const UserPage = () => {
  const { uid } = useParams();

  return (
    <div className="userpage">
      <div className="userpage__header">HEADER</div>
      <div className="userpage__grid">
        {DUMMY_POSTS.filter((post) => {
          return post.id === uid;
        }).map((post) => (
          <div className="userpage__grid-post">
            <div className="post-overlay">
              <div className="post-overlay-content">
                <p>{post.likes}</p>
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
            <img src={post.image}></img>
          </div>
        ))}
        {DUMMY_POSTS.filter((post) => {
          return post.id === uid;
        }).map((post) => (
          <div className="userpage__grid-post">
            <div className="post-overlay">
              <div className="post-overlay-content">
                <p>{post.likes}</p>
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
            <img src={post.image}></img>
          </div>
        ))}
        {DUMMY_POSTS.filter((post) => {
          return post.id === uid;
        }).map((post) => (
          <div className="userpage__grid-post">
            <div className="post-overlay">
              <div className="post-overlay-content">
                <p>{post.likes}</p>
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
            <img src={post.image}></img>
          </div>
        ))}
        {DUMMY_POSTS.filter((post) => {
          return post.id === uid;
        }).map((post) => (
          <div className="userpage__grid-post">
            <div className="post-overlay">
              <div className="post-overlay-content">
                <p>{post.likes}</p>
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
            <img src={post.image}></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
