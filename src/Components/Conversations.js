import React, { useState, useEffect } from "react";
import axios from "axios";
import "./conversations.css";
import Pusher from "pusher-js";
window.Pusher = Pusher;

export default function Conversations() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const pusher = new Pusher("e489706331cd1c16eb55", {
      cluster: "mt1",
      encrypted: true,
    });
    const channel = pusher.subscribe("engagement-conversation-created");
    channel.bind("engagement-conversations", (data) => {
      getConversions(data?.engagement);
      console.log("conversations set", conversations);
    });
  }, []);

  const getConversions = (engagementId) => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/chat/engagement/${engagementId}`)
      .then((response) => {
        console.log("engagement and conversations", response?.data);
        console.log("Only the conversations", response?.data?.conversations);
        setConversations(response?.data?.conversations);
      })
      .catch((error) => {
        console.log("converstion eror", error);
      });
  };

  const messagesLists =
    conversations &&
    conversations.map((message, key) => {
      return (
        <div className="direct-chat-messages" key={key}>
          <div className="direct-chat-msg right">
            <div className="direct-chat-info clearfix">
              <span className="direct-chat-name pull-right">
                {message?.sender?.first_name} {message?.sender?.last_name}{" "}
              </span>
              <span className="direct-chat-timestamp pull-left">
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
              </span>
            </div>

            <img
              className="direct-chat-img"
              src={`${
                message?.sender?.avatar
                  ? message?.sender?.avatar
                  : " https://img.icons8.com/color/36/000000/administrator-male.png"
              }`}
              alt="message user image"
            />
            <div className="direct-chat-text">{message?.message}</div>
          </div>
        </div>
      );
    });
  return (
    <div>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-4">
              <div className="box box-warning direct-chat direct-chat-warning">
                <div className="box-header with-border">
                  <h3 className="box-title">Engagment Conversations</h3>

                  <div className="box-tools pull-right">
                    <span
                      data-toggle="tooltip"
                      title=""
                      className="badge bg-yellow"
                      data-original-title="3 New Messages"
                    >
                      {conversations && conversations?.length}
                    </span>
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="collapse"
                    >
                      <i className="fa fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-toggle="tooltip"
                      title=""
                      data-widget="chat-pane-toggle"
                      data-original-title="Contacts"
                    >
                      <i className="fa fa-comments" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="remove"
                    >
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>

                <div className="box-body">{messagesLists}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
