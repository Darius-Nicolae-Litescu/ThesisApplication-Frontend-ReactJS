import axios from "../axios";


class UserService {
  whoami() {
    return axios
      .get("users/whoami")
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      });
  }
}

export default new UserService();
