import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import PhotoGrid from "../../shared/components/UIElements/PhotoGrid";
import Posts from "../Home/components/Posts";
import Spinner from "../../shared/components/UIElements/Spinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import GridSwitch from "../../shared/components/UIElements/GridSwitch";
import "./Explore.css";

const Explore = () => {
  const auth = useContext(AuthContext);
  const { type, query } = useParams();
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [chosenPost, setchosenPost] = useState();
  const [showPost, setshowPost] = useState(false);
  const startRef = useRef(null);
  const postRef = useRef(null);

  useEffect(() => {
    let request;
    if (type === "hashtag") {
      request = `${process.env.REACT_APP_BACKEND_URL}/posts/hashtag/${query}`;
    }
    if (type === "allPosts") {
      request = `${process.env.REACT_APP_BACKEND_URL}/posts/`;
    }

    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(request);
        setLoadedPosts(responseData.posts.reverse());
      } catch (error) {}
    };

    fetchPosts();
    setshowPost(false);
  }, [sendRequest, query, type]);

  const handleShowPost = (index) => {
    setchosenPost(index);
    setshowPost(true);
  };

  return (
    <div className="explore">
      {isLoading && <Spinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />

      <div className="explore__container">
        <div className="explore__header" ref={startRef}>
          {auth.isLoggedIn && query !== "all" ? (
            <p>#{query} </p>
          ) : (
            <p>Welcome on K9'stagram !</p>
          )}
        </div>
        <GridSwitch
          chosenPost={chosenPost}
          setchosenPost={setchosenPost}
          setshowPost={setshowPost}
          startRef={startRef}
        />

        {!isLoading && loadedPosts && !showPost && (
          <PhotoGrid posts={loadedPosts} showPost={handleShowPost} />
        )}
        {showPost && (
          <Posts
            loadedPosts={loadedPosts}
            setLoadedPosts={setLoadedPosts}
            isLoading={isLoading}
            chosenPost={chosenPost ? chosenPost : -1}
            postRef={postRef}
          ></Posts>
        )}
      </div>
    </div>
  );
};

export default Explore;
