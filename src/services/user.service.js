import axios from "../axios";

const API_URL = "http://localhost:8080/api/position/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL)
    .then((response) => {
      response.data = response.data.success;
      return response.data;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error))
    });
   }

  getUserBoard() {
    return axios.get(API_URL + "user");
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod");
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin");
  }
}

export default new UserService();
