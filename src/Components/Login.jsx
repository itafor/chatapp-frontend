/* eslint-disable */
import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthService from "./Services/AuthService";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loggedIn: false,
    message: "",
  };

  componentDidMount() {
    // console.log("user", this.props.user ? this.props.user : "no user set yet");
  }

  login = (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    AuthService.loginUser(data)
      .then((response) => {
        localStorage.setItem("token", response.data.data.access_token);
        console.log("response", response);
        this.setState({
          loggedIn: true,
        });
        this.props.setUser(response.data.user);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          this.setState({ message: error.response.data.message });
        }
      });
  };

  render() {
    if (localStorage.getItem("token")) {
      return <Navigate to="/chat" />;
    }

    if (this.state.loggedIn) {
      return <Navigate to="/chat" />;
    }

    let error = "";
    let message = this.state.message;
    if (message) {
      error = (
        <div>
          <div
            className="
        alert alert-danger"
            role="alert"
          >
            {message}
          </div>
        </div>
      );
    }

    return (
      <div>
        <br />
        <br />
        <div className="row">
          <div className="jumbotron col-lg-4 offset-lg-4">
            <h3 className="text-center">Login here</h3>
            {error}
            <form onSubmit={this.login} autoComplete="on">
              <div className="form-group">
                <label className="float-left">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  defaultValue={this.state.email}
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
              <br />
              <div className="row" style={{ padding: "20px" }}>
                <span className="float-left">
                  Forget Password? <Link to="/forget-password">Click here</Link>
                </span>
                <span className="float-right">
                  &nbsp;&nbsp; No Account? <Link to="/register">Register</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
