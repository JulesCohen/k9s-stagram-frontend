import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home/Home";

import Header from "./shared/components/Header/Header";
import UserPage from "./pages/UserPage/UserPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import NewPost from "./pages/NewPost/NewPost";
import Explore from "./pages/Explore/Explore";
import SwitchMode from "./shared/components/UIElements/SwitchMode";

import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";
import { Mode, useLightSwitch } from "use-light-switch";
// import { CSSTransition } from "react-transition-group";

import "./App.css";
const App = () => {
  const mode = useLightSwitch();
  const { token, login, logout, userId } = useAuth();

  document.getElementsByTagName("body")[0].style.backgroundColor =
    mode === Mode.Dark ? "rgb(34, 34, 34)" : "rgb(250, 250, 250)";

  let routes;

  // console.log("APP RENDER");

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/explore/:type/:query">
          <Explore />
        </Route>
        <Route exact path="/:uid/posts">
          <UserPage />
        </Route>
        <Route exact path="/newpost">
          <NewPost />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/explore/:type/:query">
          <Explore />
        </Route>
        <Route exact path="/auth">
          <AuthPage />
        </Route>
        <Redirect to="/explore" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <div
          className={`${
            mode === Mode.Dark ? "dark-theme app" : "light-theme app"
          }`}
          id="app"
        >
          <SwitchMode />

          <Header />
          <main>{routes}</main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
