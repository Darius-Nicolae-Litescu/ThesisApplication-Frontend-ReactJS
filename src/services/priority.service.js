import axios from "../axios";

class PriorityService {
  addPriority(title, description, level) {
    return axios
      .post('priority/', { title, description, level })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  updatePriority(priorityId, title, description, level) {
    return axios.put('priority/', { id: priorityId, title, description, level })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  getPriorityById(priorityId) {
    return axios.get('priority/' + priorityId).then((response) => {
      response.data = response.data.success;
      return response.data;
    }).catch(function (error) {
      console.log(JSON.stringify(error))
    });
  }

  deletePriority(priorityId) {
    return axios.delete('priority/' + priorityId).then((response) => {
      response.data = response.data.success;
      return response.data;
    }).catch(function (error) {
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