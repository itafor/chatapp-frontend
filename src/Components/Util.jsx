/* eslint-disable */
import axios from "axios";
export default axios.create({
  // baseURL: "https://sbf.getshopeasy.com/api/v1",
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});
