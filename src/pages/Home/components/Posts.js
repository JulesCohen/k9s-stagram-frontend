import React, { useContext, useEffect } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import Spinner from "../../../shared/components/UIElements/Spinner";
import Post from "./Post";
import "./Posts.css";

const Posts = ({
  loadedPosts,
  setLoadedPosts,
  isLoading,
  chosenPost,
  postRef,
}) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

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
              onDelete={handleDelete}
              scrollRef={index === chosenPost ? postRef : null}
            />
          );
        })}
    </div>
  );
};

export default Posts;
