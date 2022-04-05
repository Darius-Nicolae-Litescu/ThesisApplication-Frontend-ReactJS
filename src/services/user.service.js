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

  getUserById(userId) {
    return axios
      .get(`users/${userId}`)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      });
  }

  getUserRecentActivity(id) {
    return axios.get(`users/${id}/activity`)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }
}

export default new UserService();
