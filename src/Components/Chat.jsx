/* eslint-disable */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "./Services/AuthService";

import Echo from "laravel-echo";

import Pusher from "pusher-js";
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "local",
  cluster: "mt1",
  wsHost: "https://sbf.getshopeasy.com", //window.location.hostname, //"127.0.0.1",
  wsPort: 6001,
  disableStats: true,
  forceTLS: false,
});

class Chat extends Component {
  state = {
    loggedIn: false,
    receiver_id: "",
    message: "",
    usersMessages: [],
    user: {},
    users: [],
    get_receiver_id: "",
    receverDetails: "",
  };

  componentDidMount() {
    this.getUser();
    this.getMessages();
    this.getUsers();
  }

  getUser() {
    AuthService.authUser().then((response) => {
      this.setState({ user: response.data.data });
    });
  }

  getUsers() {
    AuthService.getAllUsers().then((response) => {
      this.setState({ users: response.data.data });
    });
  }

  getMessages() {
    window.Echo.channel("chat").listen("MessageSent", (event) => {
      console.log("event message", event);
      this.setState({
        usersMessages: event,
      });
    });
  }

  getAllMessages = (userId) => {
    AuthService.getUsersMessages(userId)
      .then((response) => {
        this.setState({
          usersMessages: response.data.data,
          get_receiver_id: userId,
        });

        this.getReceiverDetails(userId);
      })
      .catch((error) => {
        console.log("eror", error.response);
      });
  };

  getReceiverDetails = (userId) => {
    AuthService.getUserById(userId)
      .then((response) => {
        this.setState({ receverDetails: response.data });
        console.log("receiver", response.data);
      })
      .catch((error) => {
        console.log("eror", error.response);
      });
  };

  submitMessage = (event) => {
    event.preventDefault();
    const data = {
      receiver_id: this.state.get_receiver_id,
      message: this.state.message,
    };
    AuthService.sendMessage(data)
      .then((response) => {
        this.setState({
          loggedIn: true,
        });
        document.getElementById("message_body").value = "";
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          this.setState({ errorMessage: error.response.data.message });
        }
      });
  };

  render() {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" />;
    }

    let error = "";
    let errorMessage = this.state.errorMessage;
    if (errorMessage) {
      error = (
        <div>
          <div
            className="
        alert alert-danger"
            role="alert"
          >
            {errorMessage}
          </div>
        </div>
      );
    }

    const { usersMessages, users, get_receiver_id } = this.state;
    const { id, first_name, last_name } = this.state.user;

    const usersLists =
      users &&
      users.map((user) => {
        return (
          <div key={user.id}>
            {id !== user.id ? (
              <a
                href="#"
                onClick={() => this.getAllMessages(user.id)}
                className="list-group-item list-group-item-action border-0"
              >
                <div className="d-flex align-items-start mb-2">
                  <img
                    src={
                      user.profile_photo_url
                        ? user.profile_photo_url
                        : "https://bootdey.com/img/Content/avatar/avatar5.png"
                    }
                    className="rounded-circle mr-1"
                    alt="Fiona Green"
                    width={40}
                    height={40}
                  />
                  <div className="flex-grow-1" style={{ padding: "5px" }}>
                    {user.first_name} {user.last_name}
                    {/* <div className="small">
                  <span className="fas fa-circle chat-offline" /> Offline
                </div> */}
                  </div>
                </div>
              </a>
            ) : (
              <span></span>
            )}
          </div>
        );
      });

    const messagesLists =
      usersMessages &&
      usersMessages.map((message) => {
        return (
          <div key={message.id} className="chat-messages p-4">
            {id == message.sender.id ? (
              <div className="chat-message-right pb-4">
                <div>
                  <img
                    src={
                      message.sender && message.sender.profile_photo_url
                        ? message.sender.profile_photo_url
                        : "https://bootdey.com/img/Content/avatar/avatar1.png"
                    }
                    className="rounded-circle mr-1"
                    alt="Chris Wood"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div className="font-weight-bold mb-1">
                    You ({message.sender && message.sender.first_name}{" "}
                    {message.sender && message.sender.last_name})
                    <div className="text-muted small text-nowrap mt--2">
                      {new Date(message.created_at).getDate() +
                        "/" +
                        new Date(message.created_at).getMonth() +
                        "/" +
                        new Date(message.created_at).getFullYear() +
                        "  " +
                        new Date(message.created_at).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                    </div>
                  </div>
                  {message.message}
                </div>
              </div>
            ) : (
              <div className="chat-message-left pb-4">
                <div>
                  <img
                    src={
                      message.sender && message.sender.profile_photo_url
                        ? message.sender.profile_photo_url
                        : "https://bootdey.com/img/Content/avatar/avatar3.png"
                    }
                    className="rounded-circle mr-1"
                    alt="Sharon Lessman"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div className="font-weight-bold mb-1">
                    {message.sender && message.sender.first_name}{" "}
                    {message.sender && message.sender.last_name}
                    <div className="text-muted small text-nowrap mt--2">
                      {new Date(message.created_at).getDate() +
                        "/" +
                        new Date(message.created_at).getMonth() +
                        "/" +
                        new Date(message.created_at).getFullYear() +
                        "  " +
                        new Date(message.created_at).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                    </div>
                  </div>
                  {message.message}
                </div>
              </div>
            )}
          </div>
        );
      });

    return (
      <main className="content">
        <div className="container p-0">
          {error}
          <span className="small">
            Welcome{" "}
            <strong>
              {first_name} {last_name}
            </strong>
            {". Plesse select a user to chat with"}
          </span>
          <h1 className="h3 mb-3">Users </h1>
          <div className="card">
            <div className="row g-0">
              <div className="col-12 col-lg-5 col-xl-3 border-right">
                <div className="px-4 d-none d-md-block">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </div>

                {usersLists}
                <hr className="d-block d-lg-none mt-1 mb-0" />
              </div>
              {get_receiver_id ? (
                <div className="col-12 col-lg-7 col-xl-9">
                  <div className="py-2 px-4 border-bottom d-none d-lg-block">
                    <div className="d-flex align-items-center py-1">
                      <div className="position-relative">
                        <img
                          src={
                            this.state.receverDetails.profile_photo_url
                              ? this.state.receverDetails.profile_photo_url
                              : "https://bootdey.com/img/Content/avatar/avatar3.png"
                          }
                          className="rounded-circle mr-1"
                          alt="Sharon Lessman"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div
                        className="flex-grow-1 pl-3"
                        style={{ padding: "5px" }}
                      >
                        <strong>
                          {this.state.receverDetails.first_name}{" "}
                          {this.state.receverDetails.last_name}
                        </strong>
                        <div className="text-muted small">
                          <em>Typing...</em>
                        </div>
                      </div>
                    </div>
                  </div>
                  {messagesLists}
                  <div className="flex-grow-0 py-3 px-4 border-top">
                    <form onSubmit={this.submitMessage} autoComplete="on">
                      <div className="form-group">
                        <input
                          placeholder="Type a receiver id"
                          type="hidden"
                          name="receiver_id"
                          className="form-control"
                          defaultValue={get_receiver_id}
                          onChange={(event) =>
                            this.setState({ receiver_id: event.target.value })
                          }
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <input
                          id="message_body"
                          placeholder="Type a message"
                          type="text"
                          name="message"
                          className="form-control"
                          defaultValue={this.state.message}
                          onChange={(event) =>
                            this.setState({ message: event.target.value })
                          }
                        />
                        <button type="submit" className="btn btn-primary">
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Chat;
