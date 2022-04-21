import axios from "../axios";

class SearchFilterService {
  filterSearchResults(finalFilter) {
    return axios
      .post("elasticsearch/filter/exact", {
        filterStoryDto: finalFilter.filterStoryDto,
        filterStoryTaskDto: finalFilter.filterStoryTaskDto,
        filterSoftwareApplicationDto: finalFilter.filterSoftwareApplicationDto,
        filterCommentDto: finalFilter.filterCommentDto,
        filterUserDto: finalFilter.filterUserDto,
        startFromResult: finalFilter.startFromResult,
        pageSize: finalFilter.pageSize,
      })
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }
}

export default new SearchFilterService();
