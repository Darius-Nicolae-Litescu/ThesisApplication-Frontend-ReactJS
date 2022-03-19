import axios from "../axios";
import * as Constants from './searchConstants';

class SearchService {
    searchByKeyword(term = Constants.DEFAULT_SEARCH_TERM,
        returnFields = Constants.DEFAULT_RETURN_FIELDS,
        collections = Constants.DEFAULT_COLLECTIONS,
        fields = Constants.DEFAULT_FIELDS,
        from = Constants.DEFAULT_FROM,
        size = Constants.DEFAULT_SIZE) {
        console.log({
            term,
            returnFields,
            fields,
            from,
            size,
            collections
        });
        return axios
            .post('elasticsearch/query', {
                    term,
                    returnFields,
                    fields,
                    from,
                    size,
                    collections
            })
            .then((response) => {
                return response;
            })
            .catch(function (error) {
                console.log(JSON.stringify(error))
            });
    }

    getFieldsPropertyNamesForCollections(collectionNames) {
        console.log({
            collectionNames
        });
        return axios
            .post('elasticsearch/', {
                collectionNames
            })
            .then((response) => {
                response.data = response.data.success;
                return response.data;
            })
            .catch(function (error) {
                console.log(JSON.stringify(error))
            });
    }
}

export default new SearchService();