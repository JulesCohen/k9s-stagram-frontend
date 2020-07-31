import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Spinner from "../../shared/components/UIElements/Spinner";
import GridSwitch from "../../shared/components/UIElements/GridSwitch";
import PhotoGrid from "../../shared/components/UIElements/PhotoGrid";
import Posts from "../Home/components/Posts";
import UserInfos from "./components/UserInfos";
import Button from "../../shared/components/FormElements/Button";
import "./UserPage.css";

const UserPage = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { uid } = useParams();
  const [chosenPost, setchosenPost] = useState();
  const [showPost, setshowPost] = useState(false);
  const [userInfos, setUserInfos] = useState();
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  const startRef = useRef(null);
  const postRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${uid}`
        );
        setUserInfos(responseData.user);
        setLoadedPosts(responseData.user.posts.reverse());

        setshowPost(false);
      } catch (error) {
        alert(error);
      }
    };

    fetchUser();
  }, [sendRequest, uid]);

  const handleShowPost = (index) => {
    setchosenPost(index);
    setshowPost(true);
  };

  return (
    <div className="userpage">
      <div className="userpage__container" ref={startRef}>
        {isLoading && <Spinner asOverlay />}
        {!isLoading && userInfos && loadedPosts && (
          <UserInfos userInfos={userInfos} length={loadedPosts.length} />
        )}

        {!isLoading && userInfos && loadedPosts && (
          <>
            <div className="posts__header">
              {auth.userId === userInfos.id && loadedPosts.length === 0 && (
                <p>Start posting !! </p>
              )}
              {auth.userId === userInfos.id && (
                <Button
                  onClick={() => {
                    history.push("/newPost");
                  }}
                >
                  New Post
                </Button>
              )}
            </div>

            {loadedPosts.length > 0 && (
              <GridSwitch
                chosenPost={chosenPost}
                setchosenPost={setchosenPost}
                setshowPost={setshowPost}
                startRef={startRef}
              />
            )}
          </>
        )}

        {!isLoading && userInfos && loadedPosts && !showPost && (
          <PhotoGrid posts={loadedPosts} showPost={handleShowPost} />
        )}
        {showPost && (
          <Posts
            loadedPosts={loadedPosts}
            setLoadedPosts={setLoadedPosts}
            isLoading={isLoading}
            chosenPost={chosenPost ? chosenPost : -1}
            postRef={postRef}
          ></Posts>
        )}
      </div>
    </div>
  );
};

export default UserPage;
