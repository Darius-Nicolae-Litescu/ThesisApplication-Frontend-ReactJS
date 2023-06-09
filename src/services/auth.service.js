import axios from "../axios";
import { setUserToLocalStorage } from "../common/auth-verify";
class AuthService {
  login(username, password) {
    return axios
      .post("users/login", {
        username,
        password,
      })
      .then((response) => {
        const loginResponse = response.data.success;
        if (loginResponse && loginResponse.jwtToken) {
          if (setUserToLocalStorage(loginResponse)) {
            return loginResponse;
          }
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  register(username, email, password) {
    return axios.post("users/signup", {
      username,
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
