// import Modal from "../../shared/Modal";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Spinner from "../../shared/UIElements/Spinner";
import PhotoGrid from "./PhotoGrid";
import UserInfos from "./UserInfos";
import "./UserPage.css";
const UserPage = (props) => {
  const auth = useContext(AuthContext);
  const { uid } = useParams();
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
          `http://localhost:5000/api/users/${uid}`
        );
        setUserInfos(responseData.user);
        console.log(responseData.user);
      } catch (error) {
        alert(error);
      }
    };

    fetchInfos();
  }, [sendRequest, uid]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/users/${uid}`
        );
        setLoadedPosts(responseData.posts);
        console.log(responseData.posts);
      } catch (error) {
        alert(error);
      }
    };

    fetchPosts();
  }, [sendRequest, uid]);

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
    <div className="userpage">
      {/* <div className="userpage-content"> */}
      {isLoading && <Spinner asOverlay />}
      {!isLoading && userInfos && loadedPosts && (
        <UserInfos userInfos={userInfos} length={loadedPosts.length} />
      )}
      {!isLoading && userInfos && loadedPosts && (
        <PhotoGrid posts={loadedPosts} handleDelete={handleDelete} />
      )}
      {/* </div> */}
    </div>
  );
};

export default UserPage;
