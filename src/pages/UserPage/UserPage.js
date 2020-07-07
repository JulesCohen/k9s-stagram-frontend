// import Modal from "../../shared/Modal";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Spinner from "../../shared/components/UIElements/Spinner";

import PhotoGrid from "../../shared/components/UIElements/PhotoGrid";
import UserInfos from "./components/UserInfos";
import "./UserPage.css";

const UserPage = (props) => {
  const auth = useContext(AuthContext);
  const { uid } = useParams();
  // const [showModal, setshowModal] = useState(false);
  // const [chosenPost, setchosenPost] = useState();
  const [userInfos, setUserInfos] = useState();
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${uid}`
        );
        setUserInfos(responseData.user);
        setLoadedPosts(responseData.user.posts);
        console.log(responseData.user);
      } catch (error) {
        alert(error);
      }
    };

    fetchUser();
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
      <div className="userpage__container">
        {isLoading && <Spinner asOverlay />}
        {!isLoading && userInfos && loadedPosts && (
          <UserInfos userInfos={userInfos} length={loadedPosts.length} />
        )}
        {!isLoading && userInfos && loadedPosts && (
          <PhotoGrid posts={loadedPosts} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default UserPage;
