/* eslint-disable */
import axios from "axios";
export default axios.create({
  baseURL: "https://www.nativebrands.cloud",
  // baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-type": "application/json",
  },
});
