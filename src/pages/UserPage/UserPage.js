import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../shared/context/auth-context";
import Spinner from "../../shared/components/UIElements/Spinner";
import PhotoGrid from "../../shared/components/UIElements/PhotoGrid";
import UserInfos from "./components/UserInfos";
import Post from "../Home/components/Post";
import "./UserPage.css";

const UserPage = (props) => {
  const auth = useContext(AuthContext);
  const { uid } = useParams();
  const [chosenPost, setchosenPost] = useState();
  const [showPost, setshowPost] = useState(false);
  const [userInfos, setUserInfos] = useState();
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  const startRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${uid}`
        );
        setUserInfos(responseData.user);
        setLoadedPosts(responseData.user.posts.reverse());

        setshowPost(false);
      } catch (error) {
        alert(error);
      }
    };

    fetchUser();
  }, [sendRequest, uid]);

  const handleShowPost = (index) => {
    setchosenPost(index);
    setshowPost(true);
  };

  const handleLike = (index) => {
    let updatedPosts = [...loadedPosts];
    updatedPosts[index].likes += 1;
    setLoadedPosts(updatedPosts);
  };
  const handleDislike = (index) => {
    let updatedPosts = [...loadedPosts];
    updatedPosts[index].likes -= 1;
    setLoadedPosts(updatedPosts);
  };

  const myRef = useRef(null);

  useEffect(() => {
    if (myRef.current) {
      window.scrollTo(0, myRef.current.offsetTop - 60);
    }
  });

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
    } catch (err) {}
  };

  return (
    <div className="userpage">
      <div className="userpage__container" ref={startRef}>
        {isLoading && <Spinner asOverlay />}
        {!isLoading && userInfos && loadedPosts && (
          <UserInfos userInfos={userInfos} length={loadedPosts.length} />
        )}
        <div className="grid-switch">
          <button
            onClick={() => {
              setchosenPost(null);
              setshowPost(false);
              window.scrollTo(0, startRef.current.offsetTop - 100);
            }}
          >
            <FontAwesomeIcon icon={["fas", "th"]} size="2x" />
          </button>
          <button
            onClick={() => {
              setshowPost(true);
              !chosenPost &&
                window.scrollTo(0, startRef.current.offsetTop - 100);
            }}
          >
            <FontAwesomeIcon icon={["fas", "portrait"]} size="2x" />
          </button>
        </div>
        {!isLoading && userInfos && loadedPosts && !showPost && (
          <PhotoGrid posts={loadedPosts} showPost={handleShowPost} />
        )}
        {showPost && (
          <div className="posts">
            {isLoading && <Spinner asOverlay />}
            {!isLoading &&
              loadedPosts &&
              loadedPosts.map((post, index) => {
                return (
                  <Post
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    scrollRef={index === chosenPost ? myRef : null}
                    onDelete={handleDelete}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
