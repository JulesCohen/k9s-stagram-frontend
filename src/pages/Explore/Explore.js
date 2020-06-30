import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import PhotoGrid from "../../shared/components/UIElements/PhotoGrid";
import Spinner from "../../shared/components/UIElements/Spinner";
import "./Explore.css";

const Explore = () => {
  const { type, query } = useParams();
  const [loadedPosts, setLoadedPosts] = useState();
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

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
        setLoadedPosts(responseData.posts);
        console.log(responseData.posts);
      } catch (error) {}
    };

    fetchPosts();
  }, [sendRequest, query, type]);

  return (
    <div className="explore">
      {isLoading && <Spinner asOverlay />}
      <div className="explore__header">
        {auth.isLoggedIn ? (
          <h2>Your result for : {query} </h2>
        ) : (
          <h2>Wellcome on K9'stagram !</h2>
        )}
      </div>
      {!isLoading && loadedPosts && <PhotoGrid posts={loadedPosts} />}
    </div>
  );
};

export default Explore;
