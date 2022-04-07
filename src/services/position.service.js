import axios from "../axios";

class PositionService {
  addPosition(name, seniorityLevel) {
    return axios
      .post('position/', {
        data: {
          name,
          seniorityLevel
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

  getAllPositions() {
    return axios.get('position/').then((response) => {
      response.data = response.data.success;
      return response.data;
    })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

}

export default new PositionService();