import axios from "../axios";

class PriorityService {
  addPriority(title, description, level) {
    return axios
      .post('priority/', {
        data: {
          title,
          description,
          level
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

  getAllPriorities() {
    return axios.get('priority/').then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

}

export default new PriorityService();