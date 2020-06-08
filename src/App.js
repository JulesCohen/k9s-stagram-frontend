import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Header from "./shared/Header/Header";
import UserPage from "./pages/UserPage/UserPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import NewPost from "./pages/NewPost/NewPost";
import BottomNav from "./shared/Header/BottomNavigation/BottomNav";
const App = () => {
  return (
    <Router>
      <Header></Header>
      <Switch>
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
      </Switch>
      <BottomNav />
    </Router>
  );
};

export default App;
