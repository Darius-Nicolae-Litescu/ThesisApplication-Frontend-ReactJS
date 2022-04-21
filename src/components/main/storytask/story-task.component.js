import React, { useEffect, useState, useReducer, Fragment } from "react";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Moment from "react-moment";
import {
  Card,
  Container,
  ListGroup,
  Spinner,
  Divider,
  Button,
} from "react-bootstrap";
import { FetchStoryTaskData } from "../../hooks/fetch-story-task";
import { CommentList } from "./comment-list.component";
import TextareaAutosize from "react-textarea-autosize";
import StoryGeneralInfo from "./story-task-general-info.component";
import StoryTaskService from "../../../services/story-task.service";

import "./story-task-style.css";

function App() {
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteActive, setDeleteActive] = useState("");

  const { storyTaskId } = useParams();
  const { status, data, error } = FetchStoryTaskData(storyTaskId);

  const [currentData, setCurrentData] = useState([]);
  const [currentError, setCurrentError] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentData) {
      setCurrentData(currentData);
    }
  }, [currentData]);

  useEffect(() => {
    if (data.title) {
      setTitle(data.title);
    }
    if (data.description) {
      setDescription(data.description);
    }
  }, [data]);

  function updateData(updatedData) {
    setCurrentData(updatedData);
  }

  function changeDetails() {
    setCurrentError();
    StoryTaskService.updateStoryTaskTitleAndDescription(
      storyTaskId,
      title,
      description
    ).then(
      (response) => {
        if (response != null) {
          setTitle(response.title);
          setDescription(response.description);
          toggleEditMode();
          console.log(response);
        }
      },
      (error) => {
        setCurrentError(currentError);
        console.log(error);
      }
    );
  }

  function toggleEditMode() {
    setIsEditActive(!isEditActive);
    setDeleteActive(!isDeleteActive);
  }

  return (
    <div>
      {status === "idle" && <div> Idle </div>}
      {status === "error" && <div>{error}</div>}
      {status === "fetching" && <div className="loading"></div>}
      {status === "fetched" && (
        <>
          <StoryGeneralInfo
            updateData={updateData}
            storyGeneralInfo={{
              storyTaskId: storyTaskId,
              createdByUsername: data.createdByUsername,
              assignedToUsername: data.assignedToUsername,
              finishedAt: data.finishedAt,
              status: data.status,
              storyPoints: data.storyPoints,
            }}
          ></StoryGeneralInfo>
          <Container style={{ width: "100%", height: "100%" }}>
            <Card bg="light" text="dark" style={{ width: "100%" }}>
              <Container>
                <div id="outer">
                  {isDeleteActive ? (
                    <div className="inner">
                      <Button className="msgBtnBack">Delete</Button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="inner">
                    <Button onClick={toggleEditMode} className="msgBtn">
                      Edit
                    </Button>
                  </div>
                  {isDeleteActive ? (
                    <div className="inner">
                      <Button
                        type="submit"
                        onClick={() => changeDetails()}
                        className="msgBtn2"
                      >
                        Save changes
                      </Button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div></div>
                  {error && (
                    <div style={{ color: "red" }}>
                      Could not update details, check console for more info
                    </div>
                  )}
                </div>
              </Container>
              <div
                style={{ display: "grid" }}
                className="media-body p-2 shadow-sm rounded bg-light border"
              >
                <input
                  className="story-task-title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  disabled={!isEditActive}
                />
                <Moment format="YYYY-MM-DD HH:mm">{data.createdAt}</Moment>
              </div>
              <Card.Body>
                <br />
                <div className="story-task-description">
                  <TextareaAutosize
                    className="disabled"
                    disabled={!isEditActive}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    style={{ width: "100%" }}
                    maxRows={50}
                    minRows={5}
                  ></TextareaAutosize>
                </div>
                <br />
                <div className="card-block px-2">
                  <Card.Title>
                    <Card.Footer>
                      <CommentList
                        storyTaskId={storyTaskId}
                        comments={data.storyComments}
                      ></CommentList>
                    </Card.Footer>
                  </Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </>
      )}
    </div>
  );
}

export default App;
