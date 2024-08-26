/* eslint-disable */
import http from "../Util";
import AuthHeader from "./AuthHeader";

class AuthService {
  loginUser(data) {
    return http.post("/user/auth/login", data);
  }

  getSalesReview(data) {
    return http.post("/admin/dashboard-total-mtn-sales", data);
  }

  sendMessage(data) {
    return http.post("/user/chat/send-message", data, {
      headers: AuthHeader(),
    });
  }

  register(data) {
    return http.post("/user/auth/register", data);
  }

  authUser() {
    return http.get("/user/profile", { headers: AuthHeader() });
  }

  getUsersMessages(userId) {
    return http.get(`/user/chat/btw-two-users/messages/${userId}`, {
      headers: AuthHeader(),
    });
  }

  getUserById(userId) {
    return http.get(`/user/get/user/${userId}`, {
      headers: AuthHeader(),
    });
  }

  getAllUsers() {
    return http.get("/user/get/all-users", { headers: AuthHeader() });
  }
}

export default new AuthService();
