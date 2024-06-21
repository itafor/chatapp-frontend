/* eslint-disable */
import React, { useState, useEffect } from "react";

import OneSignal from "react-onesignal";

// import firebase from "firebase";
<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase.js"></script>;

const firebaseConfig = {
  apiKey: "AIzaSyBpJBCbY81LCecVr77cs8VcHmq7CJqjVtA",
  authDomain: "quiz-e3a9c.firebaseapp.com",
  databaseURL: "https://quiz-e3a9c.firebaseio.com",
  projectId: "quiz-e3a9c",
  storageBucket: "quiz-e3a9c.appspot.com",
  messagingSenderId: "1004736774362",
  appId: "1:1004736774362:web:58cf736a5900c11ef525e3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Initialize Firebase Cloud Messaging and get a reference to the service

export default function Home() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    runOneSignal();
    // messaging
    //   .requestPermission()
    //   .then(() => {
    //     return messaging.getToken();
    //   })
    //   .then((token) => {
    //     //store users tokens
    //     console.log("token: ", token);
    //   })
    //   .catch((err) => {
    //     console.log("fcm error: ", err);
    //   });
  }, []);

  // function initiallizeOneSignal() {
  //   OneSignal.init({ appId: "ee9b85aa-0861-41a4-a118-cf52de1d75e7" }).then(
  //     () => {
  //       setInitialized(true);
  //       OneSignal.Slidedown.promptPush();
  //       // do other stuff
  //     }
  //   );
  // }

  async function runOneSignal() {
    await OneSignal.init({
      appId: "ee9b85aa-0861-41a4-a118-cf52de1d75e7",
      allowLocalhostAsSecureOrigin: true,
    });
    OneSignal.Slidedown.promptPush();
  }

  return (
    <div>
      <div className="page-content page-container" id="page-content"></div>
    </div>
  );
}
