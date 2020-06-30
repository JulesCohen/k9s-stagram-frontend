import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Post from "./Post";
import Spinner from "../../../shared/components/UIElements/Spinner";
import "./Posts.css";

const Posts = () => {
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/`
        );
        setLoadedPosts(responseData.posts);
        console.log(responseData.posts);
      } catch (error) {}
    };
    fetchPosts();
  }, [sendRequest]);

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
