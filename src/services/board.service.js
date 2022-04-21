import axios from "../axios";

class BoardService {
  getAllBoards() {
    return axios
      .get("board")
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  getBoard(boardId) {
    return axios
      .get("board/" + boardId, null)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  updateBoard(board) {
    return axios
      .put("board/", board)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  insertBoard(board) {
    return axios
      .post("board/", board)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }

  addAllStoriesToBoard(boardId) {
    const params = new URLSearchParams();
    params.append("boardId", boardId);
    return axios
      .put("board/add/stories/all", params)
      .then((response) => {
        response.data = response.data.success;
        return response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
  }
}

export default new BoardService();
