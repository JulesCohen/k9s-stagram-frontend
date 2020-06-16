import React, { useState } from "react";
import { useParams } from "react-router-dom";

import DUMMY_POSTS from "../../DUMMY_POST";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "../../shared/Modal";
import "./UserPage.css";

const UserPage = () => {
  const { uid } = useParams();
  const [showModal, setshowModal] = useState(false);
  const [chosenPost, setchosenPost] = useState();

  const userPosts = () => {
    const posts = DUMMY_POSTS.filter((post) => {
      return post.id === uid;
    });
    return posts;
  };

  const userInfos = () => {
    return {
      name: userPosts()[0].name,
      firstName: userPosts()[0].firstName,
      lastName: userPosts()[0].lastName,
      nbPosts: userPosts().length,
    };
  };

  const handleShowModal = (index) => {
    setchosenPost(index);
    setshowModal(true);
  };

  const closeModalHandler = () => {
    setshowModal(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        post={userPosts()[chosenPost]}
      >
        <h1>MODAL</h1>
      </Modal>
      <div className="userpage">
        <div className="userpage__header">
          <div className="userpage__header-logo">
            <FontAwesomeIcon icon={["fas", "camera"]} />
          </div>
          <div className="userpage__header-content">
            <div className="userpage__header-content-user">
              <p>{userInfos().name}</p>
              <button onClick={handleShowModal}>Profile settings</button>
            </div>
            <div className="userpage__header-content-numbers">
              <p>
                <span>{userPosts().length} </span>
                posts
              </p>
              <p>
                <span>253</span> followers
              </p>
              <p>
                <span>178</span> following
              </p>
            </div>
            <div className="userpage__header-content-description">
              <p>
                {userInfos().firstName} {userInfos().lastName}
              </p>
              <p>Dog Lover !!</p>
            </div>
          </div>
        </div>

        <div className="userpage__grid">
          {userPosts().map((post, index) => (
            <>
              <div className="userpage__grid-post">
                <div
                  className="post-overlay"
                  onClick={() => handleShowModal(index)}
                >
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
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPage;
