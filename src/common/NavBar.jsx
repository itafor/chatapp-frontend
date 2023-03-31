/* eslint-disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  logout = () => {
    localStorage.removeItem("token");
    this.props.setUser(null);
  };

  render() {
    let button;
    let profile;
    let chat;
    if (localStorage.getItem("token")) {
      button = (
        <div>
          <Link className="nav-link" to="/" onClick={this.logout}>
            Logout
          </Link>
        </div>
      );
      chat = (
        <div>
          <Link className="nav-link" to="/chat">
            Send message
          </Link>
        </div>
      );
      profile = (
        <div>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </div>
      );
    } else {
      button = (
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/engagement-conversation">
                Engagemnet conversations
              </Link>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Let's talk
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>

              <li className="nav-item">{profile}</li>
            </ul>
            <span className="navbar-text">{button}</span>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
