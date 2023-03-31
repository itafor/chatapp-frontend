/* eslint-disable */
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import AuthService from "../Components/Services/AuthService";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Profile from "../Components/Profile";
import Chat from "../Components/Chat";
import Conversations from "../Components/Conversations";

class Header extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    AuthService.authUser().then((response) => {
      this.setUser(response.data.data);
    });
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar user={this.state.user} setUser={this.setUser} />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/chat" element={<Chat />} />
            <Route
              exact
              path="/engagement-conversation"
              element={<Conversations />}
            />

            <Route
              exact
              path="/profile"
              element={<Profile user={this.state.user} />}
            />
          </Routes>
        </Router>
      </React.Fragment>
    );
  }
}

export default Header;
