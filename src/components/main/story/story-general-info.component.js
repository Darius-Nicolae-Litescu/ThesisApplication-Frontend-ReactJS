import React, { useEffect, useState, useReducer, Fragment } from "react";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Moment from "react-moment";

import { Image, Container, Card, Button } from "react-bootstrap";
import { FileIcon, defaultStyles } from "react-file-icon";
import { downloadFile } from "../../../helpers/downloadUtils";

import StoryTaskService from "../../../services/story-task.service";
import Priority from "./priority.component";
import { FetchPriorityData } from "../../hooks/fetch-all-priorities";

import "./story-general-info.css";

export default function StoryGeneralInfo(props) {
  const {
    storyId,
    createdBy,
    priority,
    softwareApplication,
    isFinished,
    totalStoryPoints,
  } = props.storyGeneralInfo;
  const {
    fetchPriorityDataStatus,
    data: priorityData,
    fetchPriorityDataError,
  } = FetchPriorityData();

  const [isEditActive, setIsEditActive] = useState(false);

  const [data, setData] = useState([]);
  const [error, setError] = useState();

  const [currentPriority, setPriority] = useState(priority);
  const [currentSoftwareApplication, setSoftwareApplication] =
    useState(softwareApplication);

  const [priorityId, setPriorityId] = useState(priority.id);

  function toggleEditMode() {
    setIsEditActive(!isEditActive);
  }

  function totalStoryPointsText() {
    if (totalStoryPoints == null) {
      return "There are no story subtasks";
    }
    if (totalStoryPoints) {
      return totalStoryPoints;
    }
  }

  function changeDetails() {
    /*
        setError();
        StoryTaskService.updateStoryTaskGeneralInfo(storyId, currentStoryPoints, currentAssignedToUsername, currentStatus, currentFinishedAt).then(
            response => {
                if (response != null) {
                    setData(response.data);
                    props.updateData(data);
                    console.log(response);
                }
            },
            error => {
                setError(error);
                console.log(error);
            }
        )
        */
  }

  return (
    <div className="card flex-row flex-wrap" style={{ width: "97%" }}>
      <div id="outer">
        <div className="inner">
          <Button onClick={toggleEditMode} className="msgBtn">
            Edit
          </Button>
        </div>
        {isEditActive ? (
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
      </div>
      <div className="card-header border-0">
        <img
          src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt=""
        ></img>
      </div>
      <div className="card-block px-2">
        <h4 className="card-title">Story task general information:</h4>
        <p className="card-text">Created by username: {createdBy.username}</p>
        <p className="card-text">Finished: {isFinished ? "Yes" : "No"}</p>
        <p className="card-text">
          Total story points: {totalStoryPointsText()}
        </p>

        <Priority
          setPriorityId={setPriorityId}
          priorityData={priorityData}
          isEditActive={isEditActive}
          priority={priority}
        ></Priority>

        {error && (
          <div style={{ color: "red" }}>
            Could not update details, check console for more info
          </div>
        )}
      </div>
    </div>
  );
}
