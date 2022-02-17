import axios from "../axios";
import * as Constants from './searchConstants';

class SearchService {
    searchByKeyword(term = Constants.DEFAULT_SEARCH_TERM,
        returnFields = Constants.DEFAULT_RETURN_FIELDS,
        fields = Constants.DEFAULT_FIELDS,
        from = Constants.DEFAULT_FROM,
        size = Constants.DEFAULT_SIZE,
        collections = Constants.DEFAULT_COLLECTIONS) {
        console.log({
            term,
            returnFields,
            fields,
            from,
            size,
            collections
        });
        return axios
            .post('search/query', {
                    term,
                    returnFields,
                    fields,
                    from,
                    size,
                    collections
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