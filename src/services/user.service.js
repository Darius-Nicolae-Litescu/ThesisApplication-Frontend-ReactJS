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

  getBasicUserData() {
    return axios
      .get(`users/all`)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      });
  }

  getUserById(userId) {
    return axios
      .get(`users/id/${userId}`)
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

  deleteUser(userId) {
    return axios.delete(`users/${userId}`)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  getUsers(page, size) {
    const params = new URLSearchParams([['page', page - 1], ['size', size]]);

    return axios.get('users/pageable', { params })
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
