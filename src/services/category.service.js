import axios from "../axios";

class CategoryService {
  addCategory(categoryName) {
    return axios
      .post('category/', { categoryName })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  updateCategory(categoryId, categoryName) {
    return axios
      .put('category/', { id: categoryId, categoryName })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      }).catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  getCategoryById(categoryId) {
    return axios.get('category/' + categoryId).then((response) => {
      response.data = response.data.success;
      return response.data;
    }).catch(function (error) {
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

  deleteCategory(categoryId) {
    return axios.delete('category/' + categoryId).then((response) => {
      response.data = response.data.success;
      return response.data;
    })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

}

export default new CategoryService();