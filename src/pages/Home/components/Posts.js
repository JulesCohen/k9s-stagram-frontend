import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import Post from "./Post";
import Spinner from "../../../shared/components/UIElements/Spinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import Button from "../../../shared/components/FormElements/Button";
import "./Posts.css";

import { useHistory } from "react-router-dom";

const Posts = () => {
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

  return (
    <div className="posts">
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
            />
          );
        })}
    </div>
  );
};

export default Posts;
