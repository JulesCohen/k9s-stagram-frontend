import React, { useState, useEffect, useContext } from "react";
import "./Posts.css";
import Post from "../../../shared/components/UIElements/Post";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import Spinner from "../../../shared/components/UIElements/Spinner";
import { AuthContext } from "../../../shared/context/auth-context";

const Posts = () => {
  const auth = useContext(AuthContext);
  const [userInfos, setUserInfos] = useState();
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${auth.userId}`
        );
        setUserInfos(responseData.user);
        console.log(responseData.user);
      } catch (error) {}
    };
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/users/${auth.userId}`
        );
        setLoadedPosts(responseData.posts);
        console.log(responseData.posts);
      } catch (error) {}
    };
    fetchInfos();
    fetchPosts();
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

  const handleComment = (index, comment) => {
    let updatedPosts = [...loadedPosts];
    let updatedComments = updatedPosts[index].comments;
    updatedComments.push({ author: userInfos.userName, comment: comment });
    updatedPosts.comments = updatedComments;
    setLoadedPosts(updatedPosts);
  };

  return (
    <div className="posts">
      {isLoading && <Spinner asOverlay />}
      {!isLoading &&
        userInfos &&
        loadedPosts &&
        loadedPosts.map((post, index) => {
          return (
            <Post
              key={post.id}
              id={post.author.id}
              index={index}
              name={userInfos.userName}
              avatar={post.author.image}
              location={post.location}
              image={post.image}
              likes={post.likes}
              text={post.description}
              // hashtags={post.hashtags}
              date={post.date}
              comments={post.comments}
              onLike={handleLike}
              onDislike={handleDislike}
              onComment={handleComment}
            />
          );
        })}
    </div>
  );
};

export default Posts;