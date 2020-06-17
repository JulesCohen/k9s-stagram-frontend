// import Modal from "../../shared/Modal";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "react-cool-img";
import Spinner from "../../shared/UIElements/Spinner";
import "./UserPage.css";

const UserPage = () => {
  const auth = useContext(AuthContext);
  // const { uid } = useParams();
  // const [showModal, setshowModal] = useState(false);
  // const [chosenPost, setchosenPost] = useState();
  const [userInfos, setUserInfos] = useState();
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // const userId = useParams().userId;

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${auth.userId}`
        );
        setUserInfos(responseData.user);
        console.log(responseData.user);
      } catch (error) {}
    };
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/users/${auth.userId}`
        );
        setLoadedPosts(responseData.posts);
        console.log(responseData.posts);
      } catch (error) {}
    };
    fetchInfos();
    fetchPosts();
  }, [sendRequest, auth.userId]);

  // const handleShowModal = (index) => {
  //   setchosenPost(index);
  //   setshowModal(true);
  // };

  // const closeModalHandler = () => {
  //   setshowModal(false);
  // };

  const handleDelete = async (deletedPostId) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${deletedPostId}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setLoadedPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== deletedPostId)
      );
    } catch (error) {}
  };

  return (
    <>
      <div className="userpage">
        {isLoading && <Spinner asOverlay />}
        {!isLoading && userInfos && loadedPosts && (
          <div className="userpage__header">
            <div className="userpage__header-logo">
              {/* <FontAwesomeIcon icon={["fas", "camera"]} /> */}
              <img
                src={userInfos.image}
                alt={`${userInfos.firstName} ${userInfos.lastName}`}
              />
            </div>
            <div className="userpage__header-content">
              <div className="userpage__header-content-user">
                <p>{userInfos.userName}</p>
                <button>Profile settings</button>
              </div>
              <div className="userpage__header-content-numbers">
                <p>
                  <span>{loadedPosts.length} </span>
                  posts
                </p>
                <p>
                  <span>{userInfos.followers.length}</span> followers
                </p>
                <p>
                  <span>{userInfos.followings.length}</span> following
                </p>
              </div>
              <div className="userpage__header-content-description">
                <p>
                  {userInfos.firstName} {userInfos.lastName}
                </p>
                <p>Dog Lover !!</p>
              </div>
            </div>
          </div>
        )}

        {!isLoading && loadedPosts && (
          <div className="userpage__grid">
            {loadedPosts.map((post, index) => (
              <div className="userpage__grid-post" key={index}>
                <div
                  className="post-overlay"
                  onClick={() => handleDelete(post.id)}
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
                <img src={post.image} alt="post" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
