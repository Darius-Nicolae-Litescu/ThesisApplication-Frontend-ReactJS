import axios from "../axios";

class StoryService {
  addStory(description, category, priority) {
    return axios
      .post('story/', {
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

  addComment(content, storyId, attachments) {
    let formData = new FormData();
    formData.append("storyId", storyId);
    formData.append("content", content);
    if (attachments) {
      for (let i = 0; i < attachments.length; i++) {
        formData.append("commentAttachments", attachments[i]);
      }
    }
    console.log(storyId, content, attachments)
    console.log(formData);

    return axios({
      method: "post",
      url: "story/comment",
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

  getStories(page, size) {
    return axios.get('story/', null, {
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


  getStory(storyId) {
    return axios.get('story/' + storyId, null)
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
      .post('story/count')
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      });
  }

}

export default new StoryService();