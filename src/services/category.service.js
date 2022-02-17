import axios from "../axios";

class CategoryService {
  addCategory(categoryName) {
    return axios
      .post('category/', {
        data: {
          categoryName
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

  getAllCategories() {
    return axios.get('category/').then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

}

export default new CategoryService();