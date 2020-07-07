import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import PhotoGrid from "../../shared/components/UIElements/PhotoGrid";
import Spinner from "../../shared/components/UIElements/Spinner";
import { useMediaQuery } from "react-responsive";
import Search from "../../shared/components/Header/Search";
import "./Explore.css";

const Explore = () => {
  const { type, query } = useParams();
  const [loadedPosts, setLoadedPosts] = useState();
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1100px)" });
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
      {/* {isTabletOrMobile && <Search />} */}
      {/* <Search /> */}
      <div className="explore__container">
        <div className="explore__header">
          {auth.isLoggedIn ? (
            <p>Your result for : {query} </p>
          ) : (
            <p>Wellcome on K9'stagram !</p>
          )}
        </div>
        {!isLoading && loadedPosts && <PhotoGrid posts={loadedPosts} />}
      </div>
    </div>
  );
};

export default Explore;
