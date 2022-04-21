import axios from "../axios";

class SoftwareApplicationService {
  addSoftwareApplication(name, description) {
    return axios
      .post("softwareapplication/", { name, description })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  updateSoftwareApplication(softwareApplicationId, name, description) {
    return axios
      .put("softwareapplication", {
        id: softwareApplicationId,
        name,
        description,
      })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  deleteSoftwareApplication(softwareApplicationId) {
    return axios
      .delete("softwareapplication/" + softwareApplicationId)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  getSoftwareApplicationById(softwareApplicationId) {
    return axios
      .get("softwareapplication/" + softwareApplicationId)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  getAllSoftwareApplications() {
    return axios
      .get("softwareapplication/")
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }
}

export default new SoftwareApplicationService();
