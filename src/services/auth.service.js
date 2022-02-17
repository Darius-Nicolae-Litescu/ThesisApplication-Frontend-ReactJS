import axios from "../axios";

class AuthService {
  login(username, password) {
    return axios
      .post("users/login", null, { params: {
        username,
        password
      }})
      .then((response) => {
        response.data = response.data.success;
        if (response.data.jwtToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
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