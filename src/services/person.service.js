import axios from "../axios";

class PersonService {
  getPersons(page, size) {
    const params = new URLSearchParams([['page', page - 1], ['size', size]]);

    return axios.get('person/pageable', { params })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  addPerson(firstName, lastName, birthDate) {
    return axios.post('person/', { firstName, lastName, birthDate })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  getPersonById(personId) {
    return axios.get('person/' + personId).then((response) => {
      response.data = response.data.success;
      return response.data;
    }).catch(function (error) {
      console.log(JSON.stringify(error))
    });
  }

  updatePerson(personId, firstName, lastName, birthDate) {
    return axios.put('person/', { id: personId, firstName, lastName, birthDate })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      }).catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  deletePerson(personId) {
    return axios.delete('person/' + personId, null)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

}

export default new PersonService();