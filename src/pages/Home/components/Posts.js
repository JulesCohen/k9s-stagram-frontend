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
          `http://localhost:5000/api/posts/`
        );
        setLoadedPosts(responseData.posts);
        console.log(responseData.posts);
      } catch (error) {}
    };
    fetchPosts();
  }, [sendRequest]);

  // useEffect(() => {
  //   console.log("USE EFFECT");
  //   var pusher = new Pusher("c65d3bc16b3b7905efb1", {
  //     cluster: "us2",
  //   });
  //   var channel = pusher.subscribe("user");
  //   channel.bind("notification", function (data) {
  //     alert("Notification: " + data.message);
  //   });
  // });

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
