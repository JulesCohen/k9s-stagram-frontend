import React, { useState } from "react";
import "./Posts.css";
import Post from "./Post";

import DUMMY_POSTS from "../../DUMMY_POST";

const Posts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  const handleLike = (index) => {
    let updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
  };
  const handleDislike = (index) => {
    let updatedPosts = [...posts];
    updatedPosts[index].likes -= 1;
    setPosts(updatedPosts);
  };

  const handleComment = (index, comment) => {
    let updatedPosts = [...posts];
    let updatedComments = updatedPosts[index].comments;
    updatedComments.push({ author: "julescohen", comment: comment });
    updatedPosts.comments = updatedComments;
    setPosts(updatedPosts);
  };

  return (
    <div className="posts">
      {posts.map((post, index) => {
        return (
          <Post
            key={index}
            index={index}
            name={post.name}
            location={post.location}
            image={post.image}
            likes={post.likes}
            text={post.text}
            hashtags={post.hashtags}
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
