import axios from "../axios";

class StoryTaskService {
  addStoryTask(title, description, storyPoints, assignedToId, status, storyId) {
    return axios
      .post('story/task/', {
        title,
        description,
        storyPoints,
        assignedToId,
        status,
        storyId
      })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  addComment(content, storyTaskId, attachments) {
    const formData = new FormData();
    formData.append("storyTaskId", storyTaskId);
    formData.append("content", content);
    if (attachments) {
      for (let i = 0; i < attachments.length; i++) {
        formData.append("commentAttachments", attachments[i]);
      }
    }
    return axios({
      method: "post",
      url: "story/task/comment",
      data: formData,
      headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` },
    }).then((response) => {
      response.data = response.data.success;
      return response.data;
    }).catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  updateStoryTaskGeneralInfo(id, storyPoints, assignedToUsername, status, finishedAt) {
    return axios
      .put('story/task/general', {
        id,
        storyPoints,
        assignedToUsername,
        status,
        finishedAt
      }).then((response) => {
        response.data = response.data.success;
        return response.data;
      });
  }

  updateStoryTaskTitleAndDescription(id, title, description) {
    return axios
      .put('story/task/details', {
        id,
        title,
        description
      })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      });
  }

  getStoryTasks(page, size) {
    const params = new URLSearchParams([['page', page - 1], ['size', size]]);

    return axios.get('story/task/pageable', { params })
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }


  getStoryTask(storyId) {
    return axios.get('story/task/' + storyId, null)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  deleteStoryTask(storyTaskId) {
    return axios.delete('story/task/' + storyTaskId, null)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  count() {
    return axios
      .post('story/task/count')
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

}

export default new StoryTaskService();