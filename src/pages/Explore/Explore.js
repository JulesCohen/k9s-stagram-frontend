import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";

import PhotoGrid from "../UserPage/PhotoGrid";
import Spinner from "../../shared/UIElements/Spinner";

const Explore = () => {
  const { type, query } = useParams();
  const [loadedPosts, setLoadedPosts] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    let request;
    if (type === "hashtag") {
      request = `http://localhost:5000/api/posts/hashtag/${query}`;
    }
    // if (type === "allPosts") {
    //   request = `http://localhost:5000/api/posts/hashtag/${query}`
    // }

    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(request);
        setLoadedPosts(responseData.posts);
        console.log(responseData.posts);
      } catch (error) {}
    };

    fetchPosts();
  }, [sendRequest]);

  return (
    <div>
      {isLoading && <Spinner asOverlay />}
      <h1>{type}</h1>
      <h1>{query}</h1>
      {!isLoading && loadedPosts && <PhotoGrid posts={loadedPosts} />}
    </div>
  );
};

export default Explore;
