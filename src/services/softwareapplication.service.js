import axios from "../axios";

class SoftwareApplicationService {
  addSoftwareApplication(name, description) {
    return axios
      .post('softwareapplication/', {
        data: {
          name,
          description
        }
      })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  getAllSoftwareApplications() {
    return axios.get('softwareapplication/').then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

}

export default new SoftwareApplicationService();