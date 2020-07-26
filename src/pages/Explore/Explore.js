import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PhotoGrid from "../../shared/components/UIElements/PhotoGrid";
import Spinner from "../../shared/components/UIElements/Spinner";
import Post from "../Home/components/Post";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./Explore.css";

const Explore = () => {
  const auth = useContext(AuthContext);
  const { type, query } = useParams();
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const [chosenPost, setchosenPost] = useState();
  const [showPost, setshowPost] = useState(false);

  const startRef = useRef(null);

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

  const postRef = useRef(null);

  useEffect(() => {
    if (postRef.current) {
      window.scrollTo(0, postRef.current.offsetTop - 60);
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
    <div className="explore">
      {isLoading && <Spinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />

      <div className="explore__container">
        <div className="explore__header" ref={startRef}>
          {auth.isLoggedIn && query !== "all" ? (
            <p>#{query} </p>
          ) : (
            <p>Wellcome on K9'stagram !</p>
          )}
        </div>
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
        {!isLoading && loadedPosts && showPost === false && (
          <PhotoGrid posts={loadedPosts} showPost={handleShowPost} />
        )}
        {showPost === true && (
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
                    scrollRef={index === chosenPost ? postRef : null}
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

export default Explore;
