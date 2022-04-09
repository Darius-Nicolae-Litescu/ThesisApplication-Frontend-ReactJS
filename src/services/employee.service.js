import axios from "../axios";

class EmployeeService {
  getEmployees(page, size) {
    const params = new URLSearchParams([['page', page - 1], ['size', size]]);

    return axios.get('employee/pageable', { params })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  updateEmployee(id, personId, positionId, userId) {
    return axios.put('employee/', { id, personId, positionId, userId })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      }).catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  getEmployeeById(employeeId) {
    return axios.get('employee/' + employeeId).then((response) => {
      response.data = response.data.success;
      return response.data;
    }).catch(function (error) {
      console.log(JSON.stringify(error))
    });
  }

  getEmployeeBasicDetailsById(employeeId) {
    return axios.get('employee/basic/' + employeeId).then((response) => {
      response.data = response.data.success;
      return response.data;
    }).catch(function (error) {
      console.log(JSON.stringify(error))
    });
  }

  deleteEmployee(employeeId) {
    return axios.delete('employee/' + employeeId, null)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

}
export default new EmployeeService();