import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Header from "./shared/Header/Header";
import UserPage from "./pages/UserPage/UserPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import NewPost from "./pages/NewPost/NewPost";
import Explore from "./pages/Explore/Explore";

import BottomNav from "./shared/Header/BottomNavigation/BottomNav";
import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/explore">
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
        <Route exact path="/explore">
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
        <Header />
        {/* <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/:uid/posts">
            <UserPage />
          </Route>
          <Route exact path="/newpost">
            <NewPost />
          </Route>
          <Route exact path="/auth">
            <AuthPage />
          </Route>
          <Redirect to="/" />
        </Switch> */}
        {routes}
        <BottomNav />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
