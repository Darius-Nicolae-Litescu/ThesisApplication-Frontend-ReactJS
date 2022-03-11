import axios from "../axios";

class StoryTaskService {
  addStoryTask(description, category, priority) {
    return axios
      .post('story/task/', {
        data: {
          description,
          category,
          description
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

  addComment(content, storyTaskId, attachments, onUploadProgress) {
    let formData = new FormData();
    formData.append("storyTaskId", storyTaskId);
    formData.append("content", content);
    for (let i = 0; i < attachments.length; i++) {
      formData.append("commentAttachments", attachments[i]);
    }
    console.log(storyTaskId, content, attachments)
    console.log(formData);

    return axios({
      method: "post",
      url: "story/task/comment",
      data: formData,
      headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` },
    }).then((response) => {
      response.data = response.data.success;
      return response.data;
    })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

  getStoryTasks(page, size) {
    return axios.get('story/task/', null, {
      params: {
        page,
        size
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