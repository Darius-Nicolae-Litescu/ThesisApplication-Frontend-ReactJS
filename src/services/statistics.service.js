import axios from "../axios";


class StatisticsService {


    countFinishedStoriesAfterDate(numberOfMonths) {
        return axios
            .get(`statistics/stories/finished/before/${numberOfMonths}`)
            .then((response) => {
                response.data = response.data.success;
                return response.data;
            });
    }

    countStoryUserComments() {
        return axios
            .get(`statistics/stories/user/comments`)
            .then((response) => {
                response.data = response.data.success;
                return response.data;
            });
    }

    countStoryTaskUserComments() {
        return axios
            .get(`statistics/stories/tasks/user/comments`)
            .then((response) => {
                response.data = response.data.success;
                return response.data;
            });
    }

    countStoryComments() {
        return axios
            .get(`statistics/stories/comments`)
            .then((response) => {
                response.data = response.data.success;
                return response.data;
            });
    }
}

export default new StatisticsService();
