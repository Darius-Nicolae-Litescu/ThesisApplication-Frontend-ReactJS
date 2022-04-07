import React, { useEffect, useState, useReducer, Fragment } from 'react';

import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import Moment from 'react-moment';

import { Image, Container, Card, Button } from 'react-bootstrap';
import { FileIcon, defaultStyles } from 'react-file-icon';
import downloadFile from '../../../helpers/downloadFile'

import StoryTaskService from "../../../services/story-task.service";

import "./story-task-general-info.css"


export default function StoryGeneralInfo(props) {
    const { storyTaskId, createdByUsername, assignedToUsername, finishedAt, status, storyPoints } = props.storyGeneralInfo;
    const [isEditActive, setIsEditActive] = useState(false);

    const [data, setData] = useState([]);
    const [error, setError] = useState();

    const [currentAssignedToUsername, setCurrentAssignedToUsername] = useState(assignedToUsername);
    const [currentFinishedAt, setCurrentFinishedAt] = useState(finishedAt);
    const [currentStatus, setCurrentStatus] = useState(status);
    const [currentStoryPoints, setCurrentStoryPoints] = useState(storyPoints);


    function toggleEditMode() {
        setIsEditActive(!isEditActive);
    }

    function changeDetails() {
        setError();
        StoryTaskService.updateStoryTaskGeneralInfo(storyTaskId, currentStoryPoints, currentAssignedToUsername, currentStatus, currentFinishedAt).then(
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
    }


    return (
        <div className="card flex-row flex-wrap" style={{ width: "97%" }}>
            <div id="outer">
                <div className="inner"><Button onClick={toggleEditMode} className="msgBtn" >Edit</Button></div>
                {isEditActive ? <div className="inner"><Button type="submit" onClick={() => changeDetails()} className="msgBtn2">Save changes</Button></div> : <div></div>}
                <div></div>
            </div>
            <div className="card-header border-0">
                <img src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt=""></img>
            </div>
            <div className="card-block px-2">
                <h4 className="card-title">Story task general information:</h4>
                <p className="card-text">Created by username: {createdByUsername}</p>
                <label>Assigned to username:</label>
                <input className="input-general" onChange={e => setCurrentAssignedToUsername(e.target.value)} value={currentAssignedToUsername} disabled={!isEditActive} />
                <br></br>
                <label>Story points </label>
                <input className="input-general" onChange={e => setCurrentStoryPoints(e.target.value)} value={currentStoryPoints} disabled={!isEditActive} />
                <br></br>
                <label>Status </label>
                <input className="input-general" onChange={e => setCurrentStatus(e.target.value)} value={currentStatus} disabled={!isEditActive} />
                <br></br>
                <label>Finished </label>
                <input className="input-general" onChange={e => setCurrentFinishedAt(e.target.value)} value={currentFinishedAt ? "Finished" : "Not finished"} disabled={!isEditActive} />
                {error && <div style={{ color: "red" }}>Could not update details, check console for more info</div>}
            </div>
        </div>

    );
}