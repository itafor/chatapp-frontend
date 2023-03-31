import React, { useState, useEffect } from "react";
import axios from "axios";
import "./conversations.css";
import Pusher from "pusher-js";
window.Pusher = Pusher;

export default function OfferConversations() {
  useEffect(() => {
    const pusher = new Pusher("e489706331cd1c16eb55", {
      cluster: "mt1",
      encrypted: true,
    });
    const channel = pusher.subscribe("engagement-conversation-created");
    channel.bind("engagement-conversations", (data) => {
      getConversions(data?.engagement);
    });
  }, []);

  const getConversions = (engagementId) => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/chat/engagement/${engagementId}`)
      .then((response) => {
        console.log("engagement and conversations", response?.data);
        console.log("Only the conversations", response?.data?.conversations);
      })
      .catch((error) => {
        console.log("converstion eror", error);
      });
  };
  return (
    <div>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-4">
              <div className="box box-warning direct-chat direct-chat-warning">
                <div className="box-header with-border">
                  <h3 className="box-title">Chat Messages</h3>

                  <div className="box-tools pull-right">
                    <span
                      data-toggle="tooltip"
                      title=""
                      className="badge bg-yellow"
                      data-original-title="3 New Messages"
                    >
                      20
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

                <div className="box-body">
                  <div className="direct-chat-messages">
                    <div className="direct-chat-msg">
                      <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-left">
                          Timona Siera
                        </span>
                        <span className="direct-chat-timestamp pull-right">
                          23 Jan 2:00 pm
                        </span>
                      </div>

                      <img
                        className="direct-chat-img"
                        src="https://img.icons8.com/color/36/000000/administrator-male.png"
                        alt="message user image"
                      />

                      <div className="direct-chat-text">
                        For what reason would it be advisable for me to think
                        about business content?
                      </div>
                    </div>

                    <div className="direct-chat-msg right">
                      <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-right">
                          Sarah Bullock
                        </span>
                        <span className="direct-chat-timestamp pull-left">
                          23 Jan 2:05 pm
                        </span>
                      </div>

                      <img
                        className="direct-chat-img"
                        src="https://img.icons8.com/office/36/000000/person-female.png"
                        alt="message user image"
                      />

                      <div className="direct-chat-text">
                        Thank you for your believe in our supports
                      </div>
                    </div>

                    <div className="direct-chat-msg">
                      <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-left">
                          Timona Siera
                        </span>
                        <span className="direct-chat-timestamp pull-right">
                          23 Jan 5:37 pm
                        </span>
                      </div>

                      <img
                        className="direct-chat-img"
                        src="https://img.icons8.com/color/36/000000/administrator-male.png"
                        alt="message user image"
                      />

                      <div className="direct-chat-text">
                        For what reason would it be advisable for me to think
                        about business content?
                      </div>
                    </div>

                    <div className="direct-chat-msg right">
                      <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-right">
                          Sarah Bullock
                        </span>
                        <span className="direct-chat-timestamp pull-left">
                          23 Jan 6:10 pm
                        </span>
                      </div>

                      <img
                        className="direct-chat-img"
                        src="https://img.icons8.com/office/36/000000/person-female.png"
                        alt="message user image"
                      />

                      <div className="direct-chat-text">I would love to.</div>
                    </div>
                  </div>
                </div>

                <div className="box-footer">
                  <form action="#" method="post">
                    <div className="input-group">
                      <input
                        type="text"
                        name="message"
                        placeholder="Type Message ..."
                        className="form-control"
                      />
                      <span className="input-group-btn">
                        <button
                          type="button"
                          className="btn btn-warning btn-flat"
                        >
                          Send
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
