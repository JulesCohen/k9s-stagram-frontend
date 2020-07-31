import Posts from "./components/Posts";
import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom";

// import Spinner from "../../../shared/components/UIElements/Spinner";

import Button from "../../shared/components/FormElements/Button";
import "./Home.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Home = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [loadedPosts, setLoadedPosts] = useState(false);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/followed/${auth.userId}`
        );
        setLoadedPosts(responseData.posts.reverse());
      } catch (error) {}
    };
    if (auth.userId) {
      fetchPosts();
    }
  }, [sendRequest, auth.userId]);

  return (
    <div className="home">
      <ErrorModal error={error} onClear={clearError} />
      {loadedPosts.length === 0 && (
        <div className="posts__header">
          <p>Not following anyone yet ? </p>
          <Button
            onClick={() => {
              history.push("explore/allPosts/all");
            }}
          >
            EXPLORE
          </Button>
        </div>
      )}
      <Posts
        loadedPosts={loadedPosts}
        setLoadedPosts={setLoadedPosts}
        isLoading={isLoading}
      ></Posts>
    </div>
  );
};

export default Home;
