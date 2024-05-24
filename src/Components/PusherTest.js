import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export default function PusherTest() {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const pusher = new Pusher("e60a7b4a12ba0e3e59f7", {
      cluster: "mt1",
      encrypted: true,
    });

    const channel = pusher.subscribe("user-logged-in-channel");
    channel.bind("user-login-event", (data) => {
      console.log("data", data);
      setDetail(data);
    });
  }, []);

  return (
    <div>
      <h2>Pusher Test</h2>
      {detail !== null ? (
        <div>
          <h2>New user just logged id</h2>
          ID: {detail && detail?.user?.id} <br />
          name: {detail && detail?.user?.full_name}
          <br />
          Email: {detail && detail?.user?.email}
          <br />
          Address: {detail && detail?.user?.address}
          <br />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
