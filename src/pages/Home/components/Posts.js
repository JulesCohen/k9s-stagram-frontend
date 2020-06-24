import React, { useState, useEffect, useContext } from "react";
import "./Posts.css";
import Post from "./Post";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import Spinner from "../../../shared/components/UIElements/Spinner";
import { AuthContext } from "../../../shared/context/auth-context";

const Posts = () => {
  const auth = useContext(AuthContext);
  // const [userInfos, setUserInfos] = useState();
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

  // const handleComment = async (index, comment) => {
  //   try {
  //     const formData = new FormData();

  //     // console.log(formData);

  //     formData.append("userId", auth.userId);
  //     formData.append("comment", comment);

  //     const res = await sendRequest(
  //       `http://localhost:5000/api/posts/${loadedPosts[index].id}/comments`,
  //       "POST",
  //       formData
  //     );

  //     let updatedPosts = [...loadedPosts];
  //     let updatedComments = updatedPosts[index].comments;
  //     updatedComments.push(res.comment);
  //     updatedPosts.comments = updatedComments;
  //     setLoadedPosts(updatedPosts);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  return (
    <div className="posts">
      {isLoading && <Spinner asOverlay />}
      {!isLoading &&
        loadedPosts &&
        loadedPosts.map((post, index) => {
          return (
            <Post
              key={post.id}
              postId={post.id}
              authorId={post.author.id}
              index={index}
              name={post.author.userName}
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
              // onComment={handleComment}
            />
          );
        })}
    </div>
  );
};

export default Posts;
