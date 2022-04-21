import axios from "../axios";

class PositionService {
  addPosition(name, seniorityLevel) {
    return axios
      .post("position/", { name, seniorityLevel })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  updatePosition(positionId, name, seniorityLevel) {
    return axios
      .put("position/" + positionId, { name, seniorityLevel })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  getPositionById(positionId) {
    return axios
      .get("position/" + positionId)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  deletePosition(positionId) {
    return axios
      .delete("position/" + positionId)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  getAllPositions() {
    return axios
      .get("position/")
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }
}

export default new PositionService();
