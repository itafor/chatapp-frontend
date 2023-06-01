import React from "react";
import TwitterLogin from "react-twitter-login";

export default function TwitterAuth() {
  const CONSUMER_KEY = "LkT1vYl9cnHrm65AdSpBtblis";
  const CONSUMER_SECRET = "kFkriCalWClGT8yq4AN6ywiOi1Z0HKEUWFUf284TzidHYE1vAt";
  const authHandler = (err, data) => {
    console.log(err, data);
  };
  return (
    <div>
      <TwitterLogin
        authCallback={authHandler}
        consumerKey={CONSUMER_KEY}
        consumerSecret={CONSUMER_SECRET}
      />
    </div>
  );
}
