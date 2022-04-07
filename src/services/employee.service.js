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

}
export default new EmployeeService();